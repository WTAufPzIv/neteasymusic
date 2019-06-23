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
const { ipcRenderer } = window.require('electron');
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      windowHeight:800
    }
  }
  componentDidMount(){
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
  render(){
    return(
        <div className = 'body' style = {{'height':this.state.windowHeight+'px'}}>
          <Header />
          <div className = 'middle'>
            
            <BrowserRouter>
              <div style = {{'height':'100%','width':'100%','display':'flex','flexDirection':'row'}}>
                <LeftMenu />
                <Switch>
                  <Route path = '/' component = { Recommend } exact></Route>
                  <Route path = '/Fm' component = { Fm } exact></Route>
                  <Route path = '/video' component = { Video } exact></Route>
                  <Route path = '/friend' component = { Friend } exact ></Route>
                  <Route path = '/localmusic' component = { Localmusic } exact></Route>
                  <Route path = '/download' component = { Download } exact></Route>
                  <Route path = '/yunpan' component = { Yunpan } exact></Route>
                  <Route path = '/Like' component = { Like } exact></Route>
                  <Route path = '/musiclist' component = { Musiclist } exact ></Route>
                </Switch>
              </div>
            </BrowserRouter>
          </div>
          <Player />
        </div>
    )
  }
}

export default App;
