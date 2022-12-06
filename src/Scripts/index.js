const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const storage = require("electron-localstorage");


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {

    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../Pages/index.html'));

    mainWindow.webContents.openDevTools();
};


app.on('ready', createWindow);


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


function setDone(ev ,id, done) {
    storage.setItem(id, done);
}

function getDone(ev,id) {
       return storage.getItem(id);

}

function eraseAll(){
    storage.clear();
}


app.whenReady().then(() => {
    ipcMain.on('set-done', setDone)
    ipcMain.handle('get-done', getDone)
    ipcMain.on('erase-all', eraseAll)
})