import React from 'react';
import './localmusic.css'
import ReactAudioPlayer from 'react-audio-player';
import { replaceDefault } from 'builder-util';
import Files from 'react-files'
const jsmediatags = require('jsmediatags')
const { ipcRenderer } = window.require('electron');
class Localmusic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            musicNum:0,
            files:[],
            isLoad:false
        }
        var that = this
    }
    componentWillMount(){
        var that = this
        ipcRenderer.send('getlocalmusic_msg')
        ipcRenderer.on('getlocalmusic',(event,files)=>{
            if(files){
                for(var i in files){
                    files[i].path = files[i].path.replace(/\\/g,'/')
                }
                that.setState({
                    files:files
                },() => {
                    console.log(that.state)
                    that.setState({
                        isLoad:true
                    })
                })
            }
        })
    }
    componentDidMount(){
        var that = this
    }
    send_addlocalmusic_msg = () => {
        ipcRenderer.send('addlocalmusic')
    }
    test = () => {
        console.log(this.state.files)
        var that = this
        let audio = this.refs.audio
        // jsmediatags.read('./Eagles - 加州旅馆.mp3',{
        //     onSuccess: function(tag) {
        //         console.log(tag)
        //     }
        // })
        // new jsmediatags.Reader('./Eagles - 加州旅馆.mp3')
        // .read({
        //     onSuccess: (tag) => {
        //         console.log('Success!');
        //         console.log(tag);
        //     },
        //     onError: (error) => {
        //         console.log('Error');
        //         console.log(error);
        //     }
        // });
        //   F:/My Music/Dia Frampton - Walk Away.mp3
        // const audio = document.getElementById('mainplayer')
        // audio.play()
       //audio.play()
    //    console.log(audio.src)
    //    console.log(this.state.files[0].path)
    //    var flag = this.state.files[0].path
    //    var flag1 = flag.replace(/\\/g,"/")
    //    console.log(flag1)
        //console.log(require(''+'F:/My Music/Dia Frampton - Walk Away.mp3'))
        //console.log(require('F:/My Music/Dia Frampton - Walk Away.mp3'))
        //var flag = "F:/My_Music/牛奶咖啡-忆中人.mp3"
        //var url = URL.createObjectURL(this.state.files[0]);
        //console.log(url)
        //var flag1 = 'E:/my_code/FE/牛奶咖啡-忆中人.mp3'
        //console.log(require('file://'+flag))
        //audio.src = "F:/My_Music/牛奶咖啡-忆中人.mp3"
        audio.play()
    }
    render(){
        if(this.state.isLoad){
            return(
                <div className = 'localmusic_body'>
                    <audio src={require(this.state.files[0].path+``)} ref = "audio"></audio>
                    <div className = 'localmusic_head'>
                        <span>本地音乐</span>
                        <span onClick = {this.test}>{this.state.musicNum}首音乐</span>
                        <span onClick = {this.send_addlocalmusic_msg}>添加音乐</span>
                        <span>添加音乐</span>
                    </div>
                    <div className = 'localmusic_listbody'>
                        <div className = 'localmusic_list_th'>
                            <div className = 'localmusic_list_th_name'><span style = {{'marginLeft':'50px'}}>歌曲名</span></div>
                            <div className = 'localmusic_list_th_singer'>歌手</div>
                            <div className = 'localmusic_list_th_album'>专辑</div>
                            <div className = 'localmusic_list_th_time'>时长</div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return <div>正在加载</div>
        }
    }
}
export default Localmusic