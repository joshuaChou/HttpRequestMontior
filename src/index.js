import { app, BrowserWindow,ipcMain } from 'electron'
import path from 'path'
import url from 'url'

import express from 'express'
import bodyParser from 'body-parser'
import EventEmitter from "events"

const myEventEmitter = new EventEmitter()
const appExpress = express()
var resultValue = {};
// parse application/json
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({ extended: true }));



ipcMain.on('list-router', (event, arg)=> {
  let list = "";
  appExpress._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      list = list +  Object.keys(r.route.methods).toString().toUpperCase() + " "+ r.route.path + "\n\r"
    }
  })
  

  event.returnValue = list;
});


ipcMain.on('content-message', (event, arg)=> {
  try {
    resultValue = JSON.parse(arg)
  } catch (error) {
    event.returnValue = error.toString();
  }
  

  event.returnValue = 'OK';
});

appExpress.get('/Home/Send', function (req, res) {
  myEventEmitter.emit('queryMsg', JSON.stringify(req.query))
  myEventEmitter.emit('resultMsg', JSON.stringify(req.body))
  myEventEmitter.emit('headerMsg', JSON.stringify(req.headers))
  myEventEmitter.emit('methodMsg', JSON.stringify(req.method))
  myEventEmitter.emit('paramsMsg', JSON.stringify(req.params))
  
  res.send(JSON.stringify(resultValue));
})

appExpress.post('/Home/SendPoint', function (req, res) {
  myEventEmitter.emit('queryMsg', JSON.stringify(req.query))
  myEventEmitter.emit('resultMsg', JSON.stringify(req.body))
  myEventEmitter.emit('headerMsg', JSON.stringify(req.headers))
  myEventEmitter.emit('methodMsg', JSON.stringify(req.method))
  myEventEmitter.emit('paramsMsg', JSON.stringify(req.params))
  res.send(JSON.stringify(resultValue));
})

appExpress.post('/Home/Send', function (req, res) {
  myEventEmitter.emit('queryMsg', JSON.stringify(req.query))
  myEventEmitter.emit('resultMsg', JSON.stringify(req.body))
  myEventEmitter.emit('headerMsg', JSON.stringify(req.headers))
  myEventEmitter.emit('methodMsg', JSON.stringify(req.method))
  myEventEmitter.emit('paramsMsg', JSON.stringify(req.params))
  res.send(JSON.stringify(resultValue));
})

module.exports = myEventEmitter;




appExpress.listen(4000, function () {
  console.log('Example app listening on port 4000!')
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  let contentUrl = "";
  win = new BrowserWindow({ width: 800, height: 600 })

  if(process.env.NODE_ENV == undefined){
    contentUrl= 'index.html'
  }else{
    contentUrl = '../index.html'
  }

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, contentUrl),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

