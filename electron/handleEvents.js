const { ipcMain } = require('electron');

function initEventsHandler(mainWin, browserView) {
    const winContent = mainWin.webContents;
    const browserContent = browserView.webContents;

    ipcMain.handle('toogle-dev-tool', () => {
        if (winContent.isDevToolsOpened()) {
            winContent.closeDevTools();
        } else {
            winContent.openDevTools({ mode: 'detach' });
        }
    });

    ipcMain.handle('go-back', () => {
        browserContent.goBack();
    });

    ipcMain.handle('can-go-back', () => {
        return browserContent.canGoBack();
    });

    ipcMain.handle('go-forward', () => {
        browserContent.goForward();
    });

    ipcMain.handle('refresh', () => {
        browserContent.reload();
    });

    ipcMain.handle('can-go-forward', () => {
        return browserContent.canGoForward();
    });

    ipcMain.handle('go-to-page', (event, url) => {
        return browserContent.loadURL(url);
    });


    ipcMain.handle('current-url', () => {
        return browserContent.getURL();
    });

    // get all the source code of the page
    // Dans votre fichier principal d'Electron (par exemple, main.js)

    ipcMain.handle('get-page-source', async () => {
        return browserContent.executeJavaScript(`
            Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, div'))
                .filter(element => element.textContent.trim().length > 0)
                .map(element => element.textContent.trim().replace(/\\s+/g, ' '))
                .join(' ');
        `, true);
    });
    

}

module.exports = { initEventsHandler };