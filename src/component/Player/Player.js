import  React  from 'react'
import { Component } from 'react'
import './Player.css'
import store from '../../store/index'
import { canntchangeplaystatus,openplaydetail,playstatus } from '../../store/actionCreators'
import { connect } from 'react-redux'
import { PLAY_LOCALMUSIC,CAN_CHANGE_PLAY_STATUS,CANNT_CHANGE_PLAY_STATUS,OPEN_PLAY_DETAIL,PLAY_STATUS } from "../../store/actionType";
const audio = new Audio()
audio.autoplay = false
const { ipcRenderer } = window.require('electron');
class Player extends Component{
    constructor(props){
        super(props);
        // console.log(this.props)
        this.state = {
            list:[],
            status:'play',
            index:0,
            title:'',
            artist:'',
            albumImg:'./img/album.png',
            current_time:'',
            current_time_m:'',
            current_time_s:'',
            time:'',
            time_m:'',
            time_s:'',
            progress_line_left:'',
            progress_line_right:'',
            voiceprogress_line_left_num:0,
            voiceprogress_line_left:'0%',
            voiceprogress_line_right:'100%',
            voicenum:0,
            MinWindow:'./img/min_window_g.png',
            MinOrMaxWindow:'./img/max_window_g.png',
            CloseWindow:'./img/close_window_g.png',
            searchBtn:'./img/search_g.png',
            PlayOrder:1,//1：顺序播放 2：单曲循环 3：随机播放,
            play_order:'order',
            voice:'yes',
            play_type:1
        };
        store.subscribe(this.get_play_message);
        this.changeMinBtn = this.changeMinBtn.bind(this)
        this.changeMinOrMaxBtn = this.changeMinOrMaxBtn.bind(this)
        this.changeCloseBtn = this.changeCloseBtn.bind(this)
        this.clickMinOrMaxBtn = this.clickMinOrMaxBtn.bind(this)
        this.changeSearchBtn = this.changeSearchBtn.bind(this)
        audio.addEventListener('ended',() => {
            console.log('end')
            //发送下一首播放请求
            this.next_music()
        })
    }
    componentDidMount(){
        console.log('组件已渲染')
        var that = this
        ipcRenderer.send('getvoice')
        ipcRenderer.on('getvoiceData',(event,num) => {
            console.log('音量：'+num)
            that.setState({
                voicenum:num,
                voiceprogress_line_left:num*100+'%',
                voiceprogress_line_right:(1-num)*100+'%',
            })
            audio.volume = num
        })
        audio.addEventListener('timeupdate', () => {
            //更新播放器状态
            this.updataProgressHTML(audio.currentTime)//获取当前播放时间
        })
    }

    updataProgressHTML = (currentTime) => {
        var that = this
        this.setState({
            current_time:currentTime,
            current_time_m:Math.floor(currentTime/60)>=10?Math.floor(currentTime/60):'0'+Math.floor(currentTime/60),
            current_time_s:Math.floor(currentTime-Math.floor(currentTime/60)*60)>=10?Math.floor(currentTime-Math.floor(currentTime/60)*60):'0'+Math.floor(currentTime-Math.floor(currentTime/60)*60)
        },() => {
            that.setState({
                progress_line_left:currentTime/that.state.time*100+'%',
                progress_line_right:100-currentTime/that.state.time*100+'%'
            })
        })
    }

    changeMinBtn(){
        //this.style.cursor='hand'
        var that = this
        this.setState({
            MinWindow:that.state.MinWindow === './img/min_window_w.png'?'./img/min_window_g.png':'./img/min_window_w.png'
        })
    }
    changeMinOrMaxBtn(){
        var that = this
        if(this.state.MinOrMaxWindow === './img/max_window_g.png'){
            this.setState({
                MinOrMaxWindow:'./img/max_window_w.png'
            })
        }
        else if(this.state.MinOrMaxWindow === './img/max_window_w.png'){
            this.setState({
                MinOrMaxWindow:'./img/max_window_g.png'
            })
        }
        else if(this.state.MinOrMaxWindow === './img/small_window_g.png'){
            this.setState({
                MinOrMaxWindow:'./img/small_window_w.png'
            })
        }
        else if(this.state.MinOrMaxWindow === './img/small_window_w.png'){
            this.setState({
                MinOrMaxWindow:'./img/small_window_g.png'
            })
        }
    }
    changeCloseBtn(){
        var that = this
        this.setState({
            CloseWindow:that.state.CloseWindow === './img/close_window_g.png'?'./img/close_window_w.png':'./img/close_window_g.png'
        })
    }
    clickMinBtn(){
        ipcRenderer.send('minWindow')
    }
    clickMinOrMaxBtn(){
        var that = this
        if(this.state.MinOrMaxWindow === './img/max_window_w.png'){
            ipcRenderer.send('maxWindow')
            that.setState({
                MinOrMaxWindow:'./img/max_window_g.png'
            })
        }
        else if(this.state.MinOrMaxWindow === './img/small_window_w.png'){
            ipcRenderer.send('smallWindow')
            that.setState({
                MinOrMaxWindow:'./img/small_window_g.png'
            })
        }
    }
    clickCloseBtn(){
        ipcRenderer.send('closeWindow')
    }
    changeSearchBtn(){
        var that = this
        this.setState({
            searchBtn:that.state.searchBtn === './img/search_g.png'?'./img/search_w.png':'./img/search_g.png'
        })
    }
    get_play_message = () => {
        setTimeout(() => {
            if(this.props.canchangeplaystatus){
                console.log(this.props)
                if(this.props.playtype === 1){ //播放本地音乐
                    var that = this
                    ipcRenderer.send('getlocalmusic_msg')
                    ipcRenderer.on('getlocalmusic',(event,files) => {
                        if(files){
                            that.setState({
                                list:files || []
                            }, () => {
                                if(this.props.canchangeplaystatus){
                                    let index = this.props.playlocalIndex
                                //console.log(that.state.list[index].path)
                                audio.src = that.state.list[index].path
                                that.setState({
                                    index:index
                                })
                                audio.load()
                                audio.oncanplay = () => {
                                    var thatt = that
                                    that.setState({
                                        time:audio.duration,
                                        title:that.state.list[index].title,
                                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                                        status:'pause',
                                        artist:thatt.state.list[index].artist,
                                        album:thatt.state.list[index].album,
                                        albumImg:'./img/album.png'
                                    })
                                }
                                audio.play()
                                console.log('播放')
                                const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                                store.dispatch(action)
                                const play = playstatus(true)
                                store.dispatch(play)
                                }
                            })
                        }
                    })
                }
                else if(this.props.playtype  === 2){
                    //播放在线音乐
                }
            }
        },50)
    }

    pauseandplay = () => {
        if(this.state.status === 'play'){
            if(audio.src){
                audio.play()
                this.setState({
                    status:'pause'
                })
                const play = playstatus(true)
                store.dispatch(play)
            }
            else{
                alert('播放列表为空')
            }
        }
        else{
            audio.pause()
            this.setState({
                status:'play'
            })
            const play = playstatus(false)
            store.dispatch(play)
        }
    }
    open_play_detail = () => {
        const action = openplaydetail(true,this.state.list[this.state.index])
        store.dispatch(action)
    }
    OnmouseDown = (e) => {
        console.log(this.refs.OnmouseDown.offsetWidth)
        let wid = this.refs.OnmouseDown.offsetWidth
        e = e || window.e;
        var that = this
    // 偏移位置 = 元素的X - 元素的offset
    var disx=e.pageX
    var disy=e.pageY
    document.onmousemove=function(ev){
        console.log(ev.pageX)
        audio.currentTime = (ev.pageX-275)/wid*that.state.time
    }
    document.onmouseup=function(){
        document.onmousemove=null
        document.onmousedown=null
    }
    }
    clickAdjustProgress = (e) => {
        var that = this
        let wid = this.refs.OnmouseDown.offsetWidth
        var disx=e.pageX
        audio.currentTime = (disx-275)/wid*that.state.time
    }
    clickVoiceProgress = (e) => {

    }
    VoiceOnmouseDown = (e) => {
        let wid = this.refs.progress_bar.offsetWidth
        let voice_wid = this.refs.voiceprogress.offsetWidth
        e = e || window.e;
        var that = this
        // 偏移位置 = 元素的X - 元素的offset
        var disx=e.pageX
        document.onmousemove=function(ev){
             //console.log((ev.pageX-wid-330)/voice_wid*100)
             let flag
             if((ev.pageX-wid-330)/voice_wid*100>96){
                 flag = 96
             }
             else if((ev.pageX-wid-330)/voice_wid*100<0){
                flag = 0
             }
             else{
                 flag = (ev.pageX-wid-330)/voice_wid*100
             }
            //  let flag = ((ev.pageX-wid-330)/voice_wid*100)>96?96:((ev.pageX-wid-330)/voice_wid*100)
            that.setState({
                voiceprogress_line_left:flag+'%',
                voicenum:flag/100
            })
            that.setState({
                voiceprogress_line_right:(100-flag)+'%'
            })
            audio.volume = that.state.voicenum
        }
        document.onmouseup=function(){
            console.log(that.state.voiceprogress_line_left)
            console.log(that.state.voiceprogress_line_right)
            console.log(that.state.voicenum)
            if(that.state.voicenum === 0){
                that.setState({
                    voice:'no'
                })
            }
            else{
                that.setState({
                    voice:'yes'
                })
            }
            ipcRenderer.send('savevoice',that.state.voicenum)
            document.onmousemove=null
            document.onmousedown=null
        }
    }
    next_music = () => {
        var that = this
            if(this.state.PlayOrder === 1 && audio.src){
                var flag = this.state.index;
                flag = flag === this.state.list.length-1 ? 0 : flag + 1
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action)
                    
                }
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
            else if(this.state.PlayOrder === 2 && audio.src){
                flag = this.state.index;
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action)
                    
                }
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
            else if(this.state.PlayOrder === 3 && audio.src){
                parseInt(Math.random()*(this.state.list.length+1),10);
                var i = Math.floor(Math.random()*(this.state.list.length+1));
                console.log(i)
                flag = i;
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action) 
                }
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
        
    }
    pre_music = () => {
        var that = this
            if(this.state.PlayOrder === 1 && audio.src){
                var flag = this.state.index;
                flag = flag === 0 ? flag : flag-1
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action) 
                }
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
            else if(this.state.PlayOrder === 2 && audio.src){
                flag = this.state.index;
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action) 
                }
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
            else if(this.state.PlayOrder === 3 && audio.src){
                parseInt(Math.random()*(this.state.list.length+1),10);
                var i = Math.floor(Math.random()*(this.state.list.length+1));
                console.log(i)
                flag = i;
                this.setState({
                    index:flag
                })
                audio.src = this.state.list[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        title:this.state.list[flag].title,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                        artist:this.state.list[flag].artist,
                        album:this.state.list[flag].album,
                    })
                    audio.play()
                    const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                    store.dispatch(action) 
                }
                // console.log(Math.random())
                const action = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list[flag])
                store.dispatch(action)
            }
        
    }
    mute = () => {
        if(this.state.voicenum !== 0){
            this.setState({
                voice:'no',
                voicenum:0,
                voiceprogress_line_left:'0%',
                voiceprogress_line_right:'100%'
            })
            audio.volume = 0
            ipcRenderer.send('savevoice',0)
        }
        else if(this.state.voicenum === 0){
            this.setState({
                voice:'yes',
                voicenum:0.7,
                voiceprogress_line_left:'70%',
                voiceprogress_line_right:'30%'
            })
            audio.volume = 0.7
            ipcRenderer.send('savevoice',0.7)
        }
    }
    changeorder = () => {
        if(this.state.play_order === 'order'){
            this.setState({
                play_order:'loop',
                PlayOrder:2
            })
        }
        else if(this.state.play_order === 'loop'){
            this.setState({
                play_order:'random',
                PlayOrder:3
            })
        }
        else if(this.state.play_order === 'random'){
            this.setState({
                play_order:'order',
                PlayOrder:1
            })
        }
    }
    render(){
        return(
            <div>
                
                <div className = 'play_body'>
                    <div className = 'play_img' onClick = {() => this.props.open_play_detail(this.state.list[this.state.index])}>
                        <img src = {require(this.state.albumImg+'')} />
                    </div>
                    <div className = 'base_Btn'>
                        <div className = 'base_Btn_left'  onClick = { () => this.pre_music()}><img src = {require('./img/左播放.png')} /></div>
                        <div className = 'base_Btn_center' onClick = {()=>this.pauseandplay()}><img src = {require('./img/'+ this.state.status+ '.png')} /></div>
                        <div className = 'base_Btn_right'  onClick = { () => this.next_music()}><img src = {require('./img/右播放.png')} /></div>
                    </div>
                    <div className = 'play_control'>
                        <div className = 'progress_bar' ref = 'progress_bar'>
                            <div className = 'progress_title' style = {{'borderLeft':'10px'}}>{this.state.title || 'no play'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{this.state.artist}</div>
                            <div className = 'progress'>
                                {this.state.current_time_m?this.state.current_time_m:'00'}:{this.state.current_time_s?this.state.current_time_s:"00"}{'\u00a0'}{'\u00a0'}{'\u00a0'}
                                <div className = 'progress_body' ref = "OnmouseDown">
                                    <div className = 'progress_line' onClick = {this.clickAdjustProgress.bind(this)}>
                                        <div className = 'progress_line_left' style = {{'width':this.state.progress_line_left}}></div>
                                        <div className = 'progress_line_right' style = {{'width':this.state.progress_line_right}}></div>
                                    </div>
                                    <div className = 'progress_btn' style = {{'left':this.state.progress_line_left}} onMouseDown = {this.OnmouseDown.bind(this)}></div>
                                </div>
                                {'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{this.state.time_m?this.state.time_m:'00'}:{this.state.time_s?this.state.time_s:'00'}
                            </div>
                        </div>
                        <div className = 'voice'>
                            <div className = 'play_order'>
                                <img src = {require('./img/'+this.state.play_order+'.png')}  onClick = { () => this.changeorder()} />
                            </div>
                            <div className = 'voice_progress'>
                                <img src = {require('./img/'+this.state.voice+'.png')}  onClick = { () => this.mute()}/>
                                {'\u00a0'}{'\u00a0'}{'\u00a0'}
                                <div className = 'progress_body'>
                                    <div className = 'progress_line' onClick = {this.clickVoiceProgress.bind(this)} ref = 'voiceprogress'>
                                        <div className = 'progress_line_left' style = {{'width':this.state.voiceprogress_line_left}}></div>
                                        <div className = 'progress_line_right' style = {{'width':this.state.voiceprogress_line_right}}></div>
                                    </div>
                                    <div className = 'progress_btn1' style = {{'left':this.state.voiceprogress_line_left}} onMouseDown = {this.VoiceOnmouseDown.bind(this)}></div>
                                    {/* <div className = 'progress_btn' style = {{'left':this.state.voiceprogress_line_left}}></div> */}
                                </div>
                            </div>
                            {'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapstatetoprops = (state) => {
    return{
        canchangeplaystatus:state.player.canchangeplaystatus,
        playtype:state.player.playtype,
        playlocalIndex:state.player.playlocalIndex,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
      open_play_detail  (data)  {
            const action = openplaydetail(true,data)
            dispatch(action)
      }
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Player)