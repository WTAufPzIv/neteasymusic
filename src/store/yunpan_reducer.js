import { GET_YUNPAN } from './actionType'

const defaultState = {
   getyunpan:false,
   yunpandata:{}
}
export default function yunpan(state = defaultState, action) {
    if(action.type === GET_YUNPAN){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getyunpan = action.get_yunpan
        flag.yunpandata = action.yunpan_data
        return flag
    }
    return state
}