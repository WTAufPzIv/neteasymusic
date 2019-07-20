import React from 'react'
import { connect } from 'react-redux'
import { askmvdetail,askmvurl ,deletemvdata} from '../../store/actionCreators'
import './mv.css'
import { ProgressCircle } from 'react-desktop/windows';
import { Redirect } from 'react-router-dom'
class Mv extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            id:0
        }
        this.props.history.listen(() => this.next())
    }
    next = () => {
        if(this.props.location.state && this.props.Path === 'mv'){
            console.log(this.props.location.state)
            console.log('成功了')
            this.props.delete_mv_data()
            this.props.ask_mv_detail(this.props.location.state.id)
            this.props.ask_mv_url(this.props.location.state.id)
            var that = this
            this.setState({
                id:that.props.location.state.id,
            })
        }
    }
    render = () => {
     
        return (
            <div className = 'mv_detail_body'>
                <Redirect to = '/mv/l'></Redirect>
                <div className = 'mv_detail_back'>返回</div>
                <div className = 'mv_detail_head'>
                    {
                        this.props.get_mv_detail?(
                            <div>
                                <p>{this.props.mv_detail_data.data.name}</p>
                                <span>播放量：{this.props.mv_detail_data.data.playCount}</span>
                            </div>
                        ):(
                            <span>加载中</span>
                        )
                    }
                </div>
                <div className = 'mv_detail_play'>
                    {
                        this.props.get_mv_url?(
                            <video src = {this.props.get_mv_url?this.props.mv_url_data.data.url:''} controls = {true}></video>
                        ):
                        <div><ProgressCircle
                        color='white'
                        size={100}
                        /></div>
                    }
                </div>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    console.log(state)
    return{
      get_mv_detail:state.mv.getmvdetail,
      mv_detail_data:state.mv.mvdetaildata,
      get_mv_url:state.mv.getmvurl,
      mv_url_data:state.mv.mvurldata,
      Path:state.router.path
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        ask_mv_detail : (id) => dispatch(askmvdetail(id)),
        ask_mv_url:(id) => dispatch(askmvurl(id)),
        delete_mv_data:() => dispatch(deletemvdata())
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(Mv)