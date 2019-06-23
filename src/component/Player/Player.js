import  React  from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom';
import './Player.css'
const { ipcRenderer } = window.require('electron');
class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            MinWindow:'./img/min_window_g.png',
            MinOrMaxWindow:'./img/max_window_g.png',
            CloseWindow:'./img/close_window_g.png',
            searchBtn:'./img/search_g.png'
        };
        this.changeMinBtn = this.changeMinBtn.bind(this)
        this.changeMinOrMaxBtn = this.changeMinOrMaxBtn.bind(this)
        this.changeCloseBtn = this.changeCloseBtn.bind(this)
        this.clickMinOrMaxBtn = this.clickMinOrMaxBtn.bind(this)
        this.changeSearchBtn = this.changeSearchBtn.bind(this)
    }
    componentDidMount(){
        var that = this
        ipcRenderer.on('maxWindowOk',()=>{
            // that.setState({
            //     MinOrMaxWindow:'./img/small_window_w.png'
            // })
            setTimeout(()=>{
                that.setState({
                   MinOrMaxWindow:'./img/small_window_g.png'
                 })   
            },100)
        })
        ipcRenderer.on('smallWindowOk', () =>{
            // that.setState({
            //     MinOrMaxWindow:'./img/max_window_w.png'
            // })
            setTimeout(()=>{
                that.setState({
                    MinOrMaxWindow:'./img/max_window_g.png'
                }) 
            },100)
        })
    }
    changeMinBtn(){
        //this.style.cursor='hand'
        var that = this
        this.setState({
            MinWindow:that.state.MinWindow == './img/min_window_w.png'?'./img/min_window_g.png':'./img/min_window_w.png'
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
            CloseWindow:that.state.CloseWindow == './img/close_window_g.png'?'./img/close_window_w.png':'./img/close_window_g.png'
        })
    }
    clickMinBtn(){
        ipcRenderer.send('minWindow')
    }
    clickMinOrMaxBtn(){
        var that = this
        if(this.state.MinOrMaxWindow == './img/max_window_w.png'){
            ipcRenderer.send('maxWindow')
            that.setState({
                MinOrMaxWindow:'./img/max_window_g.png'
            })
        }
        else if(this.state.MinOrMaxWindow == './img/small_window_w.png'){
            ipcRenderer.send('smallWindow')
            that.setState({
                MinOrMaxWindow:'./img/small_window_g.png'
            })
        }
        // ipcRenderer.on('maxWindowOk',()=>{
        //     that.setState({
        //         MinOrMaxWindow:'./img/small_window_g.png'
        //     })
        // })
        // ipcRenderer.on('smallWindowOk', () =>{
        //     that.setState({
        //         MinOrMaxWindow:'./img/max_window_g.png'
        //     })
        // })
    }
    clickCloseBtn(){
        ipcRenderer.send('closeWindow')
    }
    changeSearchBtn(){
        var that = this
        this.setState({
            searchBtn:that.state.searchBtn == './img/search_g.png'?'./img/search_w.png':'./img/search_g.png'
        })
    }
    render(){
        return(
            <div>
                <div className = 'play_body'>
                    <div className = 'base_Btn'>
                        <div className = 'base_Btn_left'><img src = {require('./img/左播放.png')} /></div>
                        <div className = 'base_Btn_center'><img src = {require('./img/pause.png')} /></div>
                        <div className = 'base_Btn_right'><img src = {require('./img/右播放.png')} /></div>
                        {/* <img src = {require('./img/左播放.png')} />
                        <img src = {require('./img/pause.png')} />
                        <img src = {require('./img/右播放.png')} /> */}
                    </div>
                </div>
            </div>
        );
    }
}
export default Player