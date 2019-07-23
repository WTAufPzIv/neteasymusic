import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './searchtip.css'
import { askhotsearch, pushstack, gosearch, newtop, addsearchtime } from '../../store/actionCreators';
import { ProgressCircle } from 'react-desktop/windows';
import {  withRouter,NavLink } from 'react-router-dom'
class Searchtip extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text:'',
            word:''
        }
    }
    componentDidMount(){
        this.props.ask_hot_search()
    }
    search = (e) => {
        this.setState({
            word:e
        })
        // this.props.push_stack()
        this.props.go_search()
        this.props.addtime()
        // this.props.history.push('/search',{word:e})
    }
    render = () => {
        return (
            <div className = 'searchtip_body'>
                <div className = 'searchtip_head'>{this.props.text.replace(/\s*/g,"").length === 0?'热门搜索':'搜索建议'}</div>
                <div className = 'searchtip_hr'></div>
                {
                    this.props.text.replace(/\s*/g,"").length === 0?(
                        <div className = 'searchtip_hot'>
                            {
                                this.props.get_hot_search?this.props.hot_search_data.data.map((item) => {
                                    return (
                                        <div className = 'searchtip_hot_item'>
                                            {item.searchWord}
                                        </div>
                                    )
                                }):(
                                    <div><ProgressCircle color='white' size={20}/></div>
                                )
                            }
                        </div>
                    ):(
                        <div className = 'searchtip_res' style = {{'display':this.props.text.replace(/\s*/g,"").length === 0?'none':'flex'}}>
                            {
                                this.props.get_search_suggest &&  this.props.search_suggest_data.result.order?this.props.search_suggest_data.result.order.map((item) => {
                                    return (
                                            <div className = 'searchtip_suggest_item'>
                                                <div className = 'searchtip_suggest_head'>
                                                    {item}
                                                </div>
                                                <div className = 'searchtip_suggest_list'>
                                                    {
                                                        this.props.get_search_suggest && this.props.search_suggest_data.result[item]?this.props.search_suggest_data.result[item].map((itemm) => {
                                                            return (
                                                                <NavLink to = {{pathname:'/search',state:{word:itemm.name}}}><p onClick = { () => this.search(itemm.name)}>{itemm.name}</p></NavLink>
                                                            )
                                                        }):(
                                                        <div><ProgressCircle color='white' size={20}/></div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                    )
                                    
                                }):(
                                    <div><ProgressCircle color='white' size={20}/></div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    return{
        get_hot_search:state.search.gethotsearch,
        hot_search_data:state.search.hotsearchdata,
        text:state.search.Text,
        get_search_suggest:state.search.getsearchsuggest,
        search_suggest_data:state.search.searchsuggestdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_hot_search:() => dispatch(askhotsearch()),
        push_stack: () => dispatch(pushstack()),
        go_search:() => dispatch(gosearch()),
        new_top:() => dispatch(newtop()),
        addtime:() => dispatch(addsearchtime())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Searchtip)