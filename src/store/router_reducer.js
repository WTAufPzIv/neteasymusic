import { GO_MUSICLIST_DETAIL,GO_ARTIST_DETAIL, } from './actionType'

const defaultState = {
    path : ''
}
export default function router(state = defaultState, action) {
   if(action.type === GO_MUSICLIST_DETAIL){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.path = 'musiclist'
        return flag
   }
   else if(action.type === GO_ARTIST_DETAIL){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.path = 'artist'
        return flag
   }
    return state
}