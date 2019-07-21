import React from 'react'
import './mv.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { askartistmv, pushstack, gomvdetail } from '../../../store/actionCreators'
class artist_mv extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }

    }
    componentWillMount(){

    }
    chagepage = (a) => {
        console.log(this.state.page)
        let that = this
        if(a === 1){
            this.setState({
                page:that.state.page-1
            }, () => {
                that.props.ask_artist_mv(this.props.artist_music_data.artist.id ,this.state.page)
            })
        }
        else if(a === 2){
            console.log(this.state.page)
            this.setState({
                page:that.state.page+1
            }, () => {
                that.props.ask_artist_mv(this.props.artist_music_data.artist.id ,this.state.page)
            })
        }
    }
    gomvdetil = (id) => {
        this.props.push_stack()
        this.props.go_mv_detail()
        this.props.history.push("/mv",{id:id,type:0});
    }
    render(){
        return (
            <div className = 'artist_mv_body' ref = 'artist_mv_body'>
                <div className = 'artist_mv_list'>
                   {
                       this.props.get_artist_mv?this.props.artist_mv_data.mvs.map((item) => {
                           return (
                               <div className = 'artist_mv_list_item' onClick = {() => this.gomvdetil(item.id)}>
                                   <img src = {item.imgurl+'?param=300y200'}/>
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
                   this.props.get_artist_mv?(
                        <div className = 'artist_mv_page'>
                            <span style = {{'color':this.state.page === 0?'rgb(150,150,150)':'white'}} onClick = {this.state.page === 0?()=>{alert('已是第一页')}:() => this.chagepage(1)}>上一页</span>
                            <span style = {{'color':'rgb(150,150,150)'}}>{this.state.page+1}</span>
                            <span style = {{'color':this.props.artist_mv_data.hasMore === true?'white':'rgb(150,150,150)'}} onClick = {this.props.artist_mv_data.hasMore === true?() => this.chagepage(2):()=>{alert('已是最后一页')}}>下一页</span>
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
    console.log(state)
    return {
        get_artist_mv:state.artist.getartistmv,
        artist_mv_data:state.artist.artistmvdata,
        artist_music_data:state.artist.artistmusicdata,
    }
}
const mapdistoprops = (dispatch) =>{
    return {
        ask_artist_mv:(id,page) => dispatch(askartistmv(id,page)),
        push_stack:() => dispatch(pushstack()),
        go_mv_detail:() => dispatch(gomvdetail())
    }
}
export default connect(mapstatetoprops,mapdistoprops)(artist_mv)