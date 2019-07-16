import React from 'react';
import { connect } from 'react-redux'
import './like.css'
import { Route,Switch, Redirect } from 'react-router-dom'
import Album from './album/album'
import Artist from './artist/artist'
import Video from './video/video'
import Buy from './buy/buy'
class Like extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            router:'likealbum'
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div className = 'like_body'>
                {
                    this.props.login_status?(
                        <div>
                            <div className = 'like_head'>
                                <div className = {this.state.router === 'likealbum'?'like_head_choosed':'like_head_simple'}>专辑</div>
                                <div className = {this.state.router === 'likeartist'?'like_head_choosed':'like_head_simple'}>歌手</div>
                                <div className = {this.state.router === 'likemv'?'like_head_choosed':'like_head_simple'}>MV</div>
                                <div className = {this.state.router === 'buy'?'like_head_choosed':'like_head_simple'}>已购买</div>
                            </div>
                            <div className = 'like_page'>
                                <Switch>
                                    <Route path = '/Like' component = { Album } exact></Route>
                                    <Route path = '/Like/likealbum' component = { Album } exact></Route>
                                    <Route path = '/Like/likeartist' component = { Artist } exact></Route>
                                    <Route path = '/Like/likemv' component = { Video } exact></Route>
                                    <Route path = '/Like/buy' component = { Buy } exact></Route>
                                    <Redirect to = '/Like/likealbum'></Redirect>
                                </Switch>
                            </div>
                        </div>
                    ):(
                        <div className = 'like_nologin'>
                            <img src = {require('./img/undraw_collection_u2np.svg')}></img>
                            <span>右上角登录后查看收藏</span>
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
    //    login_status:false,
       login_status:state.user.loginstatus,
      
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
       
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Like)