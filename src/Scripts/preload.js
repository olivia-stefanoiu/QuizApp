const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setDone: (id, done) => ipcRenderer.send('set-done', id, done),
    getDone: (id) => ipcRenderer.invoke('get-done', id),
    eraseAll:() =>ipcRenderer.send('erase-all')
})