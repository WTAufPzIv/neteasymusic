import React from 'react'
import './describe.css'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-desktop/windows';
class Describe extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }

    }
    componentWillMount(){

    }
    render(){
        return (
            <div className = 'artist_des_body'>
                {
                    this.props.get_artist_des?(
                        <div>
                            <p className = 'artist_des_brie'>{this.props.artist_des_data.briefDesc}</p>
                            {
                                this.props.artist_des_data.introduction.map((item) => {
                                    return (
                                        <div className = 'artist_des_item'>
                                            <span>{item.ti}</span>
                                            <p>{item.txt}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ):(
                        <div><ProgressCircle color='white' size={100}/></div>
                    )
                }
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return {
        get_artist_des:state.artist.getartistdes,
        artist_des_data:state.artist.artistdesdata
    }
}
const mapdistoprops = (dispatch) =>{
    return {
        
    }
}
export default connect(mapstatetoprops,mapdistoprops)(Describe)