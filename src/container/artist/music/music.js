import React from 'react'
import './music.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import store from '../../../store/index'
import { canchangeplaystatus,play_netmusic   } from '../../../store/actionCreators'
class Music extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }
    componentWillMount(){

    }
    play = (data,index) => {
        var arr = []
        data.map((item) => {
            arr.push({
                id:item.id
            })
        })
        const action1 = canchangeplaystatus()
        store.dispatch(action1)
        const action = play_netmusic(index,arr,true)
        store.dispatch(action)
    }
    render(){
        return (
            <div className = 'artist_music_list_body'>
                <div className = 'artist_music_list__tr'>
                    <div className = 'artist_music_list__tr_action'>操作</div>
                    <div className = 'artist_music_list__tr_name'>音乐标题</div>
                    <div className = 'artist_music_list__tr_artist'>歌手</div>
                    <div className = 'artist_music_list__tr_album'>专辑</div>
                    {/* <div className = 'artist_music_list__tr_time'>时长</div> */}
                </div>
                {
                    this.props.get_artist_music && this.props.get_user_like_music?this.props.artist_music_data.hotSongs.map((item,index) => {
                        return (
                            <div className = 'artist_music_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(this.props.artist_music_data.hotSongs,index)}>
                                <div className = 'artist_music_list__item_index'>{index+1}</div>
                                <div className = 'artist_music_list__item_index'><img src = {this.props.user_like_music_data.data.ids.indexOf(item.id) === -1?require('./img/喜欢.png'):require('./img/喜欢 (1).png')}></img></div>
                                <div className = 'artist_music_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                <div className = 'artist_music_list__item_name'>{item.name}</div>
                                <div className = 'artist_music_list__item_artist'>{item.ar.slice(0,2).map((itemm) => {
                                    return (
                                        <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}{'\u00a0'}</p>
                                    )
                                })}</div>
                                <div className = 'artist_music_list__item_album' style={{"WebkitBoxOrient": "vertical"}}>{item.al.name}</div>
                                
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
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return {
        get_artist_music:state.artist.getartistmusic,
        artist_music_data:state.artist.artistmusicdata,
        get_user_like_music:state.playlist.getuserlikemusic,
        user_like_music_data:state.playlist.userlikemusicdata
    }
}
const mapdistoprops = (dispatch) =>{
    return {
       
    }
}
export default connect(mapstatetoprops,mapdistoprops)(Music)