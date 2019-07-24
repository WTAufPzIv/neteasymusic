import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './artist.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
import { asksearchres, pushstack, goalbumdetail, goartistdetail } from '../../../store/actionCreators';
// import { } from '../../store/actionCreators';
class search_res_artist extends React.Component{
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
        if(this.props.get_search_res_artist){
            if(this.props.search_res_artist_data.result.artistCount > (this.state.page+1) * 50){
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
    go_artist = (data) => {
        this.props.push_stack()
        this.props.go_artist()
        this.props.history.push('/artist',{id:data})
    }
    render = () => {
        return (
            <div className = 'search_res_artist_body'>
                <div className = 'search_res_artist_hr'></div>
                <div className = 'search_res_artist_list'>
                    {
                        this.props.get_search_res_artist?this.props.search_res_artist_data.result.artists.map((item) => {
                            return (
                                <div onClick = { () => this.go_artist(item.id)}>
                                        <img src = {item.picUrl+ '?param=250y250'}></img>
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
                {
                        this.props.get_search_res_artist?(
                            <div className = 'search_res_artist_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.search_res_artist_data.result.artistCount <= (this.state.page+1) * 50?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
    console.log(state)
    return{
        get_search_res_artist:      state.search.getsearchresartist,
        search_res_artist_data:     state.search.searchresartistdata,
        word:                       state.search.Text
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_search_res:(e,page) => dispatch(asksearchres(e,100,page)),
        push_stack:() => dispatch(pushstack()),
        go_artist:() => dispatch(goartistdetail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(search_res_artist)