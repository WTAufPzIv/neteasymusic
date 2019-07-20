import React from 'react';
import { connect } from 'react-redux'
import { askmv,gomvdetail, pushstack } from '../../store/actionCreators'
import './video.css'
import { ProgressCircle } from 'react-desktop/windows';
import { Redirect } from 'react-router-dom'
class Video extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type:'全部',
            order:'上升最快',
            page:0
        }
    }
    componentWillMount(){
        this.props.ask_mv('全部',0,'上升最快')
    }
    changeclass = (e) => {
        this.setState({
            type:e,
            page:0
        })
        this.props.ask_mv(e,0,this.state.order)
    }
    changeclass1 = (e) => {
        this.setState({
            order:e,
            page:0
        })
        this.props.ask_mv(this.state.type,0,e)
    }
    chagepage = (a) => {
        var that = this
        if(a === 1){
            this.setState({
                page:that.state.page - 1
            })
        }
        else if(a === 2){
            this.setState({
                page:that.state.page + 1
            })
        }
        setTimeout(() => {
            this.props.ask_mv(this.state.type,this.state.page*30,this.state.order)
        })
        this.refs.mv_body.scrollTo(0,0);
    }
    gomvdetail = (id) => {
        this.props.push_stack()
        this.props.go_mv_detail()
        this.props.history.push("/mv",{id:id});
    }
    render(){
        
        return(
            <div className = 'mv_body' ref = 'mv_body'>
                <div className = 'mv_head'>
                   <div className = 'mv_head_lan'>
                       <p>地区：{'\u00a0'}</p>
                       <p onClick = {() => this.changeclass('全部')} style = {{'color':this.state.type === '全部'?'red':'rgb(160,160,160)'}}>全部 {'\u00a0'}|{'\u00a0'} </p>
                       <p onClick = {() => this.changeclass('内地')} style = {{'color':this.state.type === '内地'?'red':'rgb(160,160,160)'}}>内地{'\u00a0'} | {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass('港台')} style = {{'color':this.state.type === '港台'?'red':'rgb(160,160,160)'}}>港台 {'\u00a0'}| {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass('欧美')} style = {{'color':this.state.type === '欧美'?'red':'rgb(160,160,160)'}}>欧美 {'\u00a0'}| {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass('日本')} style = {{'color':this.state.type === '日本'?'red':'rgb(160,160,160)'}}>日本</p>
                   </div>
                   <div className = 'mv_head_letter'>
                        <p>排序：{'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('上升最快')} style = {{'color':this.state.order === '上升最快'?'red':'rgb(160,160,160)'}}>上升最快{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('最新')} style = {{'color':this.state.order === '最新'?'red':'rgb(160,160,160)'}}>最新{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('最热')} style = {{'color':this.state.order === '最热'?'red':'rgb(160,160,160)'}}>最热 {'\u00a0'}|{'\u00a0'} </p>
                   </div>
               </div>
               <div className = 'mv_hr'></div>
               <div className = 'mv_list'>
                   {
                       this.props.get_mv?this.props.mv_data.data.data.map((item) => {
                           return (
                               <div className = 'mv_list_item' onClick = { () => this.gomvdetail(item.id)}>
                                   <img src = {item.cover+'?param=300y200'}/>
                                   <p  style={{"WebkitBoxOrient": "vertical"}}>{item.name}</p>
                                   <span  style={{"WebkitBoxOrient": "vertical"}}>{item.artistName}</span>
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
                   this.props.get_mv?(
                        <div className = 'mv_page'>
                            <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {this.state.page === 0?()=>{alert('已是第一页')}:() => this.chagepage(1)}>上一页</span>
                            <span style = {{'color':'rgb(150,150,150)'}}>{this.state.page+1}</span>
                            <span style = {{'color':this.props.mv_data.data.hasMore === true?'white':'rgb(150,150,150)'}} onClick = {this.props.mv_data.data.hasMore === true?() => this.chagepage(2):()=>{alert('已是最后一页')}}>下一页</span>
                        </div>
                   ):
                   (
                       <div></div>
                   )
               }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
      get_mv:state.mv.getmv,
      mv_data:state.mv.mvdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_mv : (type,page,order) => dispatch(askmv(type,page,order)),
        go_mv_detail:() => dispatch(gomvdetail()),
        push_stack:() => dispatch(pushstack())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Video)