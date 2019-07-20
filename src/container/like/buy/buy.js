import React from 'react'
import './buy.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { askbuyalbum, pushstack } from '../../../store/actionCreators'
import moment from 'moment'
class Buy extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
    }
    componentDidMount(){
        this.props.ask_buy_album(0)
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
                this.props.ask_buy_album(that.state.page)
            })
            
        }
    }
    next = () => {
        var that=  this
        if(this.props.get_buy_album){
            if(this.props.buy_album_data.data.total>30*(this.state.page+1)){
                this.setState({
                    page:that.state.page + 1
                },() => {
                    this.props.ask_buy_album(that.state.page)
                })
            }
            else{
                alert('已经是最后一页')
            }
        }
    }
    goalbumdetail = (id) => {
        this.props.push_stack()
        this.props.history.push('/album', {id:id})
        this.props.go_album()
    }
    render = () => {
        return(
            <div className = 'buy_album_body'>
                <div className = 'buy_album_head'>购买的数字专辑</div>
                <div className = 'buy_album_hr'></div>
                <div className = 'buy_album_list'>
                    {
                        this.props.get_buy_album?this.props.buy_album_data.data.paidAlbums.map((item) => {
                            return (
                                <div className = 'buy_album_list_item' onClick = {() => this.goalbumdetail(item.id)}>
                                    <img src = {item.cover+'?param=175y175'}></img>
                                    <span style={{"WebkitBoxOrient": "vertical"}}>{item.albumName}</span>
                                    <div>{item.artists.slice(0.2).map((itemm) => {
                                        return(
                                            <p style={{"WebkitBoxOrient": "vertical"}}>{itemm.name}{' '}</p>
                                        )
                                    })}
                                    {item.artists.length >= 3?'...':''}</div>
                                    <p >购买时间:{moment(parseInt(item.paidTime)).format("YYYY年MM月DD日")}</p>
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
                        this.props.get_buy_album?(
                            <div className = 'buy_album_page'>
                                <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {() => this.pre()}>上一页</span>
                                <span>{this.state.page+1}</span>
                                <span style = {{'color':this.props.buy_album_data.data.total<=30*(this.state.page+1)?'rgb(150,150,150)':'white'}} onClick = {() => this.next()}>下一页</span>
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
    
    return{
        get_buy_album:state.like.getbuyalbum,
        buy_album_data:state.like.buyalbumdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_buy_album:(page) => dispatch(askbuyalbum(page)),
        push_stack:() => dispatch(pushstack())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Buy)