const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {

    save: (text) => ipcRenderer.invoke('save-note', text),

    load: () => ipcRenderer.invoke('load-note'),

    saveAs: (text) => ipcRenderer.invoke('save-as', text),

    deleteAll: () => ipcRenderer.invoke('delete-notes'),

    newNote: () => ipcRenderer.invoke('new-note'),

    onMenuAction: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    }

});