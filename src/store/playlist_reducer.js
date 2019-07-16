import { GET_PLAYLIST } from './actionType'
const defaultState = {
    getplaylist:false,
    playlistdata:{}
}
export default function playlist(state = defaultState, action){
    if(action.type === GET_PLAYLIST){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getplaylist = action.get_playlist
        flag.playlistdata = action.playlist_data
        return flag
    }
    return state
}