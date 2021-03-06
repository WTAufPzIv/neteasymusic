import React from 'react';
import { connect } from 'react-redux'
import { askplaylistdetail,askplaylistcomment,askmoreplaylistcomment,deletedata,coll,sharemusiclist,newtop,popstack, playmusiclist } from '../../store/actionCreators'
import { play_netmusic ,canchangeplaystatus } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
import moment from 'moment'
import './musiclist.css'
import { NavLink,withRouter,Route,Switch, Redirect } from 'react-router-dom'
import  List  from './list/list'
import  Comments  from '../../container/musiclist/comment/comment'
import {  message } from 'antd'
import store from '../../store/index'
class Musiclist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            router:'list',
            page:0,
            deep:-1,
            commentdata:[],
            id:0,
            type:'mine',
            position:'right'
        }
        
        this.props.history.listen(() => this.next())
    }
    next = () => {
        if(this.props.location.state && this.props.Path === 'musiclist'){
            // console.log(this.props.location.state)
            this.props.delete_data()
            // console.log(this.props.location.state.id)
            this.props.ask_playlist_detail(this.props.location.state.id)
            this.props.ask_playlist_comment(this.props.location.state.id,this.state.page)
            var that = this
            this.setState({
                page:0,
                id:that.props.location.state.id,
                type:this.props.location.state.type,
                position:this.props.location.state.position || 'right',
            })
        }
    }
    
    componentDidMount(){
        this.refs.musiclist_body.onScroll = () => this.scrool()
    }
    goback = () => {
        var i = this.props.pop_data
        this.props.stack_pop()
        this.props.delete_data()
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
        // console.log(document.body.clientHeight+' '+(this.refs.musiclist_body.scrollTop)+' '+this.refs.musiclist_body.scrollHeight+' '+this.refs.musiclist_body.offsetHeight) 
        if(this.refs.musiclist_body.scrollHeight === (this.refs.musiclist_body.scrollTop+this.refs.musiclist_body.offsetHeight) && this.state.router === 'comment'){   
            if(this.props.get_musiclist_comment){
                if(this.props.musiclist_comment_data.data.more){
                    // console.log('加载')
                    this.setState({
                        page:this.props.musiclist_comment_data_all[this.props.musiclist_comment_data_all.length-1].time
                    })
                    this.props.ask_more_playlist_comment(this.state.id,this.props.musiclist_comment_data.data.comments[this.props.musiclist_comment_data.data.comments.length-1].time)
                }
                else{
                    message.warning('没有更多评论了');
                }
            }
        }
    }
    collect = (bool) => {
        this.props.collect(this.state.id,bool?2:1)
    }
    share = () => {
        this.props.share(this.state.id)
    }
    play_all_musiclist = () => {
        // this.props.play_musiclist(0,2,this.props.playlistdetaildata.data.playlist.trackIds)
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_netmusic(0,this.props.play_list_detail_data.data.playlist.trackIds,true)
        store.dispatch(action)
    }
    render(){
        return(
            <div className = 'musiclist_body' onScroll = { () => this.scrool()} ref = 'musiclist_body'>
                <div className = 'musiclist_back' onClick = { () => this.goback()} style = {{'display':this.state.position==='left'?'none':'block'}}>返回</div>
                {
                    this.props.get_play_list_detail?(
                        <div className = 'musiclist_head'>
                            <img src = {this.props.play_list_detail_data.data.playlist.coverImgUrl+'?param=200y200'}></img>
                            <div className = 'musiclist_info'>
                                <div className = 'musiclist_title'>
                                    <span>{this.props.play_list_detail_data.data.playlist.name}</span>
                                    <div className = 'musiclist_count'>
                                        <span style = {{'marginRight':'15px'}}>歌曲数：{this.props.play_list_detail_data.data.playlist.trackCount}</span>
                                        <span>播放量:{this.props.play_list_detail_data.data.playlist.playCount}</span>
                                    </div>
                                </div>
                                <div className = 'musiclist_create'>
                                    <div><img src = {this.props.play_list_detail_data.data.playlist.creator.avatarUrl+'?param=50y50'}></img></div>
                                    <span>{this.props.play_list_detail_data.data.playlist.creator.nickname}</span>
                                    <p>{moment(parseInt(this.props.play_list_detail_data.data.playlist.createTime)).format("YYYY年MM月DD日")}创建</p>
                                </div>
                                <div className = 'musiclist_action'>
                                    <div className = 'musiclist_action_play' onClick = {() => this.play_all_musiclist()}>播放全部</div>
                                    <div className = 'musiclist_action_collect' style = {{'display':this.state.type === 'mine'?'none':'block'}} onClick = {() => this.collect(this.props.play_list_detail_data.data.playlist.subscribed)}>{this.props.play_list_detail_data.data.playlist.subscribed?('已收藏:'+this.props.play_list_detail_data.data.playlist.subscribedCount):('收藏:'+this.props.play_list_detail_data.data.playlist.subscribedCount)}</div>
                                    <div className = 'musiclist_action_share' onClick = {() => this.share()}>分享到动态({this.props.play_list_detail_data.data.playlist.shareCount})</div>
                                    <div className = 'musiclist_action_download'>下载全部</div>
                                </div>
                                <div className = 'musiclist_action_description' style={{"WebkitBoxOrient": "vertical"}}>
                                    【简介】：{this.props.play_list_detail_data.data.playlist.description}
                                </div>
                            </div>
                        </div>
                    ):(
                        <div>
                            <ProgressCircle color='white' size={100} />
                        </div>
                    )
                }
                <div className = 'musiclist_nav'>
                    <NavLink to = '/musiclist/list'><div className = {this.state.router === 'list'?'musiclist_nav_activity':'musiclist_nav_normal'} onClick = { () => this.changerouter('list')}>歌曲列表</div></NavLink>
                    <NavLink to = '/musiclist/comment'><div className = {this.state.router === 'comment'?'musiclist_nav_activity':'musiclist_nav_normal'} onClick = { () => this.changerouter('comment')}>评论</div></NavLink>
                </div>
                <div className = 'musiclist_page' ref = 'musiclist_page'>
                    <Switch>
                        {/* <Route path = '/Recommend' component = { Personalized } exact></Route> */}
                        <Route path = '/musiclist/list' component = { List } exact></Route>
                        <Route path = '/musiclist/comment' component = { Comments } exact></Route>
                        <Redirect to = '/musiclist/list'></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
        get_play_list_detail:state.playlist.getplaylistdetail,
        play_list_detail_data:state.playlist.playlistdetaildata,
        Path:state.router.path,
        get_musiclist_comment:state.playlist.getmusiclistcomment,
        musiclist_comment_data:state.playlist.musiclistcommentdata,
        musiclist_comment_data_all:state.playlist.musiclistcommentdataall,
        pop_data:state.router.stack
    }
}
const mapdistoprops = (dispatch) => {
    return{
      ask_playlist_detail:(id) => dispatch(askplaylistdetail(id)),
      ask_playlist_comment:(id,page) => dispatch(askplaylistcomment(id,page)) ,
      ask_more_playlist_comment: (id,page) => dispatch(askmoreplaylistcomment(id,page)),
      delete_data:() => dispatch(deletedata()),
      collect: (id,type) => dispatch(coll(id,type)),
      share: (id) => dispatch(sharemusiclist(id)),
      new_top:() => dispatch(newtop()),
      stack_pop: () => dispatch(popstack())
    }
}
export default connect( mapstatetoprops, mapdistoprops )(Musiclist)