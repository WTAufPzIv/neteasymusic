import React from 'react';
import './localmusic.css'
import { play_localmusic,canchangeplaystatus,canntchangeplaystatus} from '../../store/actionCreators'
import store from '../../store/index'
import { connect } from 'react-redux'
const { ipcRenderer} = window.require('electron');
const { shell } = window.require('electron')
class Localmusic extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            musicNum:0,
            files:[],
            isLoad:true,
            visable:'none',
        }
        var that = this
        var that = this
        ipcRenderer.send('getlocalmusic_msg')
        ipcRenderer.on('getlocalmusic',(event,files)=>{
            if(files){
                that.setState({
                    files:files || []
                },() => {
                    console.log(that.state)
                    that.setState({
                        isLoad:true
                    })
                })
            }
            
        })
    }
    componentWillMount(){
        const action = canntchangeplaystatus()//锁定播放状态不受store更改的影响
        store.dispatch(action) 
    }
    componentDidMount(){
        document.addEventListener('contextmenu', this.contextmenu);
        document.addEventListener('click', this._handleClick);
    }
    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.contextmenu);
        document.removeEventListener('click', this._handleClick);
        console.log('卸载本地列表')
      }
    send_addlocalmusic_msg = () => {
        ipcRenderer.send('addlocalmusic')
    }
   nge(e){
        console.log(e.target)
    }
    dbclick_play = (index) =>   {
        console.log('点')
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_localmusic(index,1,this.state.files)
        store.dispatch(action)//发送播放信息,代号为1，表示播放本地音乐
    }
    contextmenu = (event) => {
       console.log(event.target.id)
       this.setState({
           musicNum:event.target.id
       })
       var bodyWidth = this.refs.localmusic_bodyDom.offsetWidth
       var bodyHeight = this.refs.localmusic_bodyDom.offsetHeight
       event.preventDefault();
       const clickX = event.clientX;
       const clickY = event.clientY;
       console.log(clickX,clickY)
       console.log(event.target.className)
       if(event.target.className === 'localmusic_list-td' || event.target.className === 'localmusic_list-td1' || event.target.className === 'localmusic_list-td2' || event.target.className === 'localmusic_list-td3'  || event.target.className === 'localmusic_list-td4'){
            if(clickX-270 <= bodyWidth/2){
                this.setState({
                    visable:'flex'
                })
                this.listdom.style.left = `${clickX}px`
                if(clickY-55 <= bodyHeight/2) this.listdom.style.top = `${clickY}px`
                else if(clickY-55 > bodyHeight/2)  this.listdom.style.top = `${clickY-150}px`
            }
            else if(clickX-270 > bodyWidth/2){
                this.setState({
                    visable:'flex'
                })
                this.listdom.style.left = `${clickX-250}px`
                if(clickY-55 <= bodyHeight/2) this.listdom.style.top = `${clickY}px`
                else if(clickY-55 > bodyHeight/2)  this.listdom.style.top = `${clickY-150}px`
            }
       }
    }
    _handleClick = (event) => {
       // if(event.target.className !== '')
       this.setState({
           visable:'none'
       })
    }
    play = () => {
        console.log('点')
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_localmusic(this.state.musicNum,1)
        store.dispatch(action)//发送播放信息,代号为1，表示播放本地音乐
    }
    openFolder = () => {
        shell.beep()
        shell.showItemInFolder(this.state.files[this.state.musicNum].path)
    }
    deleteInList = () => {
        var flag = this.state.files[this.state.musicNum].id
        this.setState()
        ipcRenderer.send('deleteItem', flag)
        this.setState()
        var that = this
        //console.log(this.state.musicNum)
        //this.props.refresh()
        // const action = canchangeplaystatus()
        // store.dispatch(action)
        // const action1 = canntchangeplaystatus()
        // store.dispatch(action1)
        var flag1 = this.state.files
        flag1.splice(this.state.musicNum,1)
        this.setState({
            files:flag1
        })
    }
    render(){
        if(this.state.isLoad){
            return(
                <div className = 'localmusic_body' ref = 'localmusic_bodyDom'>
                    <div className = 'localmusic_head'>
                        <span>本地音乐</span>
                        <span onClick = {this.play}>{this.state.files.length}首音乐</span>
                        <span onClick = {this.send_addlocalmusic_msg}>添加音乐</span>
                    </div>
                    <div className = 'localmusic_listbody'>
                        <div className = 'localmusic_list_th'>
                            <div className = 'localmusic_list_th_name'><span style = {{'marginLeft':'50px'}}>歌曲名</span></div>
                            <div className = 'localmusic_list_th_singer'>歌手</div>
                            <div className = 'localmusic_list_th_album'>专辑</div>
                            <div className = 'localmusic_list_th_time'>歌曲文件</div>
                        </div>
                        {
                        this.state.files.map((item,index) => {
                            return (
                            <div>
                                <div className = 'localmusic_list-tr' id = {index} onDoubleClick = {()=>this.dbclick_play(index)}  >
                                    <div className = 'localmusic_list-td' id = {index}>{index}</div>
                                    <div className = 'localmusic_list-td1' id = {index}>{item.filename}</div>
                                    <div className = 'localmusic_list-td2' id = {index}>{item.artist || '未知'}</div>
                                    <div className = 'localmusic_list-td3' id = {index}>{item.album}</div>
                                    <div className = 'localmusic_list-td4' id = {index}>{item.type==='ID3'?'mp3':item.type}</div>
                                </div>
                            </div>
                            )
                        })
                        }
                        <div className = 'context_menu' style = {{'display':this.state.visable}} ref={ref => {this.listdom = ref}}>
                            <div onClick = {() => this.play()}>播放</div>
                            <div onClick = {() => this.openFolder()}>打开目录</div>
                            <div onClick = {() => this.deleteInList()}>从列表中删除</div>
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
// const mapstatetoprops = (state) => {
//     return {
        
//     }
// }
// const mapdispacthtoprops = (dispatch) => {
//     return {
//         refresh(){
//             const action = canchangeplaystatus()
//             dispatch(action)
//             const action1 = canntchangeplaystatus()
//             dispatch(action1)
//         }
//     }
// }
export default Localmusic