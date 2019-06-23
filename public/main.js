const {app, BrowserWindow,ipcMain,dialog  } = require('electron')
const path = require('path')
const Store = require('electron-store')
const store = new Store()
const DataStore = require('./MusicDataStore')//引入自定义的添加音乐封装模块
const myStore = new DataStore({'name':'MusicData'})
//nodemon --watch main.js --exec 'electron .'

class AppWindow extends BrowserWindow{//自定义创建窗口的封装类，继承于BrowserWindow
  constructor(config, fileLocation){
    const basicConfig = {
      width:1300,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration:true//设置此项以使用nodejs
      },
      frame:false,
      minWidth:1000,
      minHeight:800,
    }
    const finalConfig1 = Object.assign(basicConfig, config)//将传入的对象和原来的对象合并
    const finalConfig = { ...basicConfig, ...config}//也可以这样写(ES6语法)
    super(finalConfig)//调用父类的constructor
    //this.loadFile(fileLocation)//调用当前类
    this.loadURL("http://localhost:3000")
    //不懂的去看super和this的区别
    this.once('ready-to-show', ()=>{
      this.show()
    })
  }
}

let mainWindow
function createWindow () {
  mainWindow = new AppWindow({}, './renderer/index.html')
  ipcMain.on('minWindow', (event) => {
    mainWindow.minimize()
  })
  ipcMain.on('maxWindow', (event) => {
    mainWindow.maximize()
    //console.log(666)
    //mainWindow.send('maxWindowOk')
  })
  ipcMain.on('smallWindow', (event) => {
    mainWindow.unmaximize()
    //mainWindow.send('smallWindowOk')
  })
  ipcMain.on('closeWindow', (event) => {
    mainWindow.close()
  })
  ipcMain.on('getlocalmusic_msg', () => {
        const updataedTrack = myStore.getTrack()//链式调用
        mainWindow.send('getlocalmusic', updataedTrack)//渲染列表
  })
  ipcMain.on('addlocalmusic',(event,arg) => {
    dialog.showOpenDialog({
      properties:['openFile', 'multiSelections'],//打开文件，允许多选
      filters:[{name:'Music', extensions:['mp3','aac','flac','wav','ape','wma']}]//文件类型为音乐，只能打开mp3
    }, (files) => {
      if(files){
        //event.sender.send('getlocalmusic',files)
        console.log(files)
        myStore.addTracks(files)
        const updataedTrack = myStore.getTrack()//链式调用
        console.log(updataedTrack)
        mainWindow.send('getlocalmusic', updataedTrack)//渲染列表
      }
    })
  })
  // mainWindow.unmaximize = () => {
  //   console.log(666)
  // }
  mainWindow.on('maximize',() => {
    //console.log(666)
    mainWindow.send('maxWindowOk')
  })
  mainWindow.on('unmaximize',() => {
    mainWindow.send('smallWindowOk')
  })
  mainWindow.on('resize', ( event ) => {
    console.log(mainWindow.getSize()[1])
    mainWindow.send('windowHeight', mainWindow.getSize()[1])
  })
  mainWindow.openDevTools()
}



app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

