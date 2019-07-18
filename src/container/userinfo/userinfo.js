import  React  from 'react'
import './userinfo.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { logout,openuserdetail } from '../../store/actionCreators'
import { Popconfirm, message,  } from 'antd'
import { Button } from 'react-desktop/windows';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import moment from 'moment'
class Userinfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            vis:false,
            text:'uuu'
        }
    }
    componentWillMount(){
        // setTimeout( () => {
        //     this.setState({
        //         vis:true
        //     },1000)
        // })
    }
    //componentDidMount(){
        // axios.post('http://localhost:9093/user/detail',{uid:this.props.user_info.profile.userId})
        // .then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
        // setTimeout(() => {
        //     this.props.get_user_detail_info(this.props.user_info.profile.userId)
        // },100)
        // setTimeout( () => {
        //     this.setState({
        //         vis:true
        //     },100)
        // })
    //}
    close = () => {
        this.props.open_userdetail(false)
    }
    log_out = () => {
        this.props.log_out()
    }
    render(){
        return (
            this.props.user_detail_info_success?(
            <div className = 'userinfo_body'>
                <div className = 'userinfo_vision'>
                    <div className = 'userinfo_close' onClick = { () => this.close()}>
                        <img src = {require('./img/close.png')}></img>
                    </div>
                    <div className = 'userinfo_avatar'>
                        <img  src = {this.props.user_detail_info.profile.avatarUrl || require('./img/avatar.png')}/>    
                        {/* {this.props.user_detail_info.profile.avatarUrl !== null? this.props.user_detail_info.profile.nickname : ''} */}
                    </div> 
                    <div className = 'userinfo_nickname'>
                        {this.props.user_detail_info.profile.nickname || '加载中...'} 
                    </div>
                    <div className = 'userinfo_follow'>
                        <div>{this.props.user_detail_info.profile.eventCount || '加载中...'}<br />动态</div>
                        <div>{this.props.user_detail_info.profile.follows || '加载中...'}<br />关注</div>
                        <div>{this.props.user_detail_info.profile.followeds || '加载中...'}<br />关注者</div>
                    </div> 
                    <div className = 'userinfo_script'>个人介绍：{this.props.user_detail_info.profile.description || '暂无介绍'}</div> 
                    <div className = 'userinfo_accuntinfo'>
                        {/* 账号信息 */}
                        <div>
                        <p><span>创建时间：</span>{moment(parseInt(this.props.user_detail_info.createTime)).format("YYYY年MM月DD日 HH:mm:ss")}</p>
                        <p><span>等级：</span>Lv{this.props.user_detail_info.level}</p>
                        <p><span>积分：</span>{this.props.user_detail_info.userPoint.balance}</p>
                        </div>
                    </div> 
                    <div className = 'userinfo_privideinfo'>
                        {/* 个人信息 */}
                        <div>
                            <p><span>生日：</span>{moment(parseInt(this.props.user_detail_info.profile.birthday)).format("YYYY年MM月DD日")}</p>
                            <p><span>听歌累计：</span>{this.props.user_detail_info.listenSongs}</p>
                            <p><span>歌单数量：</span>{this.props.user_detail_info.profile.playlistCount}</p>  
                        </div>    
                    </div> 
                    <div className = 'userinfo_logout'>.
                        {/* <Popconfirm placement="top" title={this.state.text} onConfirm={() => {this.props.log_out()}} okText="Yes" cancelText="No"  disabled = {true}> */}
                            <Button color = 'red' onClick = { () => this.log_out()} push = {true}>退出登录</Button>
                        {/* </Popconfirm> */}
                    </div> 
                </div>
            </div>):
            <div></div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
        user_info:state.user.user.data || {},
        user_detail_info:state.user.userdetailinfo.data || {},
        user_detail_info_success:state.user.userdetailinfosuccess
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
      //open_play_detail:state.player.open_play_detail
      //get_user_detail_info:(uid) => dispatch(getuserdetailinfo(uid))
      open_userdetail: (bool) => dispatch(openuserdetail(bool)),
      log_out: () => dispatch(logout())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Userinfo)