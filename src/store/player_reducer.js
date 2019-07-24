import { DBCLICK_PLAY_LOCALMUSIC,
    CAN_CHANGE_PLAY_STATUS,
    CANNT_CHANGE_PLAY_STATUS,
    OPEN_PLAY_DETAIL,
    PLAY_STATUS,
    DBCLICK_PLAY_NETMUSIC,
    SEND_PLAY_DETAIL,
    CLOSE_PLAY_DETAIL,
    LOCK_PLAYDETAIL,
    UNLOCK_PLAYDETAIL, 
    PLAY_LRC, 
    STOP_LRC,
    CURRENT,
    DRAG,
    GET_MUSIC_COMMEND,
    CLEAR_MUSIC_COMMENT
 } from './actionType'

const defaultState = {
    playIndex:0,
    playtype:1,//播放类型：1本地音乐   其他:在线播放
    canchangeplaystatus:false,
    open_play_detail:false,
    play_status:false,
    playdata_local:{},
    playlist_local:[],
    playdata_net:{},
    playlist_net:[],
    ids_net:[],
    playingdetaildata:{},
    netautoplay:false,
    lockplaydetailstatus:true,
    playlrc:false,
    currenttime:0,
    isdrap:false,
    getmusiccomment:false,
    musiccommentdata:{},
    musiccommentdataall:[],
    musiccommentdatahot:[]
}
export default function player(state = defaultState, action) {
    if(action.type === DBCLICK_PLAY_LOCALMUSIC ){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.playIndex = action.index
        flag.playtype = 1
        flag.playlist_local = action.play_file
        flag.playdata_local = action.play_file[action.index]
        return flag
    }
    else if(action.type === DRAG){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.isdrap = action.is_drag
        return flag
    }
    else if(action.type === LOCK_PLAYDETAIL ){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.lockplaydetailstatus = true
        return flag
    }
    else if(action.type === UNLOCK_PLAYDETAIL ){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.lockplaydetailstatus = false
        return flag
    }
    else if(action.type === DBCLICK_PLAY_NETMUSIC ){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.playIndex = action.index
        flag.playtype = 2
        flag.ids_net = action.ids
        flag.netautoplay = action.auto_play
        return flag
    }
    else if(action.type === CAN_CHANGE_PLAY_STATUS ){
        flag = JSON.parse(JSON.stringify(state))
        flag.canchangeplaystatus = true
        return flag
    }
    else if(action.type === CANNT_CHANGE_PLAY_STATUS ){
        flag = JSON.parse(JSON.stringify(state))
        flag.canchangeplaystatus = false
        return flag
    }
    else if(action.type === SEND_PLAY_DETAIL){
        flag = JSON.parse(JSON.stringify(state))
        flag.playingdetaildata = action.playing_data
        return flag
    }
    else if(action.type === OPEN_PLAY_DETAIL){
        flag = JSON.parse(JSON.stringify(state))
        flag.open_play_detail = true
        return flag
    }
    else if(action.type === CLOSE_PLAY_DETAIL){
        flag = JSON.parse(JSON.stringify(state))
        flag.open_play_detail = false
        return flag
    }
    else if(action.type === PLAY_STATUS){
        flag = JSON.parse(JSON.stringify(state))
        flag.play_status = action.play_status
        return flag
    }
    else if(action.type === PLAY_LRC){
        flag = JSON.parse(JSON.stringify(state))
        flag.playlrc = true
        return flag
    }
    else if(action.type === STOP_LRC){
        flag = JSON.parse(JSON.stringify(state))
        flag.playlrc = false
        return flag
    }
    else if(action.type === CURRENT){
        flag = JSON.parse(JSON.stringify(state))
        flag.currenttime = action.time
        return flag
    }
    else if(action.type === GET_MUSIC_COMMEND){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmusiccomment = action.get_music_comment
        flag.musiccommentdata = action.music_comment_data
        action.music_comment_data_hot.map((item) => {
            flag.musiccommentdatahot.push(item)
        })
        action.music_comment_data_all.map((item) => {
            flag.musiccommentdataall.push(item)
        })
        return flag
    }
    else if(action.type === CLEAR_MUSIC_COMMENT){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmusiccomment = false
        flag.musiccommentdata = {}
        flag.musiccommentdatahot = []
        flag.musiccommentdataall = []
        return flag
    }
    return state
}