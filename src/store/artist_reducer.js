import { GET_ARTIST } from './actionType'

const defaultState = {
   getartist:false,
   artistdata:{}
}
export default function artist(state = defaultState, action) {
    if(action.type === GET_ARTIST){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartist = action.get_artist
        flag.artistdata = action.artist_data
        return flag
    }
    return state
}