const {app, BrowserWindow, ipcMain, dialog} = require("electron");
const path = require("path");
const fs = require("fs").promises;

const BASE_DIR_BOOKS = path.join(__dirname, 'books');
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
    // win.loadFile("./Frontend/index.html");
    // win.loadFile(path.join(__dirname, 'Frontend', 'index.html'));
    const indexPath = path.join(__dirname, 'Frontend', 'index.html');
    console.log("Loading file from:", indexPath); // Логирование пути для отладки

    win.loadFile(indexPath).catch(err => {
        console.error("Error loading file:", err); // Обработка ошибки загрузки
    });
}

app.whenReady().then(() => {
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

ipcMain.handle('filedialog', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    });
    return result.filePaths;
});