import React from 'react';
import './playlist.css'
import { Select,Pagination } from 'antd';
import { connect } from 'react-redux'
import { askplaylist,gomusiclistdeail, pushstack } from '../../store/actionCreators'
import "antd/lib/style/themes/default.less"
import './index.less'
import { ProgressCircle } from 'react-desktop/windows';
const { Option, OptGroup } = Select;
class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            classname:'全部',
            page:1
        }
    }
    componentWillMount(){
        this.props.ask_playlist(this.state.classname,1,30)
    }
    handleChange = (e) => {
        // console.log(e)
        this.setState({
            classname:e
        })
        this.props.ask_playlist(e,1,30)
    }
    changepage = (e) => {
        // console.log(e)
        this.props.ask_playlist(this.state.classname,e,30)
    }
    gotoplaylist = (id) => {
        this.props.push_stack()
        this.props.history.push("/musiclist",{id:id,type:'other',position:'right'});
        this.props.go_musiclist_detail()
    }
    render(){
        return(
           <div className = 'playlist_body'>
               <div className = 'playlist_head'>
                    <Select defaultValue="全部" style={{ width: 200,'color':'red' }} onChange={ (value) => this.handleChange(value)} dropdownClassName = 'playlist_head_dropdown'>
                        <OptGroup label="全部分类">
                            <Option value="全部">全部分类</Option>
                        </OptGroup>
                        <OptGroup label="语种">
                            <Option value="华语">华语</Option>
                            <Option value="欧美">欧美</Option>
                            <Option value="日语">日语</Option>
                            <Option value="韩语">韩语</Option>
                            <Option value="粤语">粤语</Option>
                            <Option value="小语种">小语种</Option>
                        </OptGroup>
                        <OptGroup label="风格">
                            <Option value="流行">流行</Option>
                            <Option value="摇滚">摇滚</Option>
                            <Option value="民谣">民谣</Option>
                            <Option value="电子">电子</Option>
                            <Option value="舞曲">舞曲</Option>
                            <Option value="说唱">说唱</Option>
                            <Option value="轻音乐">轻音乐</Option>
                            <Option value="爵士">爵士</Option>
                            <Option value="乡村">乡村</Option>
                            <Option value="古典">古典</Option>
                            <Option value="民族">民族</Option>
                            <Option value="英伦">英伦</Option>
                            <Option value="金属">金属</Option>
                            <Option value="朋克">朋克</Option>
                            <Option value="蓝调">蓝调</Option>
                            <Option value="雷鬼">雷鬼</Option>
                            <Option value="拉丁">拉丁</Option>
                            <Option value= 'Soul'>Soul</Option>
                            <Option value="古风">古风</Option>
                            <Option value="后摇">后摇</Option>
                        </OptGroup>
                        <OptGroup label="场景">
                            <Option value="清晨">清晨</Option>
                            <Option value="夜晚">夜晚</Option>
                            <Option value="学习">学习</Option>
                            <Option value="工作">工作</Option>
                            <Option value="午休">午休</Option>
                            <Option value="下午茶">下午茶</Option>
                            <Option value="地铁">地铁</Option>
                            <Option value="驾车">驾车</Option>
                            <Option value="运动">运动</Option>
                            <Option value="旅行">旅行</Option>
                            <Option value="散步">散步</Option>
                            <Option value="酒吧">酒吧</Option>
                        </OptGroup>
                        <OptGroup label="情感">
                            <Option value="怀旧">怀旧</Option>
                            <Option value="清新">清新</Option>
                            <Option value="浪漫">浪漫</Option>
                            <Option value="性感">性感</Option>
                            <Option value="伤感">伤感</Option>
                            <Option value="治愈">治愈</Option>
                            <Option value="放松">放松</Option>
                            <Option value="孤独">孤独</Option>
                            <Option value="感动">感动</Option>
                            <Option value="兴奋">兴奋</Option>
                            <Option value="快乐">快乐</Option>
                            <Option value="安静">安静</Option>
                            <Option value="思念">思念</Option>
                        </OptGroup>
                        <OptGroup label="主题">
                            <Option value="影视原声">影视原声</Option>
                            <Option value="ACG">ACG</Option>
                            <Option value="儿童">儿童</Option>
                            <Option value="校园">校园</Option>
                            <Option value="游戏">游戏</Option>
                            <Option value="70后">70后</Option>
                            <Option value="80后">80后</Option>
                            <Option value="90后">90后</Option>
                            <Option value="网络歌曲">网络歌曲</Option>
                            <Option value="KTV">KTV</Option>
                            <Option value="经典">经典</Option>
                            <Option value="翻唱">翻唱</Option>
                            <Option value="吉他">吉他</Option>
                            <Option value="钢琴">钢琴</Option>
                            <Option value="器乐">器乐</Option>
                            <Option value="榜单">榜单</Option>
                            <Option value="00后">00后</Option>
                        </OptGroup>
                    </Select>,
               </div>
               <div className = 'playlist_body'>
                       {
                           this.props.get_playlist?this.props.playlist_data.data.playlists.map((item) => {
                               return (
                                   <div className = 'playlist_item' onClick = { () => this.gotoplaylist(item.id)}>
                                       <img src = {item.coverImgUrl+ '?param=180y180'}></img>
                                       <div>{item.name}</div>
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
                <div class = 'playlist_pagination'>
                    <Pagination defaultCurrent={1} total={this.props.get_playlist?this.props.playlist_data.data.total:1} pageSize = {30} onChange = {(e) => this.changepage(e)}/>
                </div>
                
           </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
      get_playlist:state.playlist.getplaylist,
      playlist_data:state.playlist.playlistdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_playlist : (classname,page,num) => dispatch(askplaylist(classname,page,num)),
        go_musiclist_detail:() => dispatch(gomusiclistdeail()),
        push_stack: () => dispatch(pushstack())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Playlist)