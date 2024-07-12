const {app, BrowserWindow, ipcMain, dialog, shell} = require("electron");
const path = require("path");
const { title } = require("process");
const fs = require("fs").promises;
const os = require('os');
const localAppData = process.env.LOCALAPPDATA;

let BASE_DIR_BOOKS = path.join(__dirname, 'books');

// const getBaseDirBooks = () => {
//     const appExePath = app.getPath('exe');
//     const appDir = path.dirname(appExePath);
//     const unpackedPath = path.join(appDir, 'resources', 'app.asar.unpacked', 'books');
//     return unpackedPath;
// };

async function createFolderIfNotExists(folderPath) {
    try {
        await fs.access(folderPath);
        console.log(`Папка "${folderPath}" уже существует.`);
    } catch (error) {
        try {
            await fs.mkdir(folderPath, { recursive: true });
            console.log(`Папка "${folderPath}" была создана.`);
        } catch (mkdirError) {
            console.error('Ошибка при создании папки:', mkdirError);
        }
    }
}

async function createJsonFileIfNotExists(filePath) {
    try {
        await fs.access(filePath);
        console.log(`Файл "${filePath}" уже существует.`);
    } catch (error) {
        try {
            await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
            console.log(`Файл "${filePath}" был создан и начальные данные записаны.`);
        } catch (writeError) {
            console.error('Ошибка при записи в файл JSON:', writeError);
        }
    }
}


async function checkFileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

async function initializeApp() {
    let fileExists = await checkFileExists(path.join(BASE_DIR_BOOKS, 'dataBooks.json'));
    if (!fileExists) {
        let usersData = path.join(localAppData, "book_library_data");
        createFolderIfNotExists(usersData);
        BASE_DIR_BOOKS = path.join(usersData, "books");
        createFolderIfNotExists(BASE_DIR_BOOKS);
        createJsonFileIfNotExists(path.join(BASE_DIR_BOOKS, "dataBooks.json"));
        console.log('Files not found. Using fallback directory:', BASE_DIR_BOOKS);
    } else {
        console.log('Files found in:', BASE_DIR_BOOKS);
    }
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 800,
        title: "Book Library",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });
    const indexPath = path.join(__dirname, "build/src", 'index.html');
    // console.log("Loading file from:", indexPath);

    win.loadFile(indexPath).catch(err => {
        console.error("Error loading file:", err);
    });

    win.once('ready-to-show', () => {
        win.maximize(); // Увеличивает окно до размеров экрана, оставляя панель заголовка
    });
}

app.whenReady().then(async () => {
    await initializeApp();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

ipcMain.on("set", (event, arg) => {
    fs.writeFile(path.join(BASE_DIR_BOOKS, 'dataBooks.json'), JSON.stringify(arg), { encoding: 'utf8' }, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err.message);
        } else {
            console.log('Файл успешно записан');
        }
    });
});


ipcMain.handle('get', async (event, fileName) => {
    const filePath = path.join(BASE_DIR_BOOKS, fileName);
    console.log(filePath);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; 
    }
});

ipcMain.handle("getIcon", async () => {
    return path.join(__dirname, "img", "addBookImage.png");
});

ipcMain.handle('filedialog', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    });
    return result.filePaths;
});

ipcMain.on("openLink", (event, url) => {
    shell.openExternal(url);
});