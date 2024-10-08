const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs").promises;

const localAppData = process.env.LOCALAPPDATA;

let BASE_DIR_BOOKS = path.join(__dirname, 'books');
let windows = new Set();

async function createFolderIfNotExists(folderPath) {
    try {
        await fs.access(folderPath);
        console.log(`The folder "${folderPath}" already exists.`);
    } catch (error) {
        try {
            await fs.mkdir(folderPath, { recursive: true });
            console.log(`The folder "${folderPath}" has been created.`);
        } catch (mkdirError) {
            console.error("Error creating folder:", mkdirError);
        }
    }
}

async function createJsonFileIfNotExists(filePath) {
    try {
        await fs.access(filePath);
        console.log(`The file "${filePath}" already exists.`);
    } catch (error) {
        try {
            await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
            console.log(`The file "${filePath}" has been created and the initial data has been written.`);
        } catch (writeError) {
            console.error("Error writing to JSON file:", writeError);
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
        await createFolderIfNotExists(usersData);
        BASE_DIR_BOOKS = path.join(usersData, "books");
        await createFolderIfNotExists(BASE_DIR_BOOKS);
        await createJsonFileIfNotExists(path.join(BASE_DIR_BOOKS, "dataBooks.json"));
        console.log('Files found in:', BASE_DIR_BOOKS);
    } else {
        console.log('Files found in:', BASE_DIR_BOOKS);
    }
}

const createWindow = () => {
    app.commandLine.appendSwitch("ignore-certificate-errors");
    app.commandLine.appendSwitch("ignore-ssl-errors", "true");
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
    windows.add(win);
    win.loadFile(indexPath).catch(err => {
        console.error("Error loading file:", err);
    });

    win.once("ready-to-show", () => {
        win.maximize(); // Увеличивает окно до размеров экрана, оставляя панель заголовка
    });

    win.on("unresponsive", () => {
        console.warn("Window is unresponsive");
    });

    win.on("closed", () => {
        console.log("Window closed");
        app.quit();
    });

    ipcMain.on("openLink", (event, url) => {
        const contentBounds = win.getBounds();
        windows.forEach(window => {
            if (window.title !== "Book Library") {
                window.close();
                windows.delete(window);
            }
        });
        const winSourseBook = new BrowserWindow({
            width: 800,
            height: 800,
            x: contentBounds.x,
            y: contentBounds.y,
            frame: true,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
                contextIsolation: true
            }
        });
        winSourseBook.loadURL(url);
        windows.add(winSourseBook);
        winSourseBook.maximize();

        winSourseBook.on("closed", () => {
            windows = new Set();
            windows.add(win);
        });
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

ipcMain.on("set", async (event, arg) => {
    try {
        await fs.writeFile(path.join(BASE_DIR_BOOKS, 'dataBooks.json'), JSON.stringify(arg), "utf-8");
        console.log("The file was written successfully.");
    } catch (error) {
        console.error("Error writing to file:", err.message);
    }
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