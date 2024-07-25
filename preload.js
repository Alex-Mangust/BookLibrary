const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("send", {
    set: (data) => ipcRenderer.send("set", data),
    closeSourseBook: () => ipcRenderer.send("close")
});

contextBridge.exposeInMainWorld("get", {
    getDataServer: (filePath) => ipcRenderer.invoke("get", filePath),
    getIcon: () => ipcRenderer.invoke("getIcon")
});

contextBridge.exposeInMainWorld('api', {
    openFileDialog: () => ipcRenderer.invoke('filedialog'),
});

contextBridge.exposeInMainWorld("link", {
    openLink: (url) => ipcRenderer.send("openLink", url)
});