import React from 'react'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import {  message } from 'antd'
import { askalbumdetail,askalbumcomment,askmorealbumcomment,deletalbumedata,collalbum,newtop,askalbumdynamic,popstack } from '../../store/actionCreators'
import { NavLink,withRouter,Route,Switch, Redirect } from 'react-router-dom'
import List from './list/list'
import Comments from './comment/comment'
import Des from './des/des'
import './album.css'
import moment from 'moment'
class Album extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            router:'list',
            page:0,
            deep:-1,
            commentdata:[],
            id:0,
        }
        this.props.history.listen( () => this.next())
    }
    next = () => {
        if(this.props.location.state && this.props.Path === 'album'){
            this.props.delete_album_data()
            this.props.ask_album_detail(this.props.location.state.id)
            this.props.ask_album_comment(this.props.location.state.id,this.state.page)
            this.props.ask_album_dynamic(this.props.location.state.id)
            var that = this
            this.setState({
                page:0,
                id:that.props.location.state.id,
            })
        }
    }
    
    componentDidMount(){
        this.refs.album_body.onScroll = () => this.scrool()
    }
    goback = () => {
        var i = this.props.pop_data
        this.props.pop_stack()
        this.props.delete_album_data()
        this.props.history.go(i)
    }
    changerouter = (e) => {
        var that = this
        this.setState({
            router:e,
            deep:that.state.deep - 1
        })
        this.props.new_top()
    }
    scrool = () => {
        console.log(document.body.clientHeight+' '+(this.refs.album_body.scrollTop+315)+' '+this.refs.album_body.scrollHeight+' '+this.refs.album_page.offsetHeight) 
        if(this.refs.album_page.offsetHeight === (this.refs.album_body.scrollTop+315+27) && this.state.router === 'comment'){   
            if(this.props.get_album_comment){
                if(this.props.album_comment_data.more){
                    console.log('加载')
                    this.setState({
                        page:this.props.album_comment_data_all[this.props.album_comment_data_all.length-1].time
                    })
                    this.props.ask_more_album_comment(this.state.id,this.props.album_comment_data.comments[this.props.album_comment_data.comments.length-1].time)
                }
                else{
                    message.warning('没有更多评论了');
                }
            }
        }
    }
    collect = (bool) => {
        this.props.collect(this.state.id,bool === true?2:1)
    }
    share = () => {
        this.props.share(this.state.id)
    }
    render = () => {
        return (
            <div className = 'album_body' onScroll = { () => this.scrool()} ref = 'album_body'>
                <div className = 'album_back' onClick = { () => this.goback()} style = {{'display':this.state.position==='left'?'none':'block'}}>返回</div>
                {
                    this.props.get_album_detail?(
                        <div className = 'album_head'>
                            <img src = {this.props.album_detail_data.album.picUrl+'?param=200y200'}></img>
                            <div className = 'album_info'>
                                <div className = 'album_title'>
                                    <span>{this.props.album_detail_data.album.name}</span>
                                    <div className = 'album_count'>
                                        <span style = {{'marginRight':'15px'}}>歌曲数：{this.props.album_detail_data.album.size}</span>
                                        {/* <span>播放量:{this.props.album_detail_data.album.playCount}</span> */}
                                    </div>
                                </div>
                                <div className = 'album_create'>
                                    {/* <div><img src = {this.props.album_detail_data.data.album.creator.avatarUrl+'?param=50y50'}></img></div> */}
                                    <span>艺术家:{this.props.album_detail_data.album.artist.name}</span>
                                    <p>发行时间：{moment(parseInt(this.props.album_detail_data.album.publishTime)).format("YYYY年MM月DD日")}</p>
                                </div>
                                <div className = 'album_action'>
                                    <div className = 'album_action_play'>播放全部</div>
                                    <div className = 'album_action_collect' onClick = {() => this.collect(this.props.album_dynamic_data.isSub)}>{this.props.album_dynamic_data.isSub?('已收藏:'+this.props.album_dynamic_data.subCount):('收藏:'+this.props.album_dynamic_data.subCount)}</div>
                                    <div className = 'album_action_download'>下载全部</div>
                                </div>
                                {/* <div className = 'album_action_description' style={{"WebkitBoxOrient": "vertical"}}>
                                    【简介】：{this.props.album_detail_data.album.description}
                                </div> */}
                            </div>
                        </div>
                    ):(
                        <div>
                            <ProgressCircle color='white' size={100} />
                        </div>
                    )
                }
                <div className = 'album_nav'>
                    <NavLink to = '/album/list'><div className = {this.state.router === 'list'?'album_nav_activity':'album_nav_normal'} onClick = { () => this.changerouter('list')}>歌曲列表</div></NavLink>
                    <NavLink to = '/album/comment'><div className = {this.state.router === 'comment'?'album_nav_activity':'album_nav_normal'} onClick = { () => this.changerouter('comment')}>评论</div></NavLink>
                    <NavLink to = '/album/des'><div className = {this.state.router === 'des'?'album_nav_activity':'album_nav_normal'} onClick = { () => this.changerouter('des')}>专辑描述</div></NavLink>
                </div>
                <div className = 'album_page' ref = 'album_page'>
                    <Switch>
                        {/* <Route path = '/Recommend' component = { Personalized } exact></Route> */}
                        <Route path = '/album/list' component = { List } exact></Route>
                        <Route path = '/album/comment' component = { Comments } exact></Route>
                        <Route path = '/album/des' component = { Des } exact></Route>
                        <Redirect to = '/album/list'></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        get_album_detail:state.album.getalbumdetail,
        album_detail_data:state.album.albumdetaildata,
        Path:state.router.path,
        get_album_comment:state.album.getalbumcomment,
        album_comment_data:state.album.albumcommentdata,
        album_comment_data_all:state.album.albumcommentdataall,
        get_album_dynamic:state.album.getalbumdynamic,
        album_dynamic_data:state.album.albumdynamicdata,
        pop_data:state.router.stack
    }
}
const mapdistoprops = (dispatch) => {
    return{
      ask_album_detail:(id) => dispatch(askalbumdetail(id)),
      ask_album_dynamic:(id) => dispatch(askalbumdynamic(id)),
      ask_album_comment:(id,page) => dispatch(askalbumcomment(id,page)) ,
      ask_more_album_comment: (id,page) => dispatch(askmorealbumcomment(id,page)),
      delete_album_data:() => dispatch(deletalbumedata()),
      collect: (id,type) => dispatch(collalbum(id,type)),
      new_top:() => dispatch(newtop()),
      pop_stack:() => dispatch(popstack())
    }
}
export default connect(mapstatetoprops,mapdistoprops)(Album)