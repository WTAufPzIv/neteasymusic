import React from 'react'
import './artist.css'
import { connect } from 'react-redux'
import { NavLink,withRouter } from 'react-router-dom'
class Artist extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.props.history.listen(() => this.next())
    }
    next = () => {
        // console.log(this.props.location)
        // if(this.props.location.state && this.props.Path === 'artist'){
        //     console.log(this.props.location.state)
        // }
        console.log(this.props.location.state)
        console.log(this.props.location.pathname)
    }
    componentWillMount(){

        
    }
    render = () => {
        return (
            <div>歌手详情页</div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return {
        Path:state.router.path
    }
}
const mapdistoprops = (dispatch) =>{
    return {

    }
}
export default connect(mapstatetoprops,mapdistoprops)(Artist)