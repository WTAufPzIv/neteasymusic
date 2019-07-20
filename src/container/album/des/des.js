import React from 'react'
import './des.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
class Des extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render = () => {
        return (
            <div className = 'album_detail_des'>
                {
                    this.props.get_album_detail?(
                        <p>{this.props.album_detail_data.album.description}</p>
                    ):(
                        <div>
                            <ProgressCircle color='white' size={100} />
                        </div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
        get_album_detail:state.album.getalbumdetail,
        album_detail_data:state.album.albumdetaildata,
    }
}
const mapdistoprops = (dispatch) => {
    return{
      
    }
}
export default  connect(mapstatetoprops,mapdistoprops)(Des)