import React from 'react';
import './Recommend.css'
import { BrowserRouter,Route,Switch, Redirect } from 'react-router-dom'
import Personalized from '../../component/personalized/personalized'
import Playlist from '../../component/playlist/playlist'
import Top from '../../component/top/top'
import Artist from '../../component/artist/artist'
import New from '../../component/new/new'
import { Link,NavLink } from 'react-router-dom'
class Recommend extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className = 'recommend_body'>
                {/* <Redirect to = '/video' /> */}
                <div className = 'recommend_vis'>
                    <div className = 'recommend_nav'>
                        <NavLink to = '/Recommend/personalized' className = 'recommend_nav_link' activeStyle = {{'color':'red'}}><div>个性推荐</div></NavLink>
                        <NavLink to = '/Recommend/playlist' className = 'recommend_nav_link'  activeStyle = {{'color':'red'}}><div>歌单</div></NavLink>
                        <NavLink to = '/Recommend/top' className = 'recommend_nav_link' activeStyle = {{'color':'red'}}><div>排行榜</div></NavLink>
                        <NavLink to = '/Recommend/artist' className = 'recommend_nav_link' activeStyle = {{'color':'red'}}><div>歌手</div></NavLink>
                        <NavLink to = '/Recommend/new' className = 'recommend_nav_link' activeStyle = {{'color':'red'}}><div>最新</div></NavLink>
                    </div>
                    
                        <div className = 'recommend_page'>
                            <Switch>
                                {/* <Route path = '/Recommend' component = { Personalized } exact></Route> */}
                                <Route path = '/Recommend/personalized' component = { Personalized } exact></Route>
                                <Route path = '/Recommend/playlist' component = { Playlist } exact></Route>
                                <Route path = '/Recommend/top' component = { Top } exact></Route>
                                <Route path = '/Recommend/artist' component = {Artist} exact></Route>
                                <Route path = '/Recommend/new' component = {New} exact></Route>
                                <Redirect to = '/Recommend/personalized'></Redirect>
                            </Switch>
                        </div>
           
                </div>
            </div>
        )
    }
}
export default Recommend