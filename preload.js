const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("send", {
    reading: (data) => ipcRenderer.send("reading", data),
    wantToRead: (data) => ipcRenderer.send("wanttoread", data),
    finishRead: (data) => ipcRenderer.send("finishread", data)
});

contextBridge.exposeInMainWorld("get", {
    getDataServer: (filePath) => ipcRenderer.invoke('get', filePath),
    getIcon: () => ipcRenderer.invoke("getIcon")
});

contextBridge.exposeInMainWorld('api', {
    openFileDialog: () => ipcRenderer.invoke('filedialog')
});