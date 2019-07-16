import { GET_DAYSONG } from './actionType'

const defaultState = {
   getdaysong:false,
   daysongdata:{}
}
export default function day(state = defaultState, action) {
    if(action.type === GET_DAYSONG){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getdaysong = action.get_daysong
        flag.daysongdata = action.daysong_data
        return flag
    }
    return state
}