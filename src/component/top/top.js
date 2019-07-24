import React from 'react';
import './top.css'
import { connect } from 'react-redux'
import { asktopdata1,asktopdata2,asktopdata3,asktopdata4,asktopdata5,asktopdata6} from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
import store from '../../store/index'
import { canchangeplaystatus,play_netmusic,goartistdetail,pushstack   } from '../../store/actionCreators'

class Top extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentWillMount(){
        this.props.ask_top_data1()
        this.props.ask_top_data2()
        this.props.ask_top_data3()
        this.props.ask_top_data4()
        this.props.ask_top_data5()
        this.props.ask_top_data6()
    }
    play = (index,data) => {
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
        // console.log(data)
    }
    goartist = (id) => {
        this.props.push_stack()
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:id})
    }
    render(){
        return(
           <div className = 'top'>
               <div className = 'top_head'>
                   <p>网易云热榜</p>
               </div>
               <div className = 'top_hr'></div>
               <div className = 'top_body'>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/1.png')+')'}} className = 'top_item_img'></div>
                        <div className = 'top_item_list'>
                            {
                                this.props.get_top1?this.props.top_data1.data.playlist.tracks.slice(0,10).map((item, index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none'}} onDoubleClick = {() => this.play(index,this.props.top_data1.data.playlist.tracks)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                            <div className = 'top_item_list_item_artist'>
                                                
                                                    {
                                                        item.ar.map((itemm) => {
                                                            return(
                                                                <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}</p>
                                                            )
                                                        })
                                                    }
                                                
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/2.png')+')'}} className = 'top_item_img'></div>
                       <div className = 'top_item_list'>
                            {
                                this.props.get_top2?this.props.top_data2.data.playlist.tracks.slice(0,10).map((item,index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none'}} onDoubleClick = {() => this.play(index,this.props.top_data2.data.playlist.tracks)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                            <div className = 'top_item_list_item_artist'>
                                                
                                                    {
                                                        item.ar.map((itemm) => {
                                                            return(
                                                                <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}</p>
                                                            )
                                                        })
                                                    }
                                                
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/3.png')+')'}} className = 'top_item_img'></div>
                        <div className = 'top_item_list'>
                            {
                                this.props.get_top3?this.props.top_data3.data.playlist.tracks.slice(0,10).map((item, index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none'}} onDoubleClick = {() => this.play(index,this.props.top_data3.data.playlist.tracks)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                            <div className = 'top_item_list_item_artist'>
                                                
                                                    {
                                                        item.ar.map((itemm) => {
                                                            return(
                                                                <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}</p>
                                                            )
                                                        })
                                                    }
                                                
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/4.png')+')'}} className = 'top_item_img'></div>
                        <div className = 'top_item_list'>
                            {
                                this.props.get_top4?this.props.top_data4.data.playlist.tracks.slice(0,10).map((item, index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none'}} onDoubleClick = {() => this.play(index,this.props.top_data4.data.playlist.tracks)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                            <div className = 'top_item_list_item_artist'>
                                                
                                                    {
                                                        item.ar.map((itemm) => {
                                                            return(
                                                                <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}</p>
                                                            )
                                                        })
                                                    }
                                                
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/5.jpg')+')'}} className = 'top_item_img'></div>
                        <div className = 'top_item_list'>
                            {
                                this.props.get_top5?this.props.top_data5.data.playlist.tracks.slice(0,10).map((item, index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none'}} onDoubleClick = {() => this.play(index,this.props.top_data5.data.playlist.tracks)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                            <div className = 'top_item_list_item_artist'>
                                                
                                                    {
                                                        item.ar.map((itemm) => {
                                                            return(
                                                                <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}</p>
                                                            )
                                                        })
                                                    }
                                                
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
                   <div className = 'top_item'>
                        <div style = {{'backgroundImage':'url('+require('./img/6.png')+')'}}  className = 'top_item_img'></div>
                        <div className = 'top_item_list'>
                            {
                                this.props.get_top6?this.props.top_data6.data.list.artists.slice(0,10).map((item, index) => {
                                    return(
                                        <div className = 'top_item_list_item' style = {{'backgroundColor':index%2 === 0?'rgb(30,30,30)':'none','cursor':'pointer'}} onClick = {() => this.goartist(item.id)}>
                                            <div className = 'top_item_list_item_name'>
                                                <span style = {{'color':index === 0 || index ===1 || index === 2 ? 'red':'rgb(130,130,130)'}}>{index+1}</span>
                                                <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <ProgressCircle
                                            color='white'
                                            size={100}
                                    />
                                )
                            }
                        </div>
                   </div>
               </div>
           </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
       get_top1:state.top.gettop1,
       top_data1:state.top.topdata1,
       get_top2:state.top.gettop2,
       top_data2:state.top.topdata2,
       get_top3:state.top.gettop3,
       top_data3:state.top.topdata3,
       get_top4:state.top.gettop4,
       top_data4:state.top.topdata4,
       get_top5:state.top.gettop5,
       top_data5:state.top.topdata5,
       get_top6:state.top.gettop6,
       top_data6:state.top.topdata6
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_top_data1:() => dispatch(asktopdata1()),
        ask_top_data2:() => dispatch(asktopdata2()),
        ask_top_data3:() => dispatch(asktopdata3()),
        ask_top_data4:() => dispatch(asktopdata4()),
        ask_top_data5:() => dispatch(asktopdata5()),
        ask_top_data6:() => dispatch(asktopdata6()),
        go_artist_detail:() => dispatch(goartistdetail()),
        push_stack:() => dispatch(pushstack())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Top)