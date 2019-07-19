import { GET_ARTIST,
    DELETE_ARTIST_DATA,
    GET_ARTIST_MUSIC,
    GET_ARTIST_MV,
    GET_ARTIST_ALBUM,
    GET_ARTIST_DES 
} from './actionType'

const defaultState = {
    getartist:false,
    artistdata:{},
    getartistmusic:false,
    artistmusicdata:{},
    getartistmv:false,
    artistmvdata:{},
    getartistalbum:false,
    artistalbumdata:{},
    getartistdes:false,
    artistdesdata:{}
}
export default function artist(state = defaultState, action) {
    if(action.type === GET_ARTIST){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartist = action.get_artist
        flag.artistdata = action.artist_data
        return flag
    }
    else if(action.type === DELETE_ARTIST_DATA){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartistmusic = false
        flag.artistmusicdata = {}
        flag.getartistmv = false
        flag.artistmvdata = {}
        flag.getartistalbum = false
        flag.artistalbumdata = {}
        flag.getartistdes = false
        flag.artistdesdata = {}
        return flag
    }
    else if(action.type === GET_ARTIST_MUSIC){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartistmusic = action.get_artist_music
        flag.artistmusicdata = action.artist_music_data
        return flag
    }
    else if(action.type === GET_ARTIST_MV){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartistmv = action.get_artist_mv
        flag.artistmvdata = action.artist_mv_data
        return flag
    }
    else if(action.type === GET_ARTIST_ALBUM){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartistalbum = action.get_artist_album
        flag.artistalbumdata = action.artist_album_data
        return flag
    }
    else if(action.type === GET_ARTIST_DES){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getartistdes = action.get_artist_des
        flag.artistdesdata = action.artist_des_data
        return flag
    }
    return state
}