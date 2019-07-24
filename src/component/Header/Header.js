import  React  from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom';
import './Header.css'
import { connect } from 'react-redux'
import { getloginstatus,openuser,openuserdetail,openmascontainer, actsearchtip, inputsearch } from '../../store/actionCreators'
import { message } from 'antd'
import 'antd/dist/antd.css';
const { ipcRenderer } = window.require('electron');
class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            MinWindow:'./img/min_window_g.png',
            MinOrMaxWindow:'./img/max_window_g.png',
            CloseWindow:'./img/close_window_g.png',
            searchBtn:'./img/search_g.png',
            login_status:false
        };
        this.changeMinBtn = this.changeMinBtn.bind(this)
        this.changeMinOrMaxBtn = this.changeMinOrMaxBtn.bind(this)
        this.changeCloseBtn = this.changeCloseBtn.bind(this)
        this.clickMinOrMaxBtn = this.clickMinOrMaxBtn.bind(this)
        this.changeSearchBtn = this.changeSearchBtn.bind(this)
    }
    componentWillMount(){
        this.props.loginstatus()
    }
    componentDidMount(){
        //this.props.loginstatus()
        //this.setState({
        //    login_status:this.props.login_status
        //})
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
    openusercontainer = () => {
        if(this.props.login_status){
            // console.log('打开用户信息界面')
            this.props.open_userdetail(true)
        }
        else{
            // console.log('打开登录注册界面')
            this.props.open_user(true)
        }
    }
    openmsgcontainer = () => {
        if(this.props.login_status){
            this.props.open_msg_container(true)
            // console.log('打开消息面板')
           
        }
        else{
            message.warning('还没有登录');
        }
    }
    opensearchtip = () => {
        // console.log('打开搜索提示')
        this.props.open_search_tip(true)
    }
    closesearch = () => {
        // console.log('关闭搜索提示')
        var that = this
        setTimeout(() => {
            that.props.open_search_tip(false)
        },200)
        
    }
    inputtext = (e) => {
        // console.log(e.target.value)
        // if(e.target.value.replace(/\s*/g,"") !== '')
            this.props.input_search(e.target.value)
    }
    render(){
        return(
            <div>
            <div className = 'headBox'>
                <div className = 'head_logo'>NetEasyCloud Music</div>
                <div className = 'head_search'>
                    <input className = 'head_search_input' placeholder = '搜索音乐，视频，歌词' onFocus = {() => this.opensearchtip()} onBlur = {() => this.closesearch()} onChange = {(e) => this.inputtext(e)}>
                    </input>
                    <img src = {require(''+this.state.searchBtn)} onMouseOver = {this.changeSearchBtn} onMouseLeave = {this.changeSearchBtn}></img>
                    {/* <div></div> */}
                </div>
                <div className = 'head_space'>
                    <div className = 'userstatus'>
                        <div className = 'avatar' onClick = {() =>this.openusercontainer()}>
                            <img src = {this.props.login_status === true?this.props.user_info.profile.avatarUrl+'':require('./img/user.png')}></img>
                        </div>
                        <div onClick = {() =>this.openusercontainer()}>{this.props.login_status === true?this.props.user_info.profile.nickname:'未登录'}</div>
                    </div>
                    {/* <div className = 'msg' onClick = {() =>this.openmsgcontainer()}>
                        <img src = {require('./img/msg.png')}></img>
                    </div> */}
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
const mapstatetoprops = (state) => {
    return{
        login_status: state.user.loginstatus,
        user_info:state.user.user.data || {},
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        loginstatus:() => dispatch(getloginstatus()),
        open_user: (bool) => dispatch(openuser(bool)),
        open_userdetail: (bool) => dispatch(openuserdetail(bool)),
        open_msg_container: (bool) => dispatch(openmascontainer(bool)),
        open_search_tip:(bool) => dispatch(actsearchtip(bool)),
        input_search : (e) => dispatch(inputsearch(e))
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Header)