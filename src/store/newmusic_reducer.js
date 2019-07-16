import { GET_NEWMUSIC } from './actionType'
import { GET_NEWALBUM } from './actionType'

const defaultState = {
   getnewmusic:false,
   newmusicdata:{},
   getnewalbum:false,
   newalbumdata:{},
}
export default function newmusic(state = defaultState, action) {
    if(action.type === GET_NEWMUSIC){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getnewmusic = action.get_newmusic
        flag.newmusicdata = action.newmusic_data
        return flag
    }
    else if(action.type === GET_NEWALBUM){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getnewalbum = action.get_newalbum
        flag.newalbumdata = action.newalbum_data
        return flag
    }
    return state
}