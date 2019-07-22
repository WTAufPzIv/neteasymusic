const {app, BrowserWindow,ipcMain,dialog  } = require('electron')
const path = require('path')
const Store = require('electron-store')
const DataStore = require('./MusicDataStore')//引入自定义的添加音乐封装模块
const myStore = new DataStore({'name':'MusicData'})
var jsmediatags = require("jsmediatags");
const store = new Store()
//let audio = new Audio()
//nodemon --watch main.js --exec 'electron .'
class AppWindow extends BrowserWindow{//自定义创建窗口的封装类，继承于BrowserWindow
  constructor(config, fileLocation){
    const basicConfig = {
      width:1300,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration:true,//设置此项以使用nodejs,
        webSecurity: false
      },
      webSecurity:true,
      frame:false,
      minWidth:1300,
      minHeight:800,
      icon:'./1.jpg'
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
        let updataedTrack = myStore.getTrack()//链式调用
          mainWindow.send('getlocalmusic', updataedTrack)//渲染列表
  })
  ipcMain.on('saveplaylist',(event,track,index,type) => {
    store.set('playlist',track)
    store.set('index',index)
    store.set('play_type',type)
  })
  ipcMain.on('getlastplaylist',() => {
    var flag = store.get('playlist') || []
    var num = store.get('index') || 0
    var type = store.get('play_type') || 0
    mainWindow.send('lastplaylistdata',flag,num,type)
  })
  ipcMain.on('savevoice',(event,num) => {
    store.set('voice',num)
  })
  ipcMain.on('getvoice',() => {
    var flag = store.get('voice') || 0
    mainWindow.send('getvoiceData',flag)
  })
  ipcMain.on('deleteItem', (event,num) => {
    console.log(num)
    const updataedTrack = myStore.deleteTrack(num)//链式调用    
    //mainWindow.send('getlocalmusic', updataedTrack)//渲染列表
  })
  ipcMain.on('saveindex',(event,num) => {
    store.set('index',num)
  })
  ipcMain.on('addlocalmusic',(event,arg) => {
    dialog.showOpenDialog({
      properties:['openFile', 'multiSelections'],//打开文件，允许多选
      filters:[{name:'Music', extensions:['mp3','aac','flac','wav','ape','wma']}]//文件类型为音乐
    }, (files) => {
      if(files){
        //event.sender.send('getlocalmusic',files)
        if(files.length > 100){
          dialog.showMessageBox({
            type:'warning',
            buttons:['知道了'],
            title:'添加错误',
            message:'只能一次性添加100首以内的歌'
          })
        }
        else{
          let file = []
          let title = []
          let artist = []
          let album = []
          let type = []
          for(var i = 0;i < files.length; i++){
            (function(i){
            jsmediatags.read(files[i], {
              onSuccess: function(tag) {
                console.log(tag.tags.artist)
                file.push(files[i])
                title.push(tag.tags.title || '未知')
                artist.push(tag.tags.artist || '未知')
                album.push(tag.tags.album || '未知')
                type.push(tag.type || '未知')
              },
              onError: function(error) {
                console.log(':(', error.type, error.info);
              }
            });
            }(i))
          }
          setTimeout(() => {
            console.log(artist)
            var num = files.length
            myStore.addTracks(file,title,artist,album,type,num)
            const updataedTrack = myStore.getTrack()//链式调用    
            mainWindow.send('getlocalmusic', updataedTrack)//渲染列表
          }, files.length*100);
        }
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

