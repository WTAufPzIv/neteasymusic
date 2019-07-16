import React from 'react'
import './video.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { asklikevideo } from '../../../store/actionCreators'
class Video extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            page:0
        }
    }
    componentDidMount(){
        this.props.ask_like_album(0)
    }
    render = () => {
        return(
            <div className = 'like_album_body'>

            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        get_like_video:state.like.getlikevideo,
        like_video_data:state.like.likevideodata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_like_video:(page) => dispatch(asklikevideo(page)),
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Video)