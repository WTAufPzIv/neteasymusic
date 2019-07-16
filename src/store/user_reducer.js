import { LOGIN_STATUS,OPEN_USER, LOGIN_STATUS_CODE, LOGIN_SUCCESS,OPEN_USER_DETAIL ,GET_USER_DETAIL_INFO, OPEN_MSG_CONTAINER } from './actionType'

const defaultState = {
    loginstatus:false,
    user:{},
    openloginandregister:false,
    openuserdetail:false,
    openmsg:false,
    openuserinfo:false,
    loginstatuscode:200,
    userdetailinfo:{},
    userdetailinfosuccess:false,
    openmsgcontainer:false
}
export default function user(state = defaultState, action) {
    if(action.type === LOGIN_STATUS){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.loginstatus = action.login_status
        flag.user = action.userinfo
        return flag
    }
    else if(action.type === OPEN_USER){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.openloginandregister = action.open_user
        return flag
    }
    else if(action.type === LOGIN_STATUS_CODE){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.loginstatuscode = action.code
        return flag
    }
    else if(action.type === LOGIN_SUCCESS){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.loginstatuscode = 200
        return flag
    }
    else if(action.type === OPEN_USER_DETAIL){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.openuserdetail = action.open_user_detail
        return flag
    }
    else if(action.type === GET_USER_DETAIL_INFO){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.userdetailinfo = action.user_detail_info
        flag.userdetailinfosuccess = action.user_detail_info_success
        return flag
    }
    else if(action.type === OPEN_MSG_CONTAINER){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.openmsgcontainer = action.open_msg_container
        return flag
    }
    return state
}