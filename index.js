const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const csv = require('csv-parser');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

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
function handleFile(event) {
  const file = event.target.files[0];
  const filePath = file.path;

  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results); // Aquí puedes procesar los datos como desees
    })
    .on('error', (error) => {
      dialog.showErrorBox('Error', 'No se pudo leer el archivo CSV');
    });
}