const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
// const { title } = require("process");
const fs = require("fs").promises;
const localAppData = process.env.LOCALAPPDATA;

let BASE_DIR_BOOKS = path.join(__dirname, 'books');
const windows = new Set();

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
        await createFolderIfNotExists(usersData);
        BASE_DIR_BOOKS = path.join(usersData, "books");
        await createFolderIfNotExists(BASE_DIR_BOOKS);
        await createJsonFileIfNotExists(path.join(BASE_DIR_BOOKS, "dataBooks.json"));
        console.log('Files not found. Using fallback directory:', BASE_DIR_BOOKS);
    } else {
        console.log('Files found in:', BASE_DIR_BOOKS);
    }
}

const createWindow = () => {
    app.commandLine.appendSwitch('ignore-certificate-errors');
    app.commandLine.appendSwitch('ignore-ssl-errors', 'true');
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
        const contentBounds = win.getContentBounds();
        const winSourseBook = new BrowserWindow({
            width: contentBounds.width,
            height: contentBounds.height,
            x: contentBounds.x,
            y: contentBounds.y,
            frame: true,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
                contextIsolation: true
            }
        });
        const boundsSourseBook = winSourseBook.getBounds();
        const contentBoundsSourseBook = win.getContentBounds();
        const contentSize = winSourseBook.webContents.getOwnerBrowserWindow().getContentBounds();
        const frameWinSourseBook = new BrowserWindow({
            width: contentBoundsSourseBook.width,
            height: (boundsSourseBook.height - contentSize.height) + 10,
            x: contentBounds.x,
            y: contentBounds.y,
            frame: false,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                nodeIntegration: true,
                contextIsolation: true
            }
        });
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    html, body {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                    }
                    body {
                        display: flex;
                        justify-content: end;
                        align-items: center;
                        background: black;
                    }
                    #close_button {
                        margin-right: 2em;
                    }
                </style>
            </head>
            <body>
                <button id="close_button">X</button>
                <script>
                    document.getElementById("close_button").addEventListener("click", () => {
                        window.send.closeSourseBook();
                    });
                </script>
            </body>
            </html>
        `;
        frameWinSourseBook.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
        winSourseBook.loadURL(url);
        winSourseBook.setSkipTaskbar(true);
        frameWinSourseBook.setSkipTaskbar(true);
        windows.add(winSourseBook);
        windows.add(frameWinSourseBook);
        ipcMain.on("close", () => {
            windows.forEach(window => {
                if (window != win) {
                    window.close();
                    windows.delete(window);
                }
            });
        });
        win.on("focus", () => {
            windows.forEach(window => {
                if (window != win) {
                    window.setAlwaysOnTop(true);
                }
            });
        });

        win.on("blur", () => {
            windows.forEach(window => {
                if (window != win) {
                    window.setAlwaysOnTop(false);
                }
            });
        });

        winSourseBook.on("focus", () => {
            windows.forEach(window => {
                if (window != win && window != winSourseBook) {
                    window.setAlwaysOnTop(true);
                }
            });
        });

        winSourseBook.on("blur", () => {
            windows.forEach(window => {
                if (window != win && window != winSourseBook) {
                    window.setAlwaysOnTop(false);
                }
            });
        });

        win.on("minimize", () => {
            windows.forEach(window => {
                if (window != win) {
                    window.hide();
                }
            });
        });

        win.on("restore", () => {
            windows.forEach(window => {
                if (window != win) {
                    window.show();
                }
            });
        });

        win.on("resize", () => {
            const contentBounds = win.getContentBounds();
            winSourseBook.setBounds({
                width: contentBounds.width,
                height: contentBounds.height,
                x: contentBounds.x,
                y: contentBounds.y,
            });
        });

        winSourseBook.on("resize", () => {
            const contentBounds = win.getContentBounds();
            const boundsSourseBook = winSourseBook.getBounds();
            const contentSize = winSourseBook.webContents.getOwnerBrowserWindow().getContentBounds();
            frameWinSourseBook.setBounds({
                width: contentBounds.width,
                height: (boundsSourseBook.height - contentSize.height) + 10,
                x: contentBounds.x,
                y: contentBounds.y,
            });
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
        console.log('Файл успешно записан');
    } catch (error) {
        console.error('Ошибка записи в файл:', err.message);
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