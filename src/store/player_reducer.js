import { PLAY_LOCALMUSIC,CAN_CHANGE_PLAY_STATUS,CANNT_CHANGE_PLAY_STATUS,OPEN_PLAY_DETAIL,PLAY_STATUS } from './actionType'

const defaultState = {
    playlocalIndex:0,
    playtype:1,//播放类型：1本地音乐   2在线播放
    canchangeplaystatus:false,
    open_play_detail:false,
    play_status:false,
    playingdata:{}
}
export default function player(state = defaultState, action) {
    if(action.type === PLAY_LOCALMUSIC ){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.playlocalIndex = action.index
        flag.playtype = action.play_type
        flag.playingdata = action.play_file
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
        flag.playingdata = action.playing_data
        return flag
    }
    else if(action.type === PLAY_STATUS){
        flag = JSON.parse(JSON.stringify(state))
        flag.play_status = action.play_status
        return flag
    }
    return state
}