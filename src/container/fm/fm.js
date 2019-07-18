import React from 'react';
import './fs.css'
import { connect } from 'react-redux'
import { askdaysong } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
class Fm extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        if(this.props.login_status){
            this.props.ask_daysong()
        }
    }
    render(){
        return(
            <div className = 'fm_body'>
                {
                    this.props.login_status?(
                        <div className = 'day_login'>
                            <div className = 'day_list_head'>
                            <img src = {require('./img/undraw_compose_music_ovo2.svg')}></img>
                                <div>
                                    <p>每日歌曲推荐</p>
                                    <p style = {{'fontSize':'15px'}}>每日6点更新</p>
                                </div>
                                
                            </div>
                            <div className = 'day_list_body'>
                                <div className = 'day_list_tr'><img  src = {require('./img/play.png')} />播放全部</div>
                                {
                                     this.props.get_daysong?this.props.daysong_data.data.recommend.map((item,index) => {
                                         return (
                                             <div className = 'day_list_item' style = {{'backgroundColor':index%2===0?'rgb(37,37,37)':''}}>
                                                 <div>
                                                     <img src = {require('./img/like.png')}></img>
                                                     <span>{index+1}</span>
                                                 </div>
                                                 <span style={{"WebkitBoxOrient": "vertical"}}>{item.name}</span>
                                                 <p>{item.artists.slice(0,2).map((itemm) => {
                                                     return (
                                                         <span>{itemm.name}{'\u00a0'}</span>
                                                     )
                                                 })}
                                                 {
                                                     item.artists.length >=3?'...':''
                                                 }
                                                 </p>
                                                 <p style={{"WebkitBoxOrient": "vertical"}}>{item.album.name}</p>
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
                    ):(
                        <div className = 'day_nologin'>
                            <img src = {require('./img/undraw_compose_music_ovo2.svg')}></img>
                            <div>您还没有登录，右上角立即登录</div>
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    return{
        // login_status:false,
       login_status:state.user.loginstatus,
       get_daysong:state.day.getdaysong,
       daysong_data:state.day.daysongdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_daysong:() => dispatch(askdaysong())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Fm)