import React from 'react'
import './buy.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
import { askbuyalbum } from '../../../store/actionCreators'
class Buy extends React.Component{
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
        get_buy_album:state.like.getbuyalbum,
        buy_album_data:state.like.buyalbumdata
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_buy_album:(page) => dispatch(askbuyalbum(page))
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Buy)