import React from 'react';
import './fs.css'
import { connect } from 'react-redux'
import { askdaysong } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
import store from '../../store/index'
import { canchangeplaystatus,play_netmusic   } from '../../store/actionCreators'
// import nologin from './img/undraw_compose_music_ovo2.svg'
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
    render(){
        return(
            <div className = 'fm_body'>
                {
                    this.props.login_status?(
                        <div className = 'day_login'>
                            <div className = 'day_list_head'>
                            <img src = {require('./img/QQ截图20190724160150.png')}></img>
                                <div>
                                    <p>每日歌曲推荐</p>
                                    <p style = {{'fontSize':'15px'}}>每日6点更新</p>
                                </div>
                                
                            </div>
                            <div className = 'day_list_body'>
                                <div className = 'day_list_tr'><img  src = {require('./img/play.png')} onClick = {() => this.play(this.props.daysong_data.data.recommend,0)}/>播放全部</div>
                                {
                                     this.props.get_daysong?this.props.daysong_data.data.recommend.map((item,index) => {
                                         return (
                                             <div className = 'day_list_item' style = {{'backgroundColor':index%2===0?'rgb(37,37,37)':''}} onDoubleClick = {() => this.play(this.props.daysong_data.data.recommend,index)}>
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
                            <img src = {require('./img/音乐.png')}></img>
                            {/* <svg viewBox="${nologinviewBox}">
                                <use xlinkhref="#${nologin.id}" />
                            </svg>`; */}
                            <div>登录后开启每日推荐</div>
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