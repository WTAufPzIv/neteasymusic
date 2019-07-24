import React from 'react';
import './list.css'
import { BrowserRouter,Route,Switch, Redirect } from 'react-router-dom'
import { Link,NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { goartistdetail, pushstack, goalbumdetail } from '../../../store/actionCreators';
import store from '../../../store/index'
import { play_netmusic ,canchangeplaystatus } from '../../../store/actionCreators'
class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    goartist = (id) => {
        this.props.push_stack()
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:id})
    }
    goalbumdetail = (id) => {
        this.props.push_stack()
        this.props.history.push('/album', {id:id})
        this.props.go_album()
    }
    play = (index) => {
        // this.props.play_musiclist(0,2,this.props.playlistdetaildata.data.playlist.trackIds)
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_netmusic(index,this.props.play_list_detail_data.data.playlist.trackIds,true)
        store.dispatch(action)
    }
    render(){
        return(
            <div className = 'musiclist_list_body'>
                <div className = 'musiclist_list__tr'>
                    <div className = 'musiclist_list__tr_action'>操作</div>
                    <div className = 'musiclist_list__tr_name'>音乐标题</div>
                    <div className = 'musiclist_list__tr_artist'>歌手</div>
                    <div className = 'musiclist_list__tr_album'>专辑</div>
                    {/* <div className = 'musiclist_list__tr_time'>时长</div> */}
                </div>
                {

                    this.props.get_user_like_music === true?(
                        this.props.get_playlist_music_detail === true?this.props.playlist_music_detail_data.map((item,index) => {
                            return (
                                <div className = 'musiclist_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(index)}>
                                    <div className = 'musiclist_list__item_index'>{index+1}</div>
                                    <div className = 'musiclist_list__item_index'><img src = {this.props.user_like_music_data.data.ids.indexOf(item.id) === -1?require('./img/喜欢.png'):require('./img/喜欢 (1).png')}></img></div>
                                    <div className = 'musiclist_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                    <div className = 'musiclist_list__item_name'>{item.name}</div>
                                    <div className = 'musiclist_list__item_artist'>{item.ar.slice(0,2).map((itemm) => {
                                        return (
                                            <p style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goartist(itemm.id)}>{itemm.name}{'\u00a0'}</p>
                                        )
                                    })}</div>
                                    <div className = 'musiclist_list__item_album' style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goalbumdetail(item.al.id)}>{item.al.name}</div>
                                    
                                </div>
                            )
                        }):(
                            <div><ProgressCircle
                            color='white'
                            size={100}
                            /></div>
                        )
                    ):(
                        this.props.get_playlist_music_detail === true?this.props.playlist_music_detail_data.map((item,index) => {
                            return (
                                <div className = 'musiclist_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(index)}>
                                    <div className = 'musiclist_list__item_index'>{index+1}</div>
                                    <div className = 'musiclist_list__item_index'><img src = {require('./img/喜欢.png')}></img></div>
                                    <div className = 'musiclist_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                    <div className = 'musiclist_list__item_name'>{item.name}</div>
                                    <div className = 'musiclist_list__item_artist'>{item.ar.slice(0,2).map((itemm) => {
                                        return (
                                            <p style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goartist(itemm.id)}>{itemm.name}{'\u00a0'}</p>
                                        )
                                    })}</div>
                                    <div className = 'musiclist_list__item_album' style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goalbumdetail(item.al.id)}>{item.al.name}</div>
                                    
                                </div>
                            )
                        }):(
                            <div><ProgressCircle
                            color='white'
                            size={100}
                            /></div>
                        )
                    )


                    




                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
        playlist_music_detail_data : state.playlist.playlistmusicdetaildata,
        get_playlist_music_detail : state.playlist.getplaylistmusicdetail,
        get_play_list_detail:state.playlist.getplaylistdetail,
        play_list_detail_data:state.playlist.playlistdetaildata,
        get_user_like_music:state.playlist.getuserlikemusic,
        user_like_music_data:state.playlist.userlikemusicdata
    }
}
const mapdistoprops = (dispatch) => {
    return{
      go_artist_detail:() => dispatch(goartistdetail()),
      push_stack:() => dispatch(pushstack()),
      go_album:() => dispatch(goalbumdetail())
    }
}
export default connect( mapstatetoprops, mapdistoprops )(List)