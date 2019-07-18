import { GET_USER_PLAYLIST } from './actionType'

const defaultState = {
    getuserplaylist:false,
    userplaylistdata:{},
}
export default function userplaylist(state = defaultState, action) {
    if(action.type === GET_USER_PLAYLIST){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getuserplaylist = action.get_user_playlist
        flag.userplaylistdata = action.user_playlist_data
        return flag
    }
    return state
}
