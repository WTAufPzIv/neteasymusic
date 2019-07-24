import  React  from 'react'
import './LoginAndRegister.css'
import { connect } from 'react-redux'
import { openuser,login } from '../../store/actionCreators'
import { Input,Button,message  } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
const shell = window.require('electron').shell;
class LoginAndRegister extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            phone:'',
            psw:''
        }
    }
    componentWillMount(){

    }
    componentDidMount(){
        
    }
    closeusercomtainer = () => {
        this.props.close_user(false)
    }
    phoneinput = (e) => {
        // console.log(e.target.value)
        this.setState({
            phone:e.target.value
        })
    }
    pswinput = (e) => {
        this.setState({
            psw:e.target.value
        })
    }
    goregister = () => {
        shell.openExternal('https://music.163.com/');
    }
    gologin = () => {
        this.props.login(this.state.phone,this.state.psw)
    }
   
    render(){
        return(
            <div className = 'loginandregister_body'>
                <div className = 'loginandregister_head'>
                    <img  src = {require('./img/close.png')} onClick = { () => this.closeusercomtainer()}/>
                </div>
                <div className = 'loginandregister_logo'>Net Ease Cloud</div>
                <Input size="large" placeholder='手机号' style = {{'width':'70%'}} onChange = { (e) => this.phoneinput(e)}/>
                <Input.Password size="large" placeholder="密码" style = {{'width':'70%','marginTop':'20px'}} onChange = { (e) => this.pswinput(e)}/>
                <Button 
                    type="primary" 
                    block 
                    style = {{'width':'90%','marginTop':'30px','height':'40px','backgroundColor':'rgb(191,40,40)','border':'0px','color':'white'}}
                    disabled = {(this.state.phone.length === 11 && this.state.psw.length >= 1)?false:true}
                    onClick = { () => this.gologin()}
                >登录</Button>
                <Button 
                    type="Default" 
                    block 
                    style = {{'width':'90%','marginTop':'15px','height':'40px'}}
                    onClick = { () => this.goregister()}
                >注册</Button>
            </div>
        )
    }
}
const mapstatetoprops = (state) => {
    //console.log(state.user)
    return{
        login_status_code:state.user.loginstatuscode,
    }
  }
  const mapdistoprops = (dispatch) => {
    return{
        close_user: (bool) => dispatch(openuser(bool)),
        login : (phone,psw) => dispatch(login(phone,psw))
    }
  }
export default connect(mapstatetoprops,mapdistoprops)(LoginAndRegister)