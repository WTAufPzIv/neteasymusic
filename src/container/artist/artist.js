import React from 'react'
import './artist.css'
import { connect } from 'react-redux'
import { NavLink,withRouter,Route,Switch, Redirect } from 'react-router-dom'
import Music from './music/music'
import Mv from './mv/mv'
import Describe from './describe/describe'
import Album from './album/album'
import { clearoldartistdata,askartistmusic,askartistmv,askartistalbum,askartistdescribe,newtop,popstack } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';

class Artist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            router:'music',
            name:'',
            musicNum:0,
            albumNum:0,
            img:'',
            deep:-1,
            mvpage:0,
            albumpage:0,
            id:0,
            dom:{}
        }
        this.props.history.listen(() => this.next())//由于本页面使用了默认路由重定向，故初次载入就会调用这个函数
        
    }
    next = () => {
        // console.log('666')
        if(this.props.location.state && this.props.Path === 'artist'){
            // console.log('666')
            this.props.clear_old_artistdata()
            this.props.ask_artist_music(this.props.location.state.id)
            this.props.ask_artist_album(this.props.location.state.id,0)
            this.props.ask_artist_mv(this.props.location.state.id,0)
            this.props.ask_artist_describe(this.props.location.state.id,0)
            console.log(this.props.location.state)
            this.setState({
                id:this.props.location.state.id
            })
        }
    }
    goback = () => {
        var i = this.props.pop_data
        this.props.pop_stack()
        this.props.clear_old_artistdata()
        this.props.history.go(i)
    }
    componentDidMount(){
        var that =  this
        this.setState({
            dom:that.refs.artist_detail_body
        })

    }
    changerouter = (e) => {
        this.setState({
            router:e,
        })
        this.props.new_top()
    }
    render = () => {
        return (
            <div className = 'artist_detail_body' ref = 'artist_detail_body'>
                <div className = 'artist_detail_back' onClick = { () => this.goback()}>返回</div>
                {
                    this.props.get_artist_music?(
                        <div className = 'artist_detail_head'>
                            <img src = {this.props.artist_music_data.artist.picUrl+'?param=200y200'}></img>
                            <div className = 'artist_detail_head_simInfo'>
                                <div>
                                    <p>{this.props.artist_music_data.artist.name}</p>
                                    <div>收藏</div>
                                </div>
                                <p>单曲数：{this.props.artist_music_data.artist.musicSize}</p>
                                <span>专辑数：{this.props.artist_music_data.artist.albumSize}</span>
                                <p>MV数：{this.props.artist_music_data.artist.mvSize}</p>
                                {/* <p>{this.props.artist_music_data.artist.briefDesc}</p> */}
                            </div>
                        </div>
                    ):(
                        <div><ProgressCircle color='white' size={100}/></div>
                    )
                }
                <div className = 'artist_detail_nav'>
                    <NavLink to = '/artist/music'><div className = {this.state.router === 'music'?'artist_detail_nav_selected':'artist_detail_nav_normal'} onClick = {() => this.changerouter('music')}>热门50首歌曲</div></NavLink>
                    <NavLink to = {{pathname:'/artist/mv'}} ><div className = {this.state.router === 'mv'?'artist_detail_nav_selected':'artist_detail_nav_normal'} onClick = {() => this.changerouter('mv')}>MV</div></NavLink>
                    <NavLink to = '/artist/album'><div className = {this.state.router === 'album'?'artist_detail_nav_selected':'artist_detail_nav_normal'} onClick = {() => this.changerouter('album')}>专辑</div></NavLink>
                    <NavLink to = '/artist/describe'><div className = {this.state.router === 'describe'?'artist_detail_nav_selected':'artist_detail_nav_normal'} onClick = {() => this.changerouter('describe')}>歌手详细介绍</div></NavLink>
                </div>
                <div className = 'artist_detail_hr'></div>
                <div className = 'artist_detail_page'>
                    <Switch>
                        <Route path = '/artist/music' component = { Music } exact></Route>
                        <Route path = '/artist/mv' component = { Mv } exact></Route>
                        <Route path = '/artist/album' component = { Album } exact></Route>
                        <Route path = '/artist/describe' component = { Describe } exact></Route>
                        <Redirect to = '/artist/music'></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return {
        Path:state.router.path,
        get_artist_music:state.artist.getartistmusic,
        artist_music_data:state.artist.artistmusicdata,
        get_artist_mv:state.artist.getartistmv,
        artist_mv_data:state.artist.artistmvdata,
        get_artist_album:state.artist.getartistalbum,
        artist_album_data:state.artist.artistalbumdata,
        get_artist_des:state.artist.getartistdes,
        artist_des_data:state.artist.artistdesdata,
        pop_data:state.router.stack
    }
}
const mapdistoprops = (dispatch) =>{
    return {
        clear_old_artistdata:() => dispatch(clearoldartistdata()),
        ask_artist_music:(id) => dispatch(askartistmusic(id)),
        ask_artist_mv:(id,page) => dispatch(askartistmv(id,page)),
        ask_artist_album: (id,page) => dispatch(askartistalbum(id,page)) ,
        ask_artist_describe: (id) => dispatch(askartistdescribe(id)),
        new_top:() => dispatch(newtop()),
        pop_stack:() => dispatch(popstack())
    }
}
export default connect(mapstatetoprops,mapdistoprops)(Artist)