import React from 'react'
import './list.css'
import { ProgressCircle } from 'react-desktop/windows';
import { connect } from 'react-redux'
import { pushstack, goartistdetail } from '../../../store/actionCreators';
import store from '../../../store/index'
import { canchangeplaystatus,play_netmusic   } from '../../../store/actionCreators'
class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    goartistdetail = (id) => {
        this.props.push_stack()
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:id})
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
    render = () => {
        return (
            <div className = 'album_list_body'>
                <div className = 'album_list__tr'>
                    <div className = 'album_list__tr_action'>操作</div>
                    <div className = 'album_list__tr_name'>音乐标题</div>
                    <div className = 'album_list__tr_artist'>歌手</div>
                    <div className = 'album_list__tr_album'>专辑</div>
                    {/* <div className = 'album_list__tr_time'>时长</div> */}
                </div>
                {

                    this.props.get_user_like_music === true?(
                        this.props.get_album_detail === true?this.props.album_detail_data.songs.map((item,index) => {
                            return (
                                <div className = 'album_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(this.props.album_detail_data.songs,index)}>
                                    <div className = 'album_list__item_index'>{index+1}</div>
                                    <div className = 'album_list__item_index'><img src = {this.props.user_like_music_data.data.ids.indexOf(item.id) === -1?require('./img/喜欢.png'):require('./img/喜欢 (1).png')}></img></div>
                                    <div className = 'album_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                    <div className = 'album_list__item_name'>{item.name}</div>
                                    <div className = 'album_list__item_artist'>{item.ar.slice(0,2).map((itemm) => {
                                        return (
                                            <p style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goartistdetail(itemm.id)}>{itemm.name}{'\u00a0'}</p>
                                        )
                                    })}</div>
                                    <div className = 'album_list__item_album' style={{"WebkitBoxOrient": "vertical"}}>{item.al.name}</div>
                                    
                                </div>
                            )
                        }):(
                            <div><ProgressCircle
                            color='white'
                            size={100}
                            /></div>
                        )
                    
                    ):(
                        this.props.get_album_detail === true?this.props.album_detail_data.songs.map((item,index) => {
                            return (
                                <div className = 'album_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}} onDoubleClick = {() => this.play(this.props.album_detail_data.songs,index)}>
                                    <div className = 'album_list__item_index'>{index+1}</div>
                                    <div className = 'album_list__item_index'><img src = {require('./img/喜欢.png')}></img></div>
                                    <div className = 'album_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                    <div className = 'album_list__item_name'>{item.name}</div>
                                    <div className = 'album_list__item_artist'>{item.ar.slice(0,2).map((itemm) => {
                                        return (
                                            <p style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goartistdetail(itemm.id)}>{itemm.name}{'\u00a0'}</p>
                                        )
                                    })}</div>
                                    <div className = 'album_list__item_album' style={{"WebkitBoxOrient": "vertical"}}>{item.al.name}</div>
                                    
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
    console.log(state)
    return{
        get_album_detail:state.album.getalbumdetail,
        album_detail_data:state.album.albumdetaildata,
        get_user_like_music:state.playlist.getuserlikemusic,
        user_like_music_data:state.playlist.userlikemusicdata
    }
}
const mapdistoprops = (dispatch) => {
    return{
        push_stack:() => dispatch(pushstack()),
        go_artist_detail: () => dispatch(goartistdetail())
    }
}
export default connect(mapstatetoprops,mapdistoprops)(List)