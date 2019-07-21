import React from 'react'
import './artist.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { asklikeartist, goartistdetail, pushstack } from '../../../store/actionCreators'
class Artist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
    }
    componentDidMount(){
        this.props.ask_like_atist(0)
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
                this.props.ask_like_atist(that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_like_artist){
            if(this.props.like_artist_data.data.hasMore){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_like_atist(that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    goartistdetail = (id) => {
        this.props.push_stack()
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:id})
    }
    render = () => {
        return(
            <div className = 'like_artist_body'>
                <div className = 'like_artist_head'>收藏的歌手</div>
                <div className = 'like_artist_list'>
                    {
                        this.props.get_like_artist?this.props.like_artist_data.data.data.map((item,index) => {
                            return (
                                <div className = 'like_artist_item' style = {{'backgroundColor':index%2===0?'rgb(28,28,28)':''}} onClick = {() => this.goartistdetail(item.id)}>
                                    <img  src = {item.picUrl+'?param=50y50'}/>
                                    <p>{item.name}</p>
                                    <span>专辑：{item.albumSize}</span>
                                    <div>MV：{item.mvSize}</div>
                                </div>
                            )
                        }):(
                            <div><ProgressCircle
                                    color='white'
                                    size={100}
                                    /></div>
                        )
                    }
                    {
                        this.props.get_like_artist?(
                            <div className = 'like_artist_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.like_artist_data.data.hasMore !== true?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
                            </div>
                        ):(
                            <div></div>
                        )
                }
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    
    return{
        get_like_artist:state.like.getlikeartist,
        like_artist_data:state.like.likeartistdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_like_atist:(page) => dispatch(asklikeartist(page)),
        go_artist_detail:() => dispatch(goartistdetail()),
        push_stack:() => dispatch(pushstack())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Artist)