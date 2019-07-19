import React from 'react';
import './artist.css'
import { connect } from 'react-redux'
import { askartistdata,goartistdetail } from '../../store/actionCreators'
import { ProgressCircle } from 'react-desktop/windows';
import { Pagination } from 'antd';
import { Alert } from 'antd';
import { NavLink,withRouter } from 'react-router-dom'
class Artist extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            type:1001,
            page:30,
            letter:''
        }
    }
    componentDidMount(){
        this.props.ask_artist_data(1001,100,0,'')
    }
    defaultclass = () => {
        this.setState({
            letter:''
        })
        this.props.ask_artist_data(this.state.type,100,0,'')
    }
    changeclass = (type) => {
        this.setState({
            type:type
        })
        this.props.ask_artist_data(type,100,0,this.state.letter)
    }
    changeclass1 = (letter) => {
        this.setState({
            letter:letter
        })
        this.props.ask_artist_data(this.state.type,100,0,letter)
    }
    goartist = (data) => {
        this.props.go_artist_detail()
        this.props.history.push('/artist',{id:data})
    }
    render(){
        return(
           <div className = 'artist_body'>
               <div className = 'artist_hr'></div>
               <div className = 'artist_head'>
                   <div className = 'artist_head_lan'>
                       <p>男歌手：{'\u00a0'}</p>
                       <p onClick = {() => this.changeclass(1001)} style = {{'color':this.state.type === 1001?'red':'rgb(160,160,160)'}}>华语男歌手 {'\u00a0'}|{'\u00a0'} </p>
                       <p onClick = {() => this.changeclass(2001)} style = {{'color':this.state.type === 2001?'red':'rgb(160,160,160)'}}>欧美男歌手{'\u00a0'} | {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass(6001)} style = {{'color':this.state.type === 6001?'red':'rgb(160,160,160)'}}>日本男歌手 {'\u00a0'}| {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass(7001)} style = {{'color':this.state.type === 7001?'red':'rgb(160,160,160)'}}>韩国男歌手 {'\u00a0'}| {'\u00a0'}</p>
                       <p onClick = {() => this.changeclass(4001)} style = {{'color':this.state.type === 4001?'red':'rgb(160,160,160)'}}>其他男歌手</p>
                   </div>
                   <div className = 'artist_head_type'>
                        <p>女歌手：{'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(1002)} style = {{'color':this.state.type === 1002?'red':'rgb(160,160,160)'}}> 华语女歌手{'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = {() => this.changeclass(2002)} style = {{'color':this.state.type === 2002?'red':'rgb(160,160,160)'}}>欧美女歌手{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(6002)} style = {{'color':this.state.type === 6002?'red':'rgb(160,160,160)'}}>日本女歌手{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(7002)} style = {{'color':this.state.type === 7002?'red':'rgb(160,160,160)'}}>韩国女歌手{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(4002)} style = {{'color':this.state.type === 4002?'red':'rgb(160,160,160)'}}>其他女歌手</p>
                   </div>
                   <div className = 'artist_head_type'>
                        <p>乐队/组合：{'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(1003)} style = {{'color':this.state.type === 1003?'red':'rgb(160,160,160)'}}>华语乐队/组合{'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = {() => this.changeclass(2003)} style = {{'color':this.state.type === 2003?'red':'rgb(160,160,160)'}}>欧美乐队/组合{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(6003)} style = {{'color':this.state.type === 6003?'red':'rgb(160,160,160)'}}>日本乐队/组合{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(7003)} style = {{'color':this.state.type === 7003?'red':'rgb(160,160,160)'}}>韩国乐队/组合{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = {() => this.changeclass(4003)} style = {{'color':this.state.type === 4003?'red':'rgb(160,160,160)'}}>其他乐队/组合</p>
                   </div>
                   <div className = 'artist_head_letter'>
                        <p>筛选：{'\u00a0'}</p>
                        <p onClick = { () => this.defaultclass()} style = {{'color':this.state.letter === ''?'red':'rgb(160,160,160)'}}>全部{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('A')} style = {{'color':this.state.letter === 'A'?'red':'rgb(160,160,160)'}}>A{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('B')} style = {{'color':this.state.letter === 'B'?'red':'rgb(160,160,160)'}}>B {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('C')} style = {{'color':this.state.letter === 'C'?'red':'rgb(160,160,160)'}}>C{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('D')} style = {{'color':this.state.letter === 'D'?'red':'rgb(160,160,160)'}}>D {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('E')} style = {{'color':this.state.letter === 'E'?'red':'rgb(160,160,160)'}}>E{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('F')} style = {{'color':this.state.letter === 'F'?'red':'rgb(160,160,160)'}}>F {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('G')} style = {{'color':this.state.letter === 'G'?'red':'rgb(160,160,160)'}}>G{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('H')} style = {{'color':this.state.letter === 'H'?'red':'rgb(160,160,160)'}}>H {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('I')} style = {{'color':this.state.letter === 'I'?'red':'rgb(160,160,160)'}}>I{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('J')} style = {{'color':this.state.letter === 'J'?'red':'rgb(160,160,160)'}}>J {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('K')} style = {{'color':this.state.letter === 'K'?'red':'rgb(160,160,160)'}}>K{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('L')} style = {{'color':this.state.letter === 'L'?'red':'rgb(160,160,160)'}}>L {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('M')} style = {{'color':this.state.letter === 'M'?'red':'rgb(160,160,160)'}}>M{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('N')} style = {{'color':this.state.letter === 'N'?'red':'rgb(160,160,160)'}}>N {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('O')} style = {{'color':this.state.letter === 'O'?'red':'rgb(160,160,160)'}}>O{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('P')} style = {{'color':this.state.letter === 'P'?'red':'rgb(160,160,160)'}}>P {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('Q')} style = {{'color':this.state.letter === 'Q'?'red':'rgb(160,160,160)'}}>Q{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('R')} style = {{'color':this.state.letter === 'R'?'red':'rgb(160,160,160)'}}>R {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('S')} style = {{'color':this.state.letter === 'S'?'red':'rgb(160,160,160)'}}>S{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('T')} style = {{'color':this.state.letter === 'T'?'red':'rgb(160,160,160)'}}>T {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('U')} style = {{'color':this.state.letter === 'U'?'red':'rgb(160,160,160)'}}>U{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('V')} style = {{'color':this.state.letter === 'V'?'red':'rgb(160,160,160)'}}>V {'\u00a0'}|{'\u00a0'} </p>
                        <p onClick = { () => this.changeclass1('W')} style = {{'color':this.state.letter === 'W'?'red':'rgb(160,160,160)'}}>W{'\u00a0'} | {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('X')} style = {{'color':this.state.letter === 'X'?'red':'rgb(160,160,160)'}}>X {'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('Y')} style = {{'color':this.state.letter === 'Y'?'red':'rgb(160,160,160)'}}>Y{'\u00a0'}| {'\u00a0'}</p>
                        <p onClick = { () => this.changeclass1('Z')} style = {{'color':this.state.letter === 'Z'?'red':'rgb(160,160,160)'}}>Z {'\u00a0'}|{'\u00a0'} </p>

                   </div>
               </div>
               <div className = 'artist_hr'></div>
               <div className = 'artist_list'>
                   {
                       this.props.get_artist?this.props.artist_data.data.artists.map((item) => {
                           return (
                               <div onClick = { () => this.goartist(item.id)}>
                                    <img src = {item.picUrl+ '?param=150y150'}></img>
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
               {/* <Pagination defaultCurrent={1} total={this.props.get_artist?this.props.artist_data.data.artists.length:60} style = {{'marginTop':'20px','marginBottom':'20px'}} pageSize = {30}/> */}
               <Alert message="由于网易云接口限制，只能显示最多100名歌手" type="warning" />
           </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
       get_artist:state.artist.getartist,
       artist_data:state.artist.artistdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_artist_data: (type,num,page,letter) => dispatch(askartistdata(type,num,page,letter)),
        go_artist_detail:() => dispatch(goartistdetail())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Artist)