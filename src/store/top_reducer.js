import { GET_TOP1,
    GET_TOP2,
    GET_TOP3,
    GET_TOP4,
    GET_TOP5,
    GET_TOP6, } from './actionType'

const defaultState = {
    gettop1:false,
    topdata1:{},
    gettop2:false,
    topdata2:{},
    gettop3:false,
    topdata3:{},
    gettop4:false,
    topdata4:{},
    gettop5:false,
    topdata5:{},
    gettop6:false,
    topdata6:{}
}
export default function top(state = defaultState, action) {
   if(action.type === GET_TOP1){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop1 = action.get_top
        flag.topdata1 = action.top_data
        return flag
   }
   else if(action.type === GET_TOP2){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop2 = action.get_top
        flag.topdata2 = action.top_data
        return flag
   }
   else if(action.type === GET_TOP3){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop3 = action.get_top
        flag.topdata3 = action.top_data
        return flag
    }
    else if(action.type === GET_TOP4){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop4 = action.get_top
        flag.topdata4 = action.top_data
        return flag
    }
    else if(action.type === GET_TOP5){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop5 = action.get_top
        flag.topdata5 = action.top_data
        return flag
    }
    else if(action.type === GET_TOP6){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.gettop6 = action.get_top
        flag.topdata6 = action.top_data
        return flag
    }
    return state
}