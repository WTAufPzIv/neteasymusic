import React from 'react';
import './personalized.css'
import { Carousel } from 'antd';
import 'antd/dist/antd.css'; 
import { connect } from 'react-redux'
import { askbannerdata,askpersonalizedplaylistdata,askpersonalizednewsongdata,askpersonalizedmvdata,gomusiclistdeail } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
import { NavLink,withRouter } from 'react-router-dom'
class Personalized extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
        
    }
    componentWillMount(){
        this.props.ask_bnner_data()
        this.props.ask_personalized_playlist_data()
        this.props.ask_personalized_newsong_data()
        this.props.ask_personalized_mv_data()
    }
    clickbanner = (type,id,url) => {
        if(type === 1){
            console.log('播放')
        }
        else if(type === 3000){
            console.log('打开链接')
        }
        else if(type === 1005){
            console.log('内部页面')
        }
    }
    gotoplaylist = (id) => {
        // console.log(id)
        this.props.history.push("/musiclist",{id:id,type:'other',position:'right'});
        this.props.go_musiclist_detail()
    }
    render(){
        return(
           <div className = 'personalized_body'>
               <div className = 'personalized_banner'>
                    <Carousel effect="fade" autoplay>
                    {
                       this.props.get_banner_data?this.props.banner_data.data.banners.map((item) => {
                           return (
                                <div className = 'personalized_banner_item' onClick = {() => this.clickbanner(item.targetType,item.targetId,item.url||'')}>
                                    <img src = {item.imageUrl+ '?param=612y250'} style = {{'width':'612px','height':'250px'}}></img>
                                </div>   
                           )
                       }):(
                           <div>
                               <ProgressCircle
                                    color='white'
                                    size={100}
                                />
                           </div>
                       )
                    }
                    </Carousel>,
               </div>
               <div className = 'personalized_playlist'>
                   <div className = 'personalized_playlist_head'>推荐歌单</div>
                   <div className = 'personalized_playlist_hr'></div>
                   <div className = 'personalized_playlist_body'>
                       {
                           this.props.get_personalized_playlist?this.props.personalized_playlist_data.data.result.map((item) => {
                               return (
                                   <div className = 'personalized_playlist_item' onClick = {() => this.gotoplaylist(item.id)}>
                                       <img src = {item.picUrl+ '?param=190y190'}></img>
                                       <div>{item.name}</div>
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
               </div>
               <div className = 'personalized_newsong'>
                   <div className = 'personalized_newsong_head'>最新音乐</div>
                   <div className = 'personalized_newsong_hr'></div>
                   <div className = 'personalized_newsong_body'>
                       {
                           this.props.get_personalized_newsong?this.props.personalized_newsong_data.data.result.map((item) => {
                               return (
                                   <div className = 'personalized_newsong_item'>
                                       <img src = {item.song.album.blurPicUrl+ '?param=90y90'}></img>
                                       <div>
                                           <p>{item.name}</p>
                                           <p style = {{'color':'rgb(180,180,180)'}}>{item.song.artists.map((items) => {
                                               return (
                                                   <span>{items.name}/</span>
                                               )
                                           })}</p>
                                       </div>
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
               </div>
               <div className = 'personalized_mv'>
                   <div className = 'personalized_mv_head'>最新MV</div>
                   <div className = 'personalized_mv_hr'></div>
                   <div className = 'personalized_mv_body'>
                       {
                           this.props.get_personalized_mv?this.props.personalized_mv_data.data.result.map((item) => {
                               return (
                                   <div className = 'personalized_mv_item'>
                                       <img src = {item.picUrl+ '?param=400y230'}></img>
                                       <div>
                                           <p>{item.name}</p>
                                           <p style = {{'color':'rgb(180,180,180)'}}>{item.artists.map((items) => {
                                               return (
                                                   <span>{items.name}/</span>
                                               )
                                           })}</p>
                                       </div>
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
               </div>
           </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
      get_banner_data:state.recommend.getbannerdata,
      banner_data:state.recommend.bannerdata,
      get_personalized_playlist:state.recommend.getpersonalizedplaylist,
      personalized_playlist_data:state.recommend.personalizedplaylistdata,
      get_personalized_newsong:state.recommend.getpersonalizednewsong,
      personalized_newsong_data:state.recommend.personalizednewsongdata,
      get_personalized_mv:state.recommend.getpersonalizedmv,
      personalized_mv_data:state.recommend.personalizedmvdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
      ask_bnner_data:() => dispatch(askbannerdata()),
      ask_personalized_playlist_data: () => dispatch(askpersonalizedplaylistdata()),
      ask_personalized_newsong_data: () => dispatch(askpersonalizednewsongdata()),
      ask_personalized_mv_data: () => dispatch(askpersonalizedmvdata()),
      go_musiclist_detail:() => dispatch(gomusiclistdeail())
    }
  }
export default connect( mapstatetoprops, mapdistoprops )(Personalized)