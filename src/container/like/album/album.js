import React from 'react'
import './album.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { asklikealbum } from '../../../store/actionCreators'
import './album.css'
class Album extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
    }
    componentDidMount(){
        this.props.ask_like_album(0)
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
                this.props.ask_like_album(that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_like_album){
            if(this.props.like_album_data.data.hasMore){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_like_album(that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    render = () => {
        return(
            <div className = 'like_album_body'>
                <div className = 'like_album_head'>收藏的专辑</div>
                <div className = 'like_album_hr'></div>
                <div className = 'like_album_list'>
                    {
                        this.props.get_like_album?this.props.like_album_data.data.data.map((item) => {
                            return (
                                <div className = 'like_album_list_item'>
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
                        this.props.get_like_album?(
                            <div className = 'like_album_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.like_album_data.data.hasMore !== true?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
       get_like_album:state.like.getlikealbum,
       like_album_data:state.like.likealbumdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_like_album:(page) => dispatch(asklikealbum(page)),
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Album)