import  React  from 'react'
import './usermsg.css'
import { connect } from 'react-redux'
import { Button  } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import store from '../../store/index'
class Usermsg extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            position_left:'100%'
        }
        store.subscribe(this.storesub)
        
    }
    componentDidMount(){
        
    }
    close = () => {
        this.props.open_userdetail(false)
    }
    storesub = () => {
        setTimeout(() => {
            if(this.props.open_msg_container){
                this.setState({
                    position_left:'0%'
                })
            }
        },50)
    }
    render(){
        return (
            <div className = 'usermsg_body' style = {{'left':this.state.position_left}}>
                
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    // console.log(state)
    return{
       open_msg_container:state.user.openmsgcontainer
    }
  }
  const mapdistoprops = (dispatch) => {
    return{

    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Usermsg)