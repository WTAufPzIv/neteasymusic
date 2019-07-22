import  React  from 'react'
import { Component } from 'react'
import './Player.css'
import store from '../../store/index'
import { canntchangeplaystatus,openplaydetail,playstatus } from '../../store/actionCreators'
import { connect } from 'react-redux'
import { PLAY_LOCALMUSIC,CAN_CHANGE_PLAY_STATUS,CANNT_CHANGE_PLAY_STATUS,OPEN_PLAY_DETAIL,PLAY_STATUS } from "../../store/actionType";
import axios from 'axios';
import { message } from 'antd';
const audio = new Audio()
audio.autoplay = false
const { ipcRenderer } = window.require('electron');
class Player extends Component{
    constructor(props){
        super(props);
        // console.log(this.props)
        this.state = {
            play_type:1,//播放来源
            list_local:[],//本地播放列表
            item_local:{},//本地播放元素
            play_index:0,//播放索引
            title:'',//音乐标题
            album_name:'',//专辑
            artist_name:'',//歌手
            time_long:'',//总时长（秒）
            time_long_m:'',//分钟数
            time_long_s:'',//秒数
            status:'play',//播放器状态
            albumImg:'',//专辑图片
            current_time:'',//当前播放时间（秒）
            current_time_m:'',//当前播放时间分钟
            current_time_s:'',//当前播放时间秒数
            play_order:'order',//播放顺序
            progress_line_left:'',//进度条左边长度
            progress_line_right:'',//进度条右边长度
            voiceprogress_line_left:'0%',//音量条左边长度
            voiceprogress_line_right:'100%',//音量条右边长度
            voice:'no',//是否有声音
            voicenum:0,//音量大小
            ids:[],//在线播放音乐id列表
            item_net:{},//在线播放元素
            // list:[],
            // status:'play',
            // index:0,
            // title:'',
            // artist:'',
            // albumImg:'./img/album.png',
            // current_time:'',
            // current_time_m:'',
            // current_time_s:'',
            // time:'',
            // time_m:'',
            // time_s:'',
            // progress_line_left:'',
            // progress_line_right:'',
            // voiceprogress_line_left_num:0,
            // voiceprogress_line_left:'0%',
            // voiceprogress_line_right:'100%',
            // voicenum:0,
            // MinWindow:'./img/min_window_g.png',
            // MinOrMaxWindow:'./img/max_window_g.png',
            // CloseWindow:'./img/close_window_g.png',
            // searchBtn:'./img/search_g.png',
            // PlayOrder:1,//1：顺序播放 2：单曲循环 3：随机播放,
            // play_order:'order',
            // voice:'yes',
            // play_type:1
        };
        store.subscribe(this.get_play_message);
        // this.changeMinBtn = this.changeMinBtn.bind(this)
        // this.changeMinOrMaxBtn = this.changeMinOrMaxBtn.bind(this)
        // this.changeCloseBtn = this.changeCloseBtn.bind(this)
        // this.clickMinOrMaxBtn = this.clickMinOrMaxBtn.bind(this)
        // this.changeSearchBtn = this.changeSearchBtn.bind(this)
        audio.addEventListener('ended',() => {
            console.log('end')
            //发送下一首播放请求
            this.next_music()
        })
    }
    componentDidMount(){
        // console.log('组件已渲染')
        var that = this
        // //从缓存中获取用户上一次使用程序时候播放器的播放音量，播放列表，播放索引的数据，并加载对应音频
        ipcRenderer.send('getvoice')
        ipcRenderer.on('getvoiceData',(event,num) => {
            console.log('音量：'+num)
            that.setState({
                voicenum:num,
                voiceprogress_line_left:num*100+'%',
                voiceprogress_line_right:(1-num)*100+'%',
            })
            if(num !== 0){
                that.setState({
                    voice:'yes'
                })
            }
            else{
                that.setState({
                    voice:'no'
                })
            }
            audio.volume = num
        })
        ipcRenderer.send('getlastplaylist')
        ipcRenderer.on('lastplaylistdata',(event,data,num,type) => {
            that.setState({
                list:data || [],
                index:num || 0,
                play_type:type || 0
            })
            if(type === 1){
                if(data.length > 0){
                    that.setState({
                        list_local:data,
                        item_local:data[num],
                        artist_name:data[num].artist,
                        title:data[num].title,
                        album_name:data[num].album,
                        play_index:num
                    })
                    audio.src = data[num].path
                    audio.load()
                }
            }
        })
        audio.addEventListener('timeupdate', () => {
            //更新播放器状态
            this.updataProgressHTML(audio.currentTime)//获取当前播放时间
        })
        
    }
    open_play_detail = () => {
        console.log('我草啊')
        if(this.props.play_type === 1){
            const action = openplaydetail(true,this.state.item_local)
            store.dispatch(action)
            console.log('你妹啊')
        }
        else if(this.props.play_type === 2){
            // const action = openplaydetail(true,this.state.item_net)
            // store.dispatch(action)
            console.log('为什么')
            console.log(this.state.item_net)
        }
    }
    updataProgressHTML = (currentTime) => {
        // console.log(currentTime)
        var that = this
        this.setState({
            current_time:currentTime,
            current_time_m:Math.floor(currentTime/60)>=10?Math.floor(currentTime/60):'0'+Math.floor(currentTime/60),
            current_time_s:Math.floor(currentTime-Math.floor(currentTime/60)*60)>=10?Math.floor(currentTime-Math.floor(currentTime/60)*60):'0'+Math.floor(currentTime-Math.floor(currentTime/60)*60)
        },() => {
            that.setState({
                progress_line_left:currentTime/that.state.time_long*100+'%',
                progress_line_right:100-currentTime/that.state.time_long*100+'%'
            })
        })
    }
    componentWillUnmount(){
        // ipcRenderer.send('saveplaylist',this.props.play_local_data,this.state.index)
    }
    get_play_message = () => {
        setTimeout(() => {
            console.log(this.props)
            if(this.props.canchangeplaystatus === true){
                if(this.props.play_type === 1){
                    ipcRenderer.send('saveplaylist',this.props.play_local_list,this.props.play_Index,this.props.play_type)
                    let that = this
                    this.setState({
                        list_local:that.props.play_local_list,
                        item_local:that.props.play_local_item,
                        play_index:that.props.play_Index,
                        title:that.props.play_local_item.title,
                        album_name:that.props.play_local_item.album,
                        artist_name:that.props.play_local_item.artist
                    })
                    audio.src = that.props.play_local_item.path
                    audio.load()
                    audio.oncanplay = () => {
                        that.setState({
                            time_long:audio.duration,
                            time_long_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                            time_long_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                            status:'pause',
                            albumImg:'./img/album.png'
                        })
                        audio.play() 
                        const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
                        store.dispatch(action)
                        const play = playstatus(true)
                        store.dispatch(play)
                    }
                }
                else if(this.props.play_type === 2){
                    console.log('播放在线')
                    console.log(this.props)
                    let that = this
                    this.setState({
                        play_type:2,
                        play_index:that.props.play_Index,
                        ids:that.props.trackids,
                    })
                    axios.post('http://localhost:9093/check/music?id='+this.props.trackids[this.props.play_Index].id)
                    .then(res => {
                        if(res.data.success === true){
                            axios.post('http://localhost:9093/song/url?id='+that.props.trackids[this.props.play_Index].id)
                            .then(ress => {
                                axios.post('http://localhost:9093/song/detail?ids='+that.props.trackids[this.props.play_Index].id)
                                .then(resss => {
                                    that.setState({
                                        title:resss.data.songs[0].name,
                                        album_name:resss.data.songs[0].al.name,
                                        artist_name:resss.data.songs[0].ar[0].name,
                                        albumImg:resss.data.songs[0].al.picUrl,
                                        item_net:{
                                            album:resss.data.songs[0].al.name,
                                            artist:resss.data.songs[0].ar[0].name,
                                            title:resss.data.songs[0].name,
                                            path:ress.data.data[0].url,
                                            albumImg:resss.data.songs[0].al.picUrl,
                                        }
                                    })
                                    audio.src = ress.data.data[0].url
                                    audio.load()
                                    // let thatt = that
                                    audio.oncanplay = () => {
                                        that.setState({
                                            time_long:audio.duration,
                                            time_long_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                                            time_long_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                                            status:'pause', 
                                        })
                                        audio.play()
                                        console.log(that.state)
                                        const action = canntchangeplaystatus()
                                        store.dispatch(action)
                                        const play = playstatus(true)
                                        store.dispatch(play)
                                    }
                                })
                            })
                        }
                        else{
                            message.error('您不是会员或网易没有版权')
                        }
                    })
                }
            }
        },100)
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
            audio.currentTime = (ev.pageX-275)/wid*that.state.time_long
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
        audio.currentTime = (disx-275)/wid*that.state.time_long
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
        if(this.props.play_type === 1){
            let that = this
            if(this.state.play_order === 'order' && audio.src){
                var flag = this.state.play_index
                flag = (flag === this.state.list_local.length-1) ? 0 : flag + 1
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag],
                    title:that.state.list_local[flag].title,
                    album_name:that.state.list_local[flag].album,
                    artist_name:that.state.list_local[flag].artist
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'loop' && audio.src){
                flag = this.state.play_index
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag],
                    title:that.state.list_local[flag].title,
                    album_name:that.state.list_local[flag].album,
                    artist_name:that.state.list_local[flag].artist
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'random' && audio.src){
                parseInt(Math.random()*(this.state.list_local.length+1),10);
                var i = Math.floor(Math.random()*(this.state.list_local.length+1));
                // console.log(i)
                flag = i;
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag] || {},
                    title:that.state.list_local[flag].title || '',
                    album_name:that.state.list_local[flag].album || '',
                    artist_name:that.state.list_local[flag].artist ||''
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
        }




        //在线播放的逻辑
        else if(this.props.play_type === 2){
            let that = this
            if(this.state.play_order === 'order' && audio.src){
                flag = this.state.play_index
                flag = (flag === this.state.ids.length-1) ? 0 : flag + 1
                ipcRenderer.send('saveindex',flag)
                    let that = this
                    this.setState({
                        play_type:2,
                        play_index:flag,
                    })
                    axios.post('http://localhost:9093/check/music?id='+this.props.trackids[flag].id)
                    .then(res => {
                        if(res.data.success === true){
                            axios.post('http://localhost:9093/song/url?id='+that.props.trackids[flag].id)
                            .then(ress => {
                                axios.post('http://localhost:9093/song/detail?ids='+that.props.trackids[flag].id)
                                .then(resss => {
                                    that.setState({
                                        title:resss.data.songs[0].name,
                                        album_name:resss.data.songs[0].al.name,
                                        artist_name:resss.data.songs[0].ar[0].name,
                                        albumImg:resss.data.songs[0].al.picUrl,
                                        item_net:{
                                            album:resss.data.songs[0].al.name,
                                            artist:resss.data.songs[0].ar[0].name,
                                            title:resss.data.songs[0].name,
                                            path:ress.data.data[0].url,
                                            albumImg:resss.data.songs[0].al.picUrl,
                                        }
                                    },() => {
                                        const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,that.state.item_net)
                                        store.dispatch(action1)
                                    })
                                    audio.src = ress.data.data[0].url
                                    audio.load()
                                    // let thatt = that
                                    audio.oncanplay = () => {
                                        that.setState({
                                            time_long:audio.duration,
                                            time_long_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                                            time_long_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                                            status:'pause', 
                                        })
                                        audio.play()
                                        console.log(that.state)
                                        const action = canntchangeplaystatus()
                                        store.dispatch(action)
                                        const play = playstatus(true)
                                        store.dispatch(play)
                                    }
                                })
                            })
                        }
                        else{
                            message.error('您不是会员或网易没有版权')
                        }
                    })
                ipcRenderer.send('saveplaylist',this.state.ids,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'loop' && audio.src){
                flag = this.state.play_index
                ipcRenderer.send('saveindex',flag)
                    let that = this
                    this.setState({
                        play_type:2,
                        play_index:flag,
                    })
                    axios.post('http://localhost:9093/check/music?id='+this.props.trackids[flag].id)
                    .then(res => {
                        if(res.data.success === true){
                            axios.post('http://localhost:9093/song/url?id='+that.props.trackids[flag].id)
                            .then(ress => {
                                axios.post('http://localhost:9093/song/detail?ids='+that.props.trackids[flag].id)
                                .then(resss => {
                                    that.setState({
                                        title:resss.data.songs[0].name,
                                        album_name:resss.data.songs[0].al.name,
                                        artist_name:resss.data.songs[0].ar[0].name,
                                        albumImg:resss.data.songs[0].al.picUrl,
                                        item_net:{
                                            album:resss.data.songs[0].al.name,
                                            artist:resss.data.songs[0].ar[0].name,
                                            title:resss.data.songs[0].name,
                                            path:ress.data.data[0].url,
                                            albumImg:resss.data.songs[0].al.picUrl,
                                        }
                                    },() => {
                                        const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,that.state.item_net)
                                        store.dispatch(action1)
                                    })
                                    audio.src = ress.data.data[0].url
                                    audio.load()
                                    // let thatt = that
                                    audio.oncanplay = () => {
                                        that.setState({
                                            time_long:audio.duration,
                                            time_long_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                                            time_long_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                                            status:'pause', 
                                        })
                                        audio.play()
                                        console.log(that.state)
                                        const action = canntchangeplaystatus()
                                        store.dispatch(action)
                                        const play = playstatus(true)
                                        store.dispatch(play)
                                    }
                                })
                            })
                        }
                        else{
                            message.error('您不是会员或网易没有版权')
                        }
                    })
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.item_net)
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.state.ids,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'random' && audio.src){
                parseInt(Math.random()*(this.state.ids.length+1),10);
                i = Math.floor(Math.random()*(this.state.ids.length+1));
                // console.log(i)
                flag = i;
                ipcRenderer.send('saveindex',flag)
                    let that = this
                    this.setState({
                        play_type:2,
                        play_index:flag,
                    })
                    axios.post('http://localhost:9093/check/music?id='+this.props.trackids[flag].id)
                    .then(res => {
                        if(res.data.success === true){
                            axios.post('http://localhost:9093/song/url?id='+that.props.trackids[flag].id)
                            .then(ress => {
                                axios.post('http://localhost:9093/song/detail?ids='+that.props.trackids[flag].id)
                                .then(resss => {
                                    that.setState({
                                        title:resss.data.songs[0].name,
                                        album_name:resss.data.songs[0].al.name,
                                        artist_name:resss.data.songs[0].ar[0].name,
                                        albumImg:resss.data.songs[0].al.picUrl,
                                        item_net:{
                                            album:resss.data.songs[0].al.name,
                                            artist:resss.data.songs[0].ar[0].name,
                                            title:resss.data.songs[0].name,
                                            path:ress.data.data[0].url,
                                            albumImg:resss.data.songs[0].al.picUrl,
                                        }
                                    },() => {
                                        const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,that.state.item_net)
                                        store.dispatch(action1)
                                    })
                                    audio.src = ress.data.data[0].url
                                    audio.load()
                                    // let thatt = that
                                    audio.oncanplay = () => {
                                        that.setState({
                                            time_long:audio.duration,
                                            time_long_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                                            time_long_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                                            status:'pause', 
                                        })
                                        audio.play()
                                        console.log(that.state)
                                        const action = canntchangeplaystatus()
                                        store.dispatch(action)
                                        const play = playstatus(true)
                                        store.dispatch(play)
                                    }
                                })
                            })
                        }
                        else{
                            message.error('您不是会员或网易没有版权')
                        }
                    })
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.item_net)
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.state.ids,flag,this.props.play_type)
            }
        }
    }
    pre_music = () => {
        if(this.props.play_type === 1){
            let that = this
            if(this.state.play_order === 'order' && audio.src){
                console.log('顺序播放')
                var flag = this.state.play_index
                flag = (flag === 0) ? this.state.list_local.length-1 : flag - 1
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag],
                    title:that.state.list_local[flag].title,
                    album_name:that.state.list_local[flag].album,
                    artist_name:that.state.list_local[flag].artist
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'loop' && audio.src){
                console.log('单曲循环')
                flag = this.state.play_index
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag],
                    title:that.state.list_local[flag].title,
                    album_name:that.state.list_local[flag].album,
                    artist_name:that.state.list_local[flag].artist
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
            else if(this.state.play_order === 'random' && audio.src){
                console.log('随机播放')
                parseInt(Math.random()*(this.state.list_local.length+1),10);
                var i = Math.floor(Math.random()*(this.state.list_local.length+1));
                // console.log(i)
                flag = i;
                this.setState({
                    play_index:flag,
                    item_local:that.state.list_local[flag],
                    title:that.state.list_local[flag].title,
                    album_name:that.state.list_local[flag].album,
                    artist_name:that.state.list_local[flag].artist
                })
                ipcRenderer.send('saveindex',flag)
                audio.src = this.state.list_local[flag].path
                audio.load()
                audio.oncanplay = () => {
                    that.setState({
                        time:audio.duration,
                        time_m:Math.floor(audio.duration/60) >= 10? Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60),
                        time_s:Math.floor(audio.duration-Math.floor(audio.duration/60)*60) >= 10?Math.floor(audio.duration-Math.floor(audio.duration/60)*60):'0'+Math.floor(audio.duration-Math.floor(audio.duration/60)*60),
                        status:'pause',
                    })
                    console.log('为什么不放啊')
                    audio.play()
                    const action = canntchangeplaystatus()
                    store.dispatch(action)
                }
                const action1 = openplaydetail(store.getState().player.open_play_detail?true:false,this.state.list_local[flag])
                store.dispatch(action1)
                ipcRenderer.send('saveplaylist',this.props.play_local_list,flag,this.props.play_type)
            }
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
            })
        }
        else if(this.state.play_order === 'loop'){
            this.setState({
                play_order:'random',
            })
        }
        else if(this.state.play_order === 'random'){
            this.setState({
                play_order:'order',
            })
        }
    }
    render(){
        return(
            <div>
                
                <div className = 'play_body'>
                    <div className = 'play_img' onClick = {() => this.props.open_play_detail(this.props.play_type === 1?this.state.item_local:this.state.item_net)}>
                        <img src = {this.props.play_type === 1?require('./img/album.png'):this.state.albumImg+'?param=50y50'} />
                    </div>
                    <div className = 'base_Btn'>
                        <div className = 'base_Btn_left'  onClick = { () => this.pre_music()}><img src = {require('./img/左播放.png')} /></div>
                        <div className = 'base_Btn_center' onClick = {()=>this.pauseandplay()}><img src = {require('./img/'+ this.state.status+ '.png')} /></div>
                        <div className = 'base_Btn_right'  onClick = { () => this.next_music()}><img src = {require('./img/右播放.png')} /></div>
                    </div>
                    <div className = 'play_control'>
                        <div className = 'progress_bar' ref = 'progress_bar'>
                            <div className = 'progress_title' style = {{'borderLeft':'10px'}}>{this.state.title || 'no play'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{this.state.artist_name}</div>
                            <div className = 'progress'>
                                {this.state.current_time_m?this.state.current_time_m:'00'}:{this.state.current_time_s?this.state.current_time_s:"00"}{'\u00a0'}{'\u00a0'}{'\u00a0'}
                                <div className = 'progress_body' ref = "OnmouseDown">
                                    <div className = 'progress_line' onClick = {this.clickAdjustProgress.bind(this)}>
                                        <div className = 'progress_line_left' style = {{'width':this.state.progress_line_left}}></div>
                                        <div className = 'progress_line_right' style = {{'width':this.state.progress_line_right}}></div>
                                    </div>
                                    <div className = 'progress_btn' style = {{'left':this.state.progress_line_left}} onMouseDown = {this.OnmouseDown.bind(this)}></div>
                                </div>
                                {'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{'\u00a0'}{this.state.time_long_m?this.state.time_long_m:'00'}:{this.state.time_long_s?this.state.time_long_s:'00'}
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
        play_type:state.player.playtype,
        play_Index:state.player.playIndex,
        play_local_list:state.player.playlist_local,
        play_local_item:state.player.playdata_local,
        trackids:state.player.ids_net
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







