import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import './lrc.css'
import { ProgressCircle } from 'react-desktop/windows';
import { withRouter } from 'react-router-dom'
// import { } from '../../store/actionCreators';
class Lrc extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }
   
    render = () => {
        return (
            <div className = 'search_album_body'>歌词</div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
       
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Lrc)