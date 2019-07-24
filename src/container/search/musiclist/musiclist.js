import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './musiclist.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
import { asksearchres, pushstack, gomusiclistdeail } from '../../../store/actionCreators';
// import { } from '../../store/actionCreators';
class Musiclist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
        
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
                this.props.ask_search_res(this.props.word,that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_search_res_musiclist){
            if(this.props.search_res_musiclist_data.result.playlistCount > (this.state.page+1) * 50){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_search_res(this.props.word,that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    gotomusiclistdetail = (id) =>{
        this.props.push_stack()
        this.props.history.push('/musiclist', {id:id})
        this.props.go_musiclist()
    }
    render = () => {
        return (
            <div className = 'search_res_musiclist_body'>
                    {
                        this.props.get_search_res_musiclist?this.props.search_res_musiclist_data.result.playlists.map((item) => {
                            return (
                                <div className = 'search_res_musiclist_item' onClick = { () => this.gotomusiclistdetail(item.id)}>
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
                    {
                        this.props.get_search_res_musiclist?(
                            <div className = 'search_res_musiclist_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.search_res_musiclist_data.result.playlistCount <= (this.state.page+1) * 50?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
    // console.log(state)
    return{
        get_search_res_musiclist:   state.search.getsearchresmusiclist,
        search_res_musiclist_data:  state.search.searchresmusiclistdata,
        word:                       state.search.Text
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_search_res:(e,page) => dispatch(asksearchres(e,1000,page)),
        push_stack:() => dispatch(pushstack()),
        go_musiclist:() => dispatch(gomusiclistdeail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Musiclist)