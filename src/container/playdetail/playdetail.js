import   React  from 'react'
import './playdetail.css'
import store from '../../store/index'
import { closeplaydetail, lockplatdetail, stoplrc, havedrag, askmusiccommend, votecommentmusic, releascommentmusic, askmoremusiccommend } from '../../store/actionCreators'
import { connect } from 'react-redux'
import Lyric from 'lyric-parser'
import moment from 'moment'
import { ProgressCircle } from 'react-desktop/windows';
import {  message } from 'antd'

class PlayDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height:0,
            width:0,
            cdtransform:'',
            sticktrans:'rotate(-30deg)',
            musicinfo:{
                title:'',
                artist:'',
                album:'',
                vis:'none',
            },
            canplaylrc:false,
            lyric:'',
            index:0,
            text:'',
            voteid:0
        }
        store.subscribe(this.get_store_msg);
        
    }
    componentDidMount(){
        if(this.props.play_status){
            this.setState({
                cdtransform:'haha1 3s linear infinite;',
                sticktrans:'rotate(0deg)'
            })
        }
        else{
            this.setState({
                cdtransform:'',
                sticktrans:'rotate(-30deg)'
            })
        }
        // this.props.play_status?lyric.play():lyric.stop()
    }
    componentWillMount(){
        // if(this.props.play_type === 2){
        //     this.props.ask_lrc(this.props.playingdata.id)
        // }
       
    }
    componentWillUnmount(){
        console.log('卸载')
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
                this.props.releas_comment(this.state.text,this.props.playingdata.id)
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
             this.props.vote_comment(this.props.playingdata.id,cid,doo===true?0:1)
             //console.log(this.props.id)
             //  console.log(cid)
        }
        else{
            message.error('您还没有登录')
        }
        
    }
    get_store_msg = () => {
        setTimeout(() => {
            var that = this
            if(this.props.open_play_detail){
                
                setTimeout(() => {
                    that.setState({
                    height:100,
                    width:100
                })
                }, 100); 
            }
            

            if( this.props.playingdata && !this.props.lock_playdetail){
                // remove(this.hand)
                console.log('执行了加载数据函数')
                const action2 = lockplatdetail()
                store.dispatch(action2)
                this.setState({
                    musicinfo:this.props.playingdata
                })
                if(this.props.play_type === 2){
                    console.log(this.props.playingdata)
                    this.props.ask_music_commend(this.props.playingdata.id)
                    var flag = new Lyric(this.props.playingdata.lrc, ({lineNum, txt}) => {
                        console.log(lineNum, txt)
                    })
                    console.log(flag)
                    var arr = []
                    flag.lines.map((item) => {
                        var t = item.txt
                        var tt = Math.floor(item.time/10/100)*60*60+(item.time/10%100)
                        arr.push({
                            time:tt,
                            txt:t
                        })
                    })
                    this.setState({
                        lyric:that.props.playingdata.lrc.replace(/\n/g,'<br />'),
                        index:0
                    })
                    console.log(this.state.lyric)
                }
            }


            if(this.props.play_status){
                // console.log(this.props)
                this.setState({
                    cdtransform:'haha1 3s linear infinite;',
                    sticktrans:'rotate(0deg)'
                })
                // if(this.props.play_type === 2){
                //     if(this.state.lyric.length !== 0){
                //         if(this.props.is_drag){
                //             console.log('开始修正')
                //             for(var i = 0;i < this.state.lyric.length; i++){
                //                 if(this.props.current_time >= this.state.lyric[i].time - 8000){
                //                     that.setState({
                //                         index:i
                //                     })
                //                     break
                //                 }
                //             }
                //             const action = havedrag(false)
                //             store.dispatch(action)
                //         }
                //         else{
                //             // console.log('正常滚动')
                //             if(this.props.current_time >= this.state.lyric[this.state.index].time-8000){
                //                 console.log(this.state.lyric[this.state.index].txt)
                //                 if(this.state.index < this.state.lyric.length - 1)
                //                 this.setState({
                //                     index:that.state.index + 1
                //                 })
                //             }
                //         }
                //     }
                // }
            }
            else{
                // console.log(this.props)
                this.setState({
                    cdtransform:'',
                    sticktrans:'rotate(-30deg)'
                })  
            }
        },50)   
    }
    cancel_full_screen = () => {
        this.setState({
            height:0,
            width:0
            })
             setTimeout(this.props.cancelfullscreen(),150)    
    }
    scrool = () => {
        console.log(document.body.clientHeight+' '+(this.refs.playdetail_body.scrollTop)+' '+this.refs.playdetail_body.scrollHeight+' '+this.refs.playdetail_body.offsetHeight) 
        if(this.refs.playdetail_body.scrollHeight === (this.refs.playdetail_body.scrollTop+this.refs.playdetail_body.offsetHeight)){   
            if(this.props.get_music_comment){
                if(this.props.music_comment_data.more){
                    console.log('加载')
                    this.setState({
                        page:this.props.music_comment_data_all[this.props.music_comment_data_all.length-1].time
                    })
                    this.props.ask_more_music_comment(this.props.playingdata.id,this.props.music_comment_data_all[this.props.music_comment_data_all.length-1].time)
                }
                else{
                    message.warning('没有更多评论了');
                }
            }
        }
    }
    render(){
        return(
             <div className = 'playdetail_body' style = {{'height':this.state.height+'%','width':this.state.width+'%','display':this.state.vis}} onScroll = { () => this.scrool()} ref = 'playdetail_body'>
                 <div className = 'playdetail_body_bg' style = {{'backgroundImage':this.props.play_type !== 1?'url('+this.props.playingdata.albumImg+'?param=300y300'+')' :'none'}}></div>
             {/* <div className = 'playdetail_body' style = {{'height':this.props.open_play_detail?'100%':'0','width':this.props.open_play_detail?'100%':'0'}}> */}
                <div className = 'playdetail_view'>
                    <div className = 'playdetail_view_title'>
                        <div className = 'play_detail_title_albumImg_contanier'>
                            <img src = {require('./img/stick_bg.png')} style = {{'transform':this.state.sticktrans}}></img>
                            <div className = 'play_detail_title_albumImg' style = {{'animation':this.state.cdtransform}}>
                                <img src = {this.props.play_type === 1 ? require('./img/placeholder_disk_play_program.png') : this.props.playingdata.albumImg+'?param=200y200'} style = {{'width':'68%','height':'68%'}} ></img>
                            </div>
                        </div>
                        <div className = 'play_detail_title_musicinfo_container'>
                            <div className = 'play_detail_title_musicinfo_title'>
                                <span>{this.state.musicinfo.title  ? this.props.playingdata.title : '（没有播放）'}</span>
                                <div onClick = {() => this.cancel_full_screen()}>
                                    <img src = {require('./img/Cancel Full Screen.png')}></img>
                                </div>
                            </div>
                            <div className = 'play_detail_title_musicinfo_otherinfo'>
                                <div  style={{"WebkitBoxOrient": "vertical"}}><span>专辑：</span>{this.props.playingdata.album || '未知'}</div>
                                <div  style={{"WebkitBoxOrient": "vertical",'userSelect':'text'}}><span>歌手：</span>{this.props.playingdata.artist ? this.props.playingdata.artist : '未知'}</div>
                                <div  style={{"WebkitBoxOrient": "vertical"}}><span>来源：</span>{this.props.play_type === 1 ? '本地音乐' : '在线播放'}</div>
                            </div>
                            <div className = 'play_detail_title_musicinfo_lrc' style = {{'display':this.props.play_type === 2? 'flex':'none'}}>
                                {
                                    // this.state.lyric.length > 0? this.state.lyric.map((item) =>{
                                    //     return (
                                    //         <div>{item.txt}</div>
                                    //     )
                                    // }):(
                                    //     <div>暂无歌词</div>
                                    // )
                                    <div dangerouslySetInnerHTML={{__html: this.state.lyric}}></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className = 'playdetail_view_comment'>
                                <div className = 'music_comment_body'>
                                    <div className = 'music_comment_head'>
                                        <textarea onChange = {(e) => this.input(e)} value = {this.state.text}></textarea>
                                        <div onClick = { () => this.release()}>发布</div>
                                    </div>
                                    <div className = 'music_comment_list'>
                                        <div className = 'music_comment_list_head'>最热评论</div>
                                        <div className = 'music_comment_list_body'>
                                            {
                                                this.props.get_music_comment?this.props.music_comment_data_hot.map((item) => {
                                                    return (
                                                        <div className = 'music_comment_list_item'>
                                                            <div className = 'music_comment_list_item_hr'></div>
                                                            <div className = 'music_comment_list_item_user'>
                                                                <div>
                                                                    <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                                                </div>
                                                                <p>
                                                                    <span>{item.user.nickname}</span>
                                                                    <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                                                </p>
                                                            </div>
                                                            <div className = 'music_comment_list_item_content'>
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
                                    <div className = 'music_comment_list'>
                                        <div className = 'music_comment_list_head'>全部评论</div>
                                            <div className = 'music_comment_list_body'>
                                                {
                                                    this.props.get_music_comment?this.props.music_comment_data_all.map((item) => {
                                                        return (
                                                            <div className = 'music_comment_list_item'>
                                                                <div className = 'music_comment_list_item_hr'></div>
                                                                <div className = 'music_comment_list_item_user'>
                                                                    <div>
                                                                        <img src = {item.user.avatarUrl+'?param=50y50'}></img>
                                                                    </div>
                                                                    <p>
                                                                    <span>{item.user.nickname}</span>
                                                                    <p>{moment(parseInt(item.time)).format("YYYY-MM-DD HH:mm:ss")}</p>
                                                                    </p>
                                                                </div>
                                                                <div className = 'music_comment_list_item_content'>
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
                </div>
            </div>
        );
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        play_status:state.player.play_status,
        open_play_detail:state.player.open_play_detail,
        playingdata:state.player.playingdetaildata || {
            album:'',
            artist:'',
        },
        play_type:state.player.playtype,
        lock_playdetail:state.player.lockplaydetailstatus,
        play_lrc:state.player.playlrc,
        current_time:state.player.currenttime,
        is_drag:state.player.isdrap,
        get_music_comment:state.player.getmusiccomment,
        music_comment_data_all:state.player.musiccommentdataall,
        music_comment_data_hot:state.player.musiccommentdatahot,
        login_status:state.user.loginstatus,
        music_comment_data:state.player.musiccommentdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        releas_comment:(e,id) => dispatch(releascommentmusic(e,id)) ,
        vote_comment:(id,cid,type) => dispatch(votecommentmusic(id,cid,type)),
        ask_more_music_comment:(id,page) =>dispatch(askmoremusiccommend(id,page)),
        ask_music_commend:(id) => dispatch(askmusiccommend(id)),
        cancelfullscreen(){
            setTimeout(() => {
                const action = closeplaydetail()
                dispatch(action)
            },150)
        }
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(PlayDetail)