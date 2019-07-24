import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './search.css'
import { ProgressCircle } from 'react-desktop/windows';
import { NavLink,Redirect , Switch,Route,withRouter } from 'react-router-dom'
import { popstack, clearoldsearchdata, newtop, asksearchres, deletesearchtime, clearsearchtime, addsearchtime } from '../../store/actionCreators';
import Music from './music/music'
import Musiclist from './musiclist/musiclist'
import Vedio from './vedio/vedio'
import Album from './album/album'
import Artist from './artist/artist'
import  Lrc from './lrc/lrc.js'
import Mv from './mv/mv'
import { throwStatement } from '@babel/types';
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            router:'music',
            word:'',
            deep:0
        }
        this.props.history.listen(() => this.next())
    }
    next = () => {
        if(this.props.location.state && this.props.Path === 'search'){
            // console.log(this.props.location.state)
            this.setState({
                word:this.props.location.state.word
            })
            this.props.ask_search_res(this.props.location.state.word,1,0)
            this.props.ask_search_res(this.props.location.state.word,10,0)
            this.props.ask_search_res(this.props.location.state.word,100,0)
            this.props.ask_search_res(this.props.location.state.word,1000,0)
            this.props.ask_search_res(this.props.location.state.word,1004,0)
            this.props.ask_search_res(this.props.location.state.word,1006,0)
            this.props.ask_search_res(this.props.location.state.word,1014,0)
        }
    }
    componentDidMount(){
        
    }
    changerouter = (e) => {
        this.setState({
            router:e
        })
        this.props.addtime()
        // this.setState({
        //     deep:that.state.deep - 1
        // })
    }
    goback = () => {
        var i = this.props.search_time
        // this.props.pop_stack()
        this.props.cleartime()
        this.props.history.go(i)
    }
    render = () => {
        return (
            <div className = 'search_body'>
                <div className = 'search_back' onClick = {() => this.goback()}>返回</div>
                <div className = 'search_nav'>
                    <NavLink to = {{pathname:'/search/music'}} className = 'search_nav_link'><div className = {this.state.router === 'music'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('music')}>歌曲</div></NavLink>
                    <NavLink to = {{pathname:'/search/album'}}><div className = {this.state.router === 'album'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('album')}>专辑</div></NavLink>
                    <NavLink to = {{pathname:'/search/artist'}}><div className = {this.state.router === 'artist'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('artist')}>歌手</div></NavLink>
                    <NavLink to = {{pathname:'/search/musiclist'}}><div className = {this.state.router === 'musiclist'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('musiclist')}>歌单</div></NavLink>
                    <NavLink to = {{pathname:'/search/vedio'}}><div className = {this.state.router === 'vedio'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('vedio')}>视频</div></NavLink>
                    <NavLink to = {{pathname:'/search/mv'}}><div className = {this.state.router === 'mv'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('mv')}>MV</div></NavLink>
                    {/* <NavLink to = {{pathname:'/search/lrc'}}><div className = {this.state.router === 'lrc'?'search_nav_selected':'search_nav_normal'} onClick = {() => this.changerouter('lrc')}>歌词</div></NavLink> */}
                </div>
                <div className = 'seach_page'>
                    <Switch>
                        <Route path = '/search/music' component = { Music } exact></Route>
                        <Route path = '/search/album' component = { Album } exact></Route>
                        <Route path = '/search/artist' component = { Artist } exact></Route>
                        <Route path = '/search/musiclist' component = { Musiclist } exact></Route>
                        <Route path = '/search/vedio' component = { Vedio } exact></Route>
                        <Route path = '/search/lrc' component = { Lrc } exact></Route>
                        <Route path = '/search/mv' component = { Mv } exact></Route>
                        <Redirect  to = {{pathname:'/search/music'}}></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
        Path:state.router.path,
        pop_data:state.router.stack,
        get_search_res_music:       state.search.getsearchresmusic,
        search_res_music_data:      state.search.searchresmusicdata,
        get_search_res_artist:      state.search.getsearchresartist,
        search_res_artist_data:     state.search.searchresartistdata,
        get_search_res_album:       state.search.getsearchresalbum,
        search_res_album_data:      state.search.searchresalbumdata,
        get_search_res_mv:          state.search.getsearchresmv,
        search_res_mv_data:         state.search.searchresmvdata,
        get_search_res_vedio:       state.search.getsearchresvedio,
        search_res_vedio_data:      state.search.searchresvediodata,
        get_search_res_musiclist:   state.search.getsearchresmusiclist,
        search_res_musiclist_data:  state.search.searchresmusiclistdata,
        get_search_res_lrc:         state.search.getsearchreslrc,
        search_res_lrc_data:        state.search.searchreslrcdata,
        search_time:                state.search.searchtimes
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        pop_stack:() => dispatch(popstack()),
        new_top: () => dispatch(newtop()),
        ask_search_res:(word,type,page) => dispatch(asksearchres(word,type,page)),
        cleartime:() => dispatch(clearsearchtime()),
        addtime:() => dispatch(addsearchtime())
        // clear_old_searchdata:() => dispatch(clearoldsearchdata())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Search)