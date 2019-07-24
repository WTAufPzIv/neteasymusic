import React from 'react';
import { askyunpan } from '../../store/actionCreators'
import { connect } from 'react-redux'
import moment from 'moment'
import './yunpan.css'
import { ProgressCircle } from 'react-desktop/windows';
import store from '../../store/index'
import { canchangeplaystatus,play_netmusic   } from '../../store/actionCreators'
class Yunpan extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        if(this.props.login_status){
            this.props.ask_yunpan()
        }
    }
    play = (data,index) => {
        var arr = []
        data.map((item) => {
            arr.push({
                id:item.songId
            })
        })
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_netmusic(index,arr,true)
        store.dispatch(action)
    }
    render(){
        return(
            <div className = 'yunpan_body'>
                {
                    this.props.login_status === true?(
                        <div className = 'yunpan_vis'>
                            <div className = 'yunpan_head'>
                                <div className = 'yunpan_head1'>
                                    <p>我的音乐云盘</p>
                                    <span>已使用：{this.props.get_yunpan?Math.floor(this.props.yunpan_data.data.size/1024/1024/1024*100)/100:''}GB/总大小：{this.props.get_yunpan?Math.floor(this.props.yunpan_data.data.maxSize/1024/1024/1024*100)/100:''}GB</span>
                                    <span>歌曲永久保存，随之随地多端畅听</span>
                                    <span style = {{'cursor':'pointer','color':'blue'}}>扩容</span>
                                </div>
                                <div className = 'yunpan_head2'>
                                    <img  src = {require('./img/play.png')}/>
                                    <span>播放全部</span>
                                </div>
                            </div>
                            <div className = 'yunpan_tr'>
                                <div className = 'yunpan_tr_name'>音乐标题</div>
                                <div className = 'yunpan_tr_artist'>歌手</div>
                                <div className = 'yunpan_tr_album'>专辑</div>
                                <div className = 'yunpan_tr_size'>大小</div>
                                <div className = 'yunpan_tr_time'>上传时间</div>
                            </div>
                            {
                                this.props.get_yunpan === true?this.props.yunpan_data.data.data.map((item,index) => {
                                    return (
                                        <div className = 'yunpan_item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(this.props.yunpan_data.data.data,index)}>
                                            <div className = 'yunpan_item_index'>{index+1}</div>
                                            <div className = 'yunpan_item_name'>{item.songName}</div>
                                            <div className = 'yunpan_item_artist'>{item.artist}</div>
                                            <div className = 'yunpan_item_album' style={{"WebkitBoxOrient": "vertical"}}>{item.album}</div>
                                            <div className = 'yunpan_item_size'>{Math.floor(item.fileSize/1024/1024)}MB</div>
                                            <div className = 'yunpan_item_time'>{moment(parseInt(item.addTime)).format("YYYY-MM-DD")}</div>
                                        </div>
                                    )
                                }):(
                                    <div><ProgressCircle
                                    color='white'
                                    size={100}
                                    /></div>
                                )
                            }
                        </div>
                    ):(
                        <div className = 'yunpan_nologin'>
                            <img src = {require('./img/MBE风格多色图标-云盘.png')}></img>
                            <span>登录后使用音乐云盘</span>
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
    //    login_status:false,
       login_status:state.user.loginstatus,
       get_yunpan:state.yunpan.getyunpan,
       yunpan_data:state.yunpan.yunpandata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_yunpan:() => dispatch(askyunpan())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Yunpan)