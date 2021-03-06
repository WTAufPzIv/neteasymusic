import React from 'react';
import './comment.css'
import { BrowserRouter,Route,Switch, Redirect } from 'react-router-dom'
import { Link,NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import { ProgressCircle } from 'react-desktop/windows';
import {  message } from 'antd'
import { releascomment,votecomment } from '../../../store/actionCreators'
class Comments extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            voteid:0
        }
    }
    input = (e) => {
        this.setState({
            text:e.target.value
        })  
    }
    release = () => {
        if(this.state.text.length > 140){
            message.error('字数超出限制')
        }
        else{
            // console.log(this.state.text)
            if(this.props.login_status){
                this.props.releas_comment(this.state.text,this.props.id)
                // console.log(this.props.id)
                this.setState({
                    text:''
                })
            }
            else{
                message.error('您还没有登录')
            }
        }
    }
    vote = (cid,doo) => {
    
        // console.log(this.state.text)
        if(this.props.login_status){
            console.log(doo)
             this.setState({
                 voteid:doo===true?0:cid
             })
             this.props.vote_comment(this.props.id,cid,doo===true?0:1)
             //console.log(this.props.id)
             //  console.log(cid)
        }
        else{
            message.error('您还没有登录')
        }
        
    }
    render(){
        return(
            <div className = 'musiclist_comment_body'>
                <div className = 'musiclist_comment_head'>
                    <textarea onChange = {(e) => this.input(e)} value = {this.state.text}></textarea>
                    <div onClick = { () => this.release()}>发布</div>
                </div>
                <div className = 'musiclist_comment_list'>
                    <div className = 'musiclist_comment_list_head'>最热评论</div>
                    <div className = 'musiclist_comment_list_body'>
                        {
                            this.props.get_musiclist_comment?this.props.musiclist_comment_data_hot.map((item) => {
                                return (
                                    <div className = 'musiclist_comment_list_item'>
                                        <div className = 'musiclist_comment_list_item_hr'></div>
                                        <div className = 'musiclist_comment_list_item_user'>
                                            <div>
                                                <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                            </div>
                                            <p>
                                                <span>{item.user.nickname}</span>
                                                <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                            </p>
                                        </div>
                                        <div className = 'musiclist_comment_list_item_content'>
                                            <p>{item.content}</p>
                                            <div>
                                                <span>({item.likedCount})</span>
                                                <img src = {(item.liked || item.commentId === this.state.voteid)?require('./img/点赞 (1).png'):require('./img/点赞.png')} onClick = {() => this.vote(item.commentId,item.liked)}></img>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }):(
                                <div><ProgressCircle color='white' size={100} /></div>
                            )
                        }
                    </div>
                </div>
                 <div className = 'musiclist_comment_list'>
                     <div className = 'musiclist_comment_list_head'>全部评论</div>
                         <div className = 'musiclist_comment_list_body'>
                             {
                                this.props.get_musiclist_comment?this.props.musiclist_comment_data_all.map((item) => {
                                    return (
                                        <div className = 'musiclist_comment_list_item'>
                                            <div className = 'musiclist_comment_list_item_hr'></div>
                                            <div className = 'musiclist_comment_list_item_user'>
                                                <div>
                                                    <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                                </div>
                                                <p>
                                                <span>{item.user.nickname}</span>
                                                <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                                </p>
                                            </div>
                                            <div className = 'musiclist_comment_list_item_content'>
                                                <p>{item.content}</p>
                                                <div>
                                                    <span>({item.likedCount})</span>
                                                    <img src = {(item.liked ||this.state.voteid === item.commentId)?require('./img/点赞 (1).png'):require('./img/点赞.png')} onClick = {() => this.vote(item.commentId,item.liked)}></img>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }):(
                                    <div><ProgressCircle color='white' size={100} /></div>
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
        login_status:state.user.loginstatus,
        get_musiclist_comment:state.playlist.getmusiclistcomment,
        musiclist_comment_data_hot:state.playlist.musiclistcommentdatahot,
        musiclist_comment_data_all:state.playlist.musiclistcommentdataall,
        id:state.playlist.getplaylistdetail?state.playlist.playlistdetaildata.data.playlist.id:0
    }
}
const mapdistoprops = (dispatch) => {
    return{
        releas_comment:(e,id) => dispatch(releascomment(e,id)) ,
        vote_comment:(id,cid,type) => dispatch(votecomment(id,cid,type))
    }
}
export default connect( mapstatetoprops, mapdistoprops )(Comments)