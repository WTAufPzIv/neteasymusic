import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './music.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
import { pushstack, goartistdetail, goalbumdetail, asksearchres } from '../../../store/actionCreators';
// import { } from '../../store/actionCreators';
class Music extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
        
    }
    goartistdetail = (id) => {
        this.props.push_stack()
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:id})
    }
    goalbum = (id) => {
        this.props.push_stack()
        this.props.go_album(id)
        this.props.history.push('/album', {id:id})
    }
    pre = () => {
        var that = this
        if(this.state.page === 0){
            alert('已经是第一页')
        }
        else{
            this.setState({
                page:that.state.page-1
            },() => {
                this.props.ask_search_res(this.props.word, that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_search_res_music){
            if(this.props.search_res_music_data.result.songCount > 50*(this.state.page+1)){
                
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_search_res(that.props.word,that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    render = () => {
        return (
            <div className = 'search_res_music_list_body'>
                <div className = 'search_res_music_list__tr'>
                    <div className = 'search_res_music_list__tr_action'>操作</div>
                    <div className = 'search_res_music_list__tr_name'>音乐标题</div>
                    <div className = 'search_res_music_list__tr_artist'>歌手</div>
                    <div className = 'search_res_music_list__tr_search_res_music'>专辑</div>
                    {/* <div className = 'search_res_music_list__tr_time'>时长</div> */}
                </div>
                {
                    this.props.get_search_res_music === true && this.props.get_user_like_music === true ?this.props.search_res_music_data.result.songs.map((item,index) => {
                        return (
                            <div className = 'search_res_music_list__item' style = {{'backgroundColor':index%2!==0?'rgb(33,33,33)':''}}>
                                <div className = 'search_res_music_list__item_index'>{index+1}</div>
                                <div className = 'search_res_music_list__item_index'><img src = {this.props.user_like_music_data.data.ids.indexOf(item.id) === -1?require('./img/喜欢.png'):require('./img/喜欢 (1).png')}></img></div>
                                <div className = 'search_res_music_list__item_index'><img src = {require('./img/下载.png')}></img></div>
                                <div className = 'search_res_music_list__item_name' style={{"WebkitBoxOrient": "vertical"}}>{item.name}</div>
                                <div className = 'search_res_music_list__item_artist'>{item.artists.slice(0,2).map((itemm) => {
                                    return (
                                        <p style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goartistdetail(itemm.id)}>{itemm.name}{'\u00a0'}</p>
                                    )
                                })}</div>
                                <div className = 'search_res_music_list__item_search_res_music' style={{"WebkitBoxOrient": "vertical"}} onClick = {() => this.goalbum(item.album.id)}>{item.album.name}</div>
                            </div>
                        )
                    }):(
                        <div><ProgressCircle
                        color='white'
                        size={100}
                        /></div>
                    )
                }
                {
                    this.props.get_search_res_music === true?(
                        <div className = 'search_res_music_page'>
                            <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                            <span>{this.state.page+1}</span>
                            <span style = {{'color':this.props.search_res_music_data.result.songCount <= 50*(this.state.page+1)?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
                        </div>
                    ):(
                        <div></div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        get_search_res_music:       state.search.getsearchresmusic,
        search_res_music_data:      state.search.searchresmusicdata,
        get_user_like_music:        state.playlist.getuserlikemusic,
        user_like_music_data:       state.playlist.userlikemusicdata,
        word:                       state.search.Text
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
       push_stack:() => dispatch(pushstack()),
       go_artist_detail:() => dispatch(goartistdetail()),
       go_album:() => dispatch(goalbumdetail()),
       ask_search_res:(e,page) => dispatch(asksearchres(e,1,page))
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Music)