import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './album.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
import { asksearchres, pushstack, goalbumdetail } from '../../../store/actionCreators';
// import { } from '../../store/actionCreators';
class Album extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
        
    }
    pre = () => {
        var that = this
        if(this.state.page === 0){
            alert('已经是第一页')
        }
        else{
            this.setState({
                page:that.state.page-1
            },() => {
                this.props.ask_search_res(this.props.word,that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_search_res_album){
            if(this.props.search_res_album_data.result.albumCount > (this.state.page+1) * 50){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_search_res(this.props.word,that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    gotoalbumdetail = (id) =>{
        this.props.push_stack()
        this.props.history.push('/album', {id:id})
        this.props.go_album()
    }
    render = () => {
        return (
            <div className = 'search_res_album_body'>
                <div className = 'search_res_album_hr'></div>
                <div className = 'search_res_album_list'>
                    {
                        this.props.get_search_res_album?this.props.search_res_album_data.result.albums.map((item) => {
                            return (
                                <div className = 'search_res_album_list_item' onClick = { () => this.gotoalbumdetail(item.id)}>
                                    <img src = {item.picUrl+'?param=175y175'}></img>
                                    <span style={{"WebkitBoxOrient": "vertical"}}>{item.name}</span>
                                    <div>{item.artists.slice(0.2).map((itemm) => {
                                        return(
                                            <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}{' '}</p>
                                        )
                                    })}
                                    {item.artists.length >= 3?'...':''}</div>
                                    <p >{item.size}首歌</p>
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
                {
                        this.props.get_search_res_album?(
                            <div className = 'search_res_album_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.search_res_album_data.result.albumCount <= (this.state.page+1) * 50?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
                            </div>
                        ):(
                            <div></div>
                        )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        get_search_res_album:       state.search.getsearchresalbum,
        search_res_album_data:      state.search.searchresalbumdata,
        word:                       state.search.Text
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_search_res:(e,page) => dispatch(asksearchres(e,10,page)),
        push_stack:() => dispatch(pushstack()),
        go_album:() => dispatch(goalbumdetail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Album)