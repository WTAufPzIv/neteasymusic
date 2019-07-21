import React from 'react';
import './new.css'
import { connect } from 'react-redux'
import { asknewmusic,asknewalbum, pushstack, goalbumdetail } from '../../store/actionCreators'
import { Radio } from 'antd';
import { ProgressCircle } from 'react-desktop/windows';
class New extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pagetype:'a'
        }
    }
    changepagetype = (e) => {
    
        this.setState({
            pagetype:e
        })
    }
    componentWillMount(){
        this.props.ask_newmusic()
        this.props.ask_newalbum()
    }
    goalbumdetail = (id) => {
        this.props.push_stack()
        this.props.history.push('/album', {id:id})
        this.props.go_album()
    }
    render(){
        return(
           <div className = 'newmusic_body'>
               <div className = 'newmusic_head'>
                    
                    <div className = 'newmusic_button_group'>
                        <div className = {this.state.pagetype === 'a'?'newmusic_button_left':'newmusic_button_right'} style = {{'borderTopLeftRadius':'5px','borderBottomLeftRadius':'5px'}} onClick = { () => this.changepagetype('a')}>新歌速递</div>
                        <div className = {this.state.pagetype === 'a'?'newmusic_button_right':'newmusic_button_left'} style = {{'borderTopRightRadius':'5px','borderBottomRightRadius':'5px'}}  onClick = { () => this.changepagetype('b')}>新碟上架</div>
                    </div>
                    
               </div>
               <div className = 'newmusic_hr'></div>
               <div className = 'newmusic_list' style = {{'display':this.state.pagetype === 'a'?'flex':'none'}}>
                   {
                        this.props.get_newmusic?this.props.newmusic_data.data.data.map((item,index) => {
                            return (
                                <div className = 'newmusic_list_item_body' style = {{'backgroundColor':index%2 === 0?'rgb(35,35,35)':'null'}}>
                                    <p>{index+1}</p>
                                    <img src = {item.album.blurPicUrl + '?param=60y60'}></img>
                                    <div className = 'newmusic_list_item_name' style={{"WebkitBoxOrient": "vertical"}}>{item.name}</div>
                                    <div className = 'newmusic_list_item_artist'>{item.artists.slice(0,2).map((itemm) =>{
                                        return (
                                            <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}{'\u00a0'}</p>
                                        )
                                    })}
                                    {item.artists.length >=3 ? '...':''}
                                    </div>
                                    <div className = 'newmusic_list_item_album' style={{"WebkitBoxOrient": "vertical"}}>{item.album.name}</div>
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
               <div className = 'newalbum_list' style = {{'display':this.state.pagetype === 'a'?'none':'flex'}}>
                   {
                        this.props.get_newalbum === true?this.props.newalbum_data.data.albums.map((item) => {
                            return (
                                <div className = 'newalbum_list_item_body' onClick = {() => this.goalbumdetail(item.id)}>
                                    <img src = {item.blurPicUrl+ '?param=175y175'}></img>
                                    <p style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                    <div>{
                                        item.artists.slice(0,2).map((itemm) => {
                                            return (
                                                <p>{itemm.name}</p>
                                            )
                                        })
                                    }
                                    {item.artists.length >=3?'...':''}
                                    </div>
                                </div>
                            )
                        }):(
                            <div style = {{'display':'flex','flexDirection':'row','justifyContent':'center'}}><ProgressCircle
                            color='white'
                            size={100}
                            /></div>
                        )
                   }
               </div>
           </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
       get_newmusic:state.newmusic.getnewmusic,
       newmusic_data:state.newmusic.newmusicdata,
       get_newalbum:state.newmusic.getnewalbum,
       newalbum_data:state.newmusic.newalbumdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_newmusic: () => dispatch(asknewmusic()),
        ask_newalbum: () => dispatch(asknewalbum()),
        push_stack:() => dispatch(pushstack()),
        go_album:() => dispatch(goalbumdetail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(New)