const {app, BrowserWindow, ipcMain, dialog, shell} = require("electron");
const path = require("path");
const { title } = require("process");
const fs = require("fs").promises;

let BASE_DIR_BOOKS;

const getBaseDirBooks = () => {
    const appExePath = app.getPath('exe');
    const appDir = path.dirname(appExePath);
    const unpackedPath = path.join(appDir, 'resources', 'app.asar.unpacked', 'books');
    return unpackedPath;
};

async function checkFileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

async function initializeApp() {
    BASE_DIR_BOOKS = getBaseDirBooks();
    let fileExists = await checkFileExists(path.join(BASE_DIR_BOOKS, 'reading.json'));
    fileExists = fileExists || await checkFileExists(path.join(BASE_DIR_BOOKS, 'want_to_read.json'));
    fileExists = fileExists || await checkFileExists(path.join(BASE_DIR_BOOKS, 'finish_read.json'));
    if (!fileExists) {
        BASE_DIR_BOOKS = path.join(__dirname, 'books');
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

ipcMain.on("reading", (event, arg) => {
    fs.writeFile(path.join(BASE_DIR_BOOKS, 'reading.json'), JSON.stringify(arg), { encoding: 'utf8' }, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err.message);
        } else {
            console.log('Файл успешно записан');
        }
    });
});

ipcMain.on("wanttoread", (event, arg) => {
    fs.writeFile(path.join(BASE_DIR_BOOKS, 'want_to_read.json'), JSON.stringify(arg), { encoding: 'utf8' }, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err.message);
        } else {
            console.log('Файл успешно записан');
        }
    });
});

ipcMain.on("finishread", (event, arg) => {
    fs.writeFile(path.join(BASE_DIR_BOOKS, 'finish_read.json'), JSON.stringify(arg), { encoding: 'utf8' }, (err) => {
        if (err) {
            console.error('Ошибка записи в файл:', err.message);
        } else {
            console.log('Файл успешно записан');
        }
    });
});


ipcMain.handle('get', async (event, fileName) => {
    const filePath = path.join(BASE_DIR_BOOKS, fileName);
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