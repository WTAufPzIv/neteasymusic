import { GET_MV } from './actionType'

const defaultState = {
   getmv:false,
   mvdata:{}
}
export default function mv(state = defaultState, action) {
    if(action.type === GET_MV){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getmv = action.get_mv
        flag.mvdata = action.mv_data
        return flag
    }
    return state
}