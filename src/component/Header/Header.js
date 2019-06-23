import  React  from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom';
import './Header.css'
const { ipcRenderer } = window.require('electron');
class Header extends Component{
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
            <div className = 'headBox'>
                <div className = 'head_logo'>NeteaseCloudMusic</div>
                <div className = 'head_search'>
                    <input className = 'head_search_input' placeholder = '搜索音乐，视频，歌词，电台'>
                        
                    </input>
                    <img src = {require(''+this.state.searchBtn)} onMouseOver = {this.changeSearchBtn} onMouseLeave = {this.changeSearchBtn}></img>
                </div>
                <div className = 'head_space'>
                    
                </div>
                <div className = 'head_MinMaxCloseBox'>
                    <img src = {require(''+this.state.MinWindow)} onMouseOver = {this.changeMinBtn} onMouseLeave = {this.changeMinBtn} onClick = {this.clickMinBtn} style = {{'cursor':'pointer'}}></img>
                    <img src = {require(''+this.state.MinOrMaxWindow)} onMouseOver = {this.changeMinOrMaxBtn} onMouseLeave = {this.changeMinOrMaxBtn} onClick = {this.clickMinOrMaxBtn} style = {{'cursor':'pointer'}}></img>
                    <img src = {require(''+this.state.CloseWindow)} onMouseOver = {this.changeCloseBtn} onMouseLeave = {this.changeCloseBtn} onClick = {this.clickCloseBtn} style = {{'cursor':'pointer'}}></img>
                </div>
            </div>
            <div className = "Headline"></div>
            </div>
        );
    }
}
export default Header