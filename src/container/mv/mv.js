import React from 'react'
import { connect } from 'react-redux'
import { askmvdetail,askmvurl ,deletemvdata,askvediodetail,askvediourl, popstack,askmvcomment,askvediocomment ,askmorevediocomment,askmroemvcomment, releascommentmv,releascommentvedio,votecommentmv ,votecommentvedio} from '../../store/actionCreators'
import './mv.css'
import { ProgressCircle } from 'react-desktop/windows';
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import {  message } from 'antd'
class Mv extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:0,
            type:3,
            canload:false,
            page:0,
            text:'',
            voteid:0
        }
        this.props.history.listen(() => this.next())
    }
    next = () => {
        
        if(this.props.location.state && this.props.Path === 'mv'){
            if(this.props.location.state.type === 0){//类型为mv
                var that = this
                console.log(this.props.location.state.type)
                this.props.delete_mv_data()
                this.props.ask_mv_detail(this.props.location.state.id)
                this.props.ask_mv_url(this.props.location.state.id)
                this.setState({
                    id:that.props.location.state.id,
                    type:0,
                    canload:true
                })
                this.props.ask_mv_comment(this.props.location.state.id,this.state.page)
                // this.props.ask_mv_comment(this.props.location.state.id,this.state.page)
                // setTimeout(() => {
                //     that.props.ask_mv_comment(that.props.location.state.id,that.state.page)
                // },100)
            }
            else{//类型为视频
                that = this
                console.log(this.props.location.state.type)
                this.props.delete_mv_data()
                this.props.ask_vedio_detail(this.props.location.state.id)
                this.props.ask_vedio_url(this.props.location.state.id)
                // this.props.ask_vedio_comment(this.props.location.state.id,this.state.page)
                that = this
                this.setState({
                    id:that.props.location.state.id,
                    type:1,
                    canload:true
                })
                this.props.ask_vedio_comment(this.props.location.state.id,this.state.page)
            }
        }
    }
    componentDidMount(){
        // this.refs.mv_detail_body
    }
    input = (e) => {
        this.setState({
            text:e.target.value
        })  
    }
    release = () => {
        if(this.state.text.replace(/\s*/g,"").length === 0){
            message.error('输入不合法')
        }
        else if(this.state.text.length > 140){
            message.error('字数超出限制')
        }
        else{
            if(this.props.login_status){
                if(this.state.type === 0){
                    this.props.releas_comment_mv(this.state.text,this.props.mv_detail_data.data.id)
                    this.setState({
                        text:''
                    })
                }
                else{
                    this.props.releas_comment_vedio(this.state.text,this.props.mv_detail_data.data.vid)
                    this.setState({
                        text:''
                    })
                }
            
            }
            else{
                message.error('您还没有登录')
            }
        }
    }
    vote = (cid,doo) => {
        // console.log(this.state.text)
        if(this.props.login_status){
             this.setState({
                 voteid:doo===true?0:cid
             })
             if(this.state.type === 0){
                this.props.vote_comment_mv(this.props.mv_detail_data.data.id,cid,doo===true?0:1)
             }
             else{
                this.props.vote_comment_vedio(this.props.mv_detail_data.data.vid,cid,doo===true?0:1)
             }
             //console.log(this.props.id)
             //  console.log(cid)
        }
        else{
            message.error('您还没有登录')
        }
    }
    back = () => {
        this.props.delete_mv_data()
        var i = this.props.pop_data
        this.props.pop_stack()
        this.props.delete_mv_data()
        this.props.history.go(i)
    }
    scroll = () => {
        console.log(document.body.clientHeight+' '+(this.refs.mv_detail_body.scrollTop+687)+' '+this.refs.mv_detail_body.scrollHeight+' '+(this.refs.mv_detail_body.offsetHeight)) 
        if(this.refs.mv_detail_body.scrollTop === this.refs.mv_detail_body.scrollHeight - (this.refs.mv_detail_body.offsetHeight)){
            if(this.props.get_mv_comment){
                if(this.state.type === 0){
                    if(this.props.mv_comment_data.more){
                        console.log('加载')
                        this.setState({
                            page:this.props.mv_comment_data_all[this.props.mv_comment_data_all.length-1].time
                        })
                        this.props.ask_more_mv_comment(this.state.id,this.props.mv_comment_data.comments[this.props.mv_comment_data.comments.length-1].time)
                    }
                    else{
                        message.warning('没有更多评论了');
                    }
                }
                else{
                    if(this.props.mv_comment_data.more){
                        console.log('加载')
                        this.setState({
                            page:this.props.mv_comment_data_all[this.props.mv_comment_data_all.length-1].time
                        })
                        this.props.ask_more_vedio_comment(this.state.id,this.props.mv_comment_data.comments[this.props.mv_comment_data.comments.length-1].time)
                    }
                    else{
                        message.warning('没有更多评论了');
                    }
                }
            }
        }
    }
    render = () => {
     
        return (
            <div className = 'mv_detail_body' ref = 'mv_detail_body' onScroll = {() => this.scroll()}>
                <Redirect to = '/mv'></Redirect>
                <div className = 'mv_detail_back'><p  onClick = { () => this.back()}>返回</p></div>
                <div className = 'mv_detail_head'>
                    {
                        this.props.get_mv_detail?(
                            <div>
                                <p>{this.props.mv_detail_data.data.name || this.props.mv_detail_data.data.title}</p>
                                <span>播放量：{this.props.mv_detail_data.data.playCount || this.props.mv_detail_data.data.playTime}</span>
                            </div>
                        ):(
                            <span>加载中</span>
                        )
                    }
                </div>
                <div className = 'mv_detail_play'>
                    {
                        this.props.get_mv_url&&this.state.canload?(
                           this.state.type === 0?(
                                <video src = {this.props.mv_url_data.data.url} controls = {true}></video>
                            ):(
                                <video src = {this.props.mv_url_data.urls[0].url} controls = {true}></video>
                            )
                        ):
                        <div><ProgressCircle
                        color='white'
                        size={100}
                        /></div>
                    }
                </div>
                <div className = 'mv_comment_body' ref = 'mv_comment_body'>
                    <div className = 'mv_comment_head'>
                        <textarea onChange = {(e) => this.input(e)} value = {this.state.text}></textarea>
                        <div onClick = { () => this.release()}>发布</div>
                    </div>
                    <div className = 'mv_comment_list'>
                        <div className = 'mv_comment_list_head'>最热评论</div>
                        <div className = 'mv_comment_list_body'>
                            {
                                this.props.get_mv_comment?this.props.mv_comment_data_hot.map((item) => {
                                    return (
                                        <div className = 'mv_comment_list_item'>
                                            <div className = 'mv_comment_list_item_hr'></div>
                                            <div className = 'mv_comment_list_item_user'>
                                                <div>
                                                    <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                                </div>
                                                <p>
                                                    <span>{item.user.nickname}</span>
                                                    <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                                </p>
                                            </div>
                                            <div className = 'mv_comment_list_item_content'>
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
                    <div className = 'mv_comment_list'>
                        <div className = 'mv_comment_list_head'>全部评论</div>
                            <div className = 'mv_comment_list_body'>
                                {
                                    this.props.get_mv_comment?this.props.mv_comment_data_all.map((item) => {
                                        return (
                                            <div className = 'mv_comment_list_item'>
                                                <div className = 'mv_comment_list_item_hr'></div>
                                                <div className = 'mv_comment_list_item_user'>
                                                    <div>
                                                        <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                                    </div>
                                                    <p>
                                                    <span>{item.user.nickname}</span>
                                                    <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                                    </p>
                                                </div>
                                                <div className = 'mv_comment_list_item_content'>
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
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
      get_mv_detail:state.mv.getmvdetail,
      mv_detail_data:state.mv.mvdetaildata,
      get_mv_url:state.mv.getmvurl,
      mv_url_data:state.mv.mvurldata,
      Path:state.router.path,
      pop_data:state.router.stack,
      get_mv_comment:state.mv.getmvcomment,
      mv_comment_data:state.mv.mvcommentdata,
      mv_comment_data_all:state.mv.mvcommentdataall,
      mv_comment_data_hot:state.mv.mvcommentdatahot,
      login_status:state.user.loginstatus
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_mv_detail : (id) => dispatch(askmvdetail(id)),
        ask_mv_url:(id) => dispatch(askmvurl(id)),
        delete_mv_data:() => dispatch(deletemvdata()),
        ask_vedio_detail:(id) => dispatch(askvediodetail(id)),
        ask_vedio_url:(id) => dispatch(askvediourl(id)),
        pop_stack : () => dispatch(popstack()),
        ask_vedio_comment:(id,page) => dispatch(askvediocomment(id,page)),
        ask_mv_comment:(id,page) => dispatch(askmvcomment(id,page)),
        ask_more_vedio_comment:(id,page) => dispatch(askmorevediocomment(id,page)),
        ask_more_mv_comment:(id,page) => dispatch(askmroemvcomment(id,page)),
        releas_comment_mv:(e,id) => dispatch(releascommentmv(e,id)),
        vote_comment_mv:(id,cid,type) => dispatch(votecommentmv(id,cid,type)),
        releas_comment_vedio:(e,id) => dispatch(releascommentvedio(e,id)),
        vote_comment_vedio:(id,cid,type) => dispatch(votecommentvedio(id,cid,type))
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Mv)