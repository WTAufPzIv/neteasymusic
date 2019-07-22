import   React  from 'react'
import './playdetail.css'
import store from '../../store/index'
import { openplaydetail } from '../../store/actionCreators'
import { connect } from 'react-redux'
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
                vis:'none'
            }
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
    }
    componentWillUnmount(){
        console.log('卸载')
    }
    get_store_msg = () => {
        setTimeout(() => {
            if(this.props.open_play_detail){
                var that = this
                setTimeout(() => {
                    that.setState({
                    height:100,
                    width:100
                })
                }, 100); 
            }
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

            if(this.props.playingdata){
                this.setState({
                    musicinfo:this.props.playingdata
                })
            }
        },50)   
    }
    play = () => {
        
    }
    cancel_full_screen = () => {
        this.setState({
            height:0,
            width:0
            })
             setTimeout(this.props.cancelfullscreen(),150)    
    }
    render(){
        return(
             <div className = 'playdetail_body' style = {{'height':this.state.height+'%','width':this.state.width+'%','display':this.state.vis}}>
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
                                <div  style={{"WebkitBoxOrient": "vertical"}}><span>歌手：</span>{this.props.playingdata.artist ? this.props.playingdata.artist : '未知'}</div>
                                <div  style={{"WebkitBoxOrient": "vertical"}}><span>来源：</span>{this.props.playtype === 1 ? '本地音乐' : '在线播放'}</div>
                            </div>
                            <div className = 'play_detail_title_musicinfo_lrc'></div>
                        </div>
                    </div>
                    <div className = 'playdetail_view_comment'></div>
                </div>
            </div>
        );
    }
}
const mapstatetoprops = (state) => {
    return{
        play_status:state.player.play_status,
        open_play_detail:state.player.open_play_detail,
        playingdata:state.player.playingdetaildata || {
            album:'',
            artist:'',
        },
        play_type:state.player.playtype
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
      //open_play_detail:state.player.open_play_detail
      cancelfullscreen(){
            setTimeout(() => {
                const action = openplaydetail(false,{})
                dispatch(action)
            },150)
      }
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(PlayDetail)