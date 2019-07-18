import { GET_PLAYLIST,GET_PLAYLIST_DETAIL,ADD_PLAYLIST_MUSIC_DETAIL,GET_USER_LIKE_MUSIC,GET_MUSICLIST_COMMENT,DELETE_DATA } from './actionType'
const defaultState = {
    getplaylist:false,
    playlistdata:{},
    getplaylistdetail:false,
    playlistdetaildata:{},
    playlistmusicdetaildata:[],
    getplaylistmusicdetail:false,
    getuserlikemusic:false,
    userlikemusicdata:{},
    getmusiclistcomment:false,
    musiclistcommentdata:{},
    musiclistcommentdatahot:[],
    musiclistcommentdataall:[]
}
export default function playlist(state = defaultState, action){
    if(action.type === GET_PLAYLIST){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getplaylist = action.get_playlist
        flag.playlistdata = action.playlist_data
        return flag
    }
    else if(action.type === GET_PLAYLIST_DETAIL){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getplaylistdetail = action.get_play_list_detail
        flag.playlistdetaildata = action.play_list_detail_data
        return flag
    }
    else if(action.type === ADD_PLAYLIST_MUSIC_DETAIL){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.playlistmusicdetaildata = action.playlist_music_detail_data
        flag.getplaylistmusicdetail = action.get_playlist_music_detail
        return flag
    }
    else if(action.type === GET_USER_LIKE_MUSIC){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getuserlikemusic = action.get_user_like_music
        flag.userlikemusicdata = action.user_like_music_data
        return flag
    }
    else if(action.type === GET_MUSICLIST_COMMENT){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getmusiclistcomment = action.get_musiclist_comment
        flag.musiclistcommentdata = action.musiclist_comment_data
        action.musiclist_comment_data_all.map((item) => {
            flag.musiclistcommentdataall.push(item)
        })
        action.musiclist_comment_data_hot.map((item) => {
            flag.musiclistcommentdatahot.push(item)
        })
        return flag
    }
    else if(action.type === DELETE_DATA){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getmusiclistcomment = false
        flag.musiclistcommentdata = {}
        flag.musiclistcommentdataall = []
        flag.musiclistcommentdatahot = []
        return flag
    }
    return state
}