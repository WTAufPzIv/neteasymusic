import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './component/Header/Header.js';
import Player from './component/Player/Player'
import LeftMenu from './component/LeftMenu/LeftMenu'
import { BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
import Recommend from './container/recommend/Recommend'
import Fm from './container/fm/fm'
import Video from './container/video/video'
import Friend from './container/friend/friend'
import Localmusic from './container/localmusic/localmusic'
import Download from './container/download/download'
import Yunpan from './container/yunpan/yunpan'
import Like from './container/like/like'
import Musiclist from './container/musiclist/musiclist'
import store from './store/index'
import PlayDetail from './container/playdetail/playdetail'
import LoginAndRegister from './component/LoginAndRegister/LoginAndRegister'
import Userinfo from './container/userinfo/userinfo'
import { connect } from 'react-redux'
import  Usermsg  from './container/usermsg/usermsg'
import Artist from './container/artist/artist'
import Album from './container/album/album'
import Mv from './container/mv/mv'
import Searchtip from './component/searchtip/searchtip'
import Search from './container/search/search'
const { ipcRenderer } = window.require('electron');
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      windowHeight:800,
      open_play_detail:false,
      middleheight:0
    }
    store.subscribe(this.get_store_msg);
    this.resize.bind(this);
  }
  componentDidMount(){
    this.setState({
      middleheight:this.refs.middleDom.offsetHeight
    })
    this.screenChange();
    var that = this
    ipcRenderer.on('windowHeight', (event, height) => {
      //alert(height)
      if(height >= 1066){
        that.setState({
          windowHeight:height-15
        })
      }
      else{
        that.setState({
          windowHeight:height
        })
      }
    })
  }
  screenChange(){
    window.addEventListener('resize', this.resize);
  }
  get_store_msg = () => {
    // console.log(this.props)
    this.setState({
      open_play_detail:this.props.open_play_detail
    })
  }
  
componentWillUnmount() {       
 
}
resize = () => {
  console.log(this.refs.middleDom.offsetHeight)
  this.setState({
    middleheight:this.refs.middleDom.offsetHeight
  })
}
  render(){
    return(
        <div className = 'body' style = {{'height':this.state.windowHeight+'px'}}>
          <div className = 'loginAndRegister' style = {{'display':this.props.open_loginandregister?'flex':'none'}}>
            <LoginAndRegister />
          </div>
          <div className = 'msg_container' style = {{'display':this.props.open_msg_container?'flex':'none'}}>
            <Usermsg />
          </div>
          <div className = 'user_info' style = {{'display':this.props.open_userinfo?'flex':'none','height':this.state.middleheight+'px'}}>
            <Userinfo />
          </div>
          <Header />
          <div className = 'middle' ref = 'middleDom'>
            <BrowserRouter>
              <div style = {{'height':'100%','width':'100%','display':this.props.open_play_detail?'none':'flex','flexDirection':'row'}}>
              <div className = 'search_tip' style = {{'display':this.props.open_search_tip?'flex':'none'}}>
                <Searchtip />
              </div>
                <LeftMenu />
                <Switch>
                  <Route path = '/Recommend' component = { Recommend } ></Route>
                  {/* <Route path = '/Recommend' component = { Recommend }></Route> */}
                  <Route path = '/Fm' component = { Fm } ></Route>
                  <Route path = '/video' component = { Video }></Route>
                  <Route path = '/friend' component = { Friend }   ></Route>
                  <Route path = '/localmusic' component = { Localmusic }  ></Route>
                  <Route path = '/download' component = { Download }  ></Route>
                  {/* <Route path = '/Like' component = { Like }  match='match'  ></Route> */}
                  <Route path = '/Like' component = { Like } ></Route>
                  <Route path = '/yunpan' component = { Yunpan } ></Route>
                  <Route path = '/musiclist' component = { Musiclist } ></Route>
                  {/* <Route path = '/musiclist' component = { Musiclist } match = 'match'  ></Route> */}
                  <Route path = '/artist' component = { Artist } ></Route>
                  {/* <Route path = '/artist' component = { Artist } match = 'match'  ></Route> */}
                  <Route path = '/album' component = { Album } ></Route>
                  {/* <Route path = '/album' component = { Album } match = 'match'  ></Route> */}
                  <Route path = '/mv' component = { Mv }></Route>
                  {/* <Route path = '/mv' component = { Mv } match = 'match'  ></Route> */}
                  <Route path = '/search' component = { Search }></Route>
                  {/* <Route path = '/search' component = { Search } match = 'match'  ></Route> */}
                  <Redirect to = '/Recommend'></Redirect>
                </Switch>
              </div>
            </BrowserRouter>
            <div style = {{'height':'100%','width':'100%','display':this.props.open_play_detail?'flex':'none','flexDirection':'column','justifyContent':'flex-end'}}>
              <PlayDetail />
            </div>
          </div>
          <Player />
        </div>
    )
  }
}
const mapstatetoprops = (state) => {
  return{
    open_play_detail:state.player.open_play_detail,
    open_loginandregister:state.user.openloginandregister,
    open_msg:state.user.openmsg,
    open_userinfo:state.user.openuserdetail,
    open_msg_container:state.user.openmsgcontainer,
    open_search_tip:state.search.opensearchtip
  }
}
const mapdistoprops = (state) => {
  return{
    //open_play_detail:state.player.open_play_detail
  }
}
export default connect(mapstatetoprops,null)(App);
