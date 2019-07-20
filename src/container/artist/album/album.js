import React from 'react'
import './album.css'
import { connect } from 'react-redux'
import { askartistalbum,goalbumdetail, pushstack } from '../../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
class Album extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }

    }
    componentWillMount(){

    }
    pre = () => {
        var that = this
        if(this.state.page === 0){
            alert('已经是第一页')
        }
        else{
            this.setState({
                page:that.state.page - 1
            },() => {
                this.props.ask_artist_album(that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_artist_album){
            if(this.props.artist_album_data.hasMore){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_artist_album(that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    gotoalbumdetail = (id) => {
        this.props.push_stack()
        this.props.history.push('/album', {id:id})
        this.props.go_album(id)
    }
    render(){
        return (
            <div className = 'artist_album_body'>
                <div className = 'artist_album_list'>
                    {
                        this.props.get_artist_album?this.props.artist_album_data.hotAlbums.map((item) => {
                            return (
                                <div className = 'artist_album_list_item' onClick = {() => this.gotoalbumdetail(item.id)}>
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
                        this.props.get_artist_album?(
                            <div className = 'artist_album_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.artist_album_data.hasMore !== true?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
    return {
        artist_music_data:state.artist.artistmusicdata,   
        get_artist_album:state.artist.getartistalbum,
        artist_album_data:state.artist.artistalbumdata,
    }
}
const mapdistoprops = (dispatch) =>{
    return {  
        ask_artist_album: (id,page) => dispatch(askartistalbum(id,page)) ,
        go_album :(id) => dispatch(goalbumdetail(id)),
        push_stack:() => dispatch(pushstack())
    }
}
export default connect(mapstatetoprops,mapdistoprops)(Album)