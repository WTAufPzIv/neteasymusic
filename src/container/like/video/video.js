import React from 'react'
import './video.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { asklikevideo } from '../../../store/actionCreators'
class Video extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
    }
    componentDidMount(){
        this.props.ask_like_video(0)
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
                this.props.ask_like_video(that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_like_video){
            if(this.props.like_video_data.data.hasMore){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_like_video(that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    render = () => {
        return(
            <div className = 'like_video_body'>
                <div className = 'like_video_head'>收藏的MV/视频</div>
                <div className = 'like_video_hr'></div>
                <div className = 'like_video_list'>
                    {
                        this.props.get_like_video?this.props.like_video_data.data.data.map((item) => {
                            return (
                                <div className = 'like_video_list_item'>
                                    <img src = {item.coverUrl+'?param=180y120'}></img>
                                    <span style={{"WebkitBoxOrient": "vertical"}}>{item.title}</span>
                                    <p>{item.creator[0].userName}</p>
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
                        this.props.get_like_video?(
                            <div className = 'like_video_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.like_video_data.data.hasMore !== true?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
   
    return{
        get_like_video:state.like.getlikevideo,
        like_video_data:state.like.likevideodata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_like_video:(page) => dispatch(asklikevideo(page)),
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Video)