import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './mv.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
import { asksearchres, pushstack, gomvdetail, } from '../../../store/actionCreators';
// import { } from '../../store/actionCreators';
class Mv extends React.Component{
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
        if(this.props.get_search_res_mv){
            if(this.props.search_res_mv_data.result.mvCount > (this.state.page+1) * 50){
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
    gotomvdetail = (id) =>{
        this.props.push_stack()
        this.props.go_mv()
        this.props.history.push("/mv",{id:id,type:0});
    }
    render = () => {
        return (
            <div className = 'search_res_mv_body'>
                <div className = 'search_res_mv_list'>
                    {
                        this.props.get_search_res_mv?this.props.search_res_mv_data.result.mvs.map((item) => {
                            return (
                                <div className = 'search_res_mv_list_item' onClick = { () => this.gotomvdetail(item.id)}>
                                    <img src = {item.cover+'?param=180y120'}></img>
                                    <span style={{"WebkitBoxOrient": "vertical"}}>{item.name}</span>
                                    <p>{item.artistName}</p>
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
                        this.props.get_search_res_mv?(
                            <div className = 'search_res_mv_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.search_res_mv_data.result.mvCount <= (this.state.page+1) * 50?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
        get_search_res_mv:       state.search.getsearchresmv,
        search_res_mv_data:      state.search.searchresmvdata,
        word:                       state.search.Text
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_search_res:(e,page) => dispatch(asksearchres(e,1014,page)),
        push_stack:() => dispatch(pushstack()),
        go_mv:() => dispatch(gomvdetail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Mv)