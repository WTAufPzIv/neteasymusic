import React from 'react'
import './artist.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { asklikeartist } from '../../../store/actionCreators'
class Artist extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){

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
        get_like_artist:state.like.getlikeartist,
        like_artist_data:state.like.likeartistdata,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_like_atist:(page) => dispatch(asklikeartist(page)),
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Artist)