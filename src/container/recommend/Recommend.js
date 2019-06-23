import React from 'react';
import './Recommend.css'
import { Redirect } from 'react-router-dom'
class Recommend extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render(){
        return(
            <div className = 'recommend_body'>
                {/* <Redirect to = '/video' /> */}
                发现音乐页面
            </div>
        )
    }
}
export default Recommend