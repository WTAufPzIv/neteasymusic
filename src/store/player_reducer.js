import { DBCLICK_PLAY_LOCALMUSIC,CAN_CHANGE_PLAY_STATUS,CANNT_CHANGE_PLAY_STATUS,OPEN_PLAY_DETAIL,PLAY_STATUS,DBCLICK_PLAY_NETMUSIC } from './actionType'

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
    playingdetaildata:{}
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
    else if(action.type === DBCLICK_PLAY_NETMUSIC ){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.playIndex = action.index
        flag.playtype = 2
        flag.ids_net = action.ids
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
    else if(action.type === OPEN_PLAY_DETAIL){
        console.log('已调用')
        flag = JSON.parse(JSON.stringify(state))
        flag.open_play_detail = action.playdetail_status
        flag.playingdetaildata = action.playing_data
        return flag
    }
    else if(action.type === PLAY_STATUS){
        flag = JSON.parse(JSON.stringify(state))
        flag.play_status = action.play_status
        return flag
    }
    return state
}