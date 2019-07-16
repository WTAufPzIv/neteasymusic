import { GET_LIKE_ALBUM,GET_LIKE_ARTIST,GET_LIKE_VIDEO,GET_BUY_ALBUM } from './actionType'

const defaultState = {
    getlikealbum:false,
    likealbumdata:{},
    getlikeartist:false,
    likeartistdata:{},
    getlikevideo:false,
    likevideodata:{},
    getbuyalbum:false,
    buyalbumdata:{}
}
export default function like(state = defaultState, action) {
    if(action.type === GET_LIKE_ALBUM){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getlikealbum = action.get_like_album
        flag.likealbumdata = action.like_album_data
        return flag
    }
    else if(action.type === GET_LIKE_ARTIST){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getlikeartist = action.get_like_artist
        flag.likeartistdata = action.like_artist_data
        return flag
    }
    else if(action.type === GET_LIKE_VIDEO){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getlikevideo = action.get_like_video
        flag.likevideodata = action.like_video_data
        return flag
    }
    else if(action.type === GET_LIKE_VIDEO){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getlikevideo = action.get_like_video
        flag.likevideodata = action.like_video_data
        return flag
    }
    else if(action.type === GET_BUY_ALBUM){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getbuyalbum = action.get_buy_album
        flag.buyalbumdata = action.buy_album_data
        return flag
    }
    return state
}