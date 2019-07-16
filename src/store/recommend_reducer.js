import { GET_BANNER_DATA,GET_PERSONALIZED_PLAYLIAT,GET_PERSONALIZED_NEWSONG,GET_PERSONALIZED_MV } from './actionType'
const defaultState = {
    getbannerdata:false,
    bannerdata:{},
    getpersonalizedplaylist:false,
    personalizedplaylistdata:{},
    getpersonalizednewsong:false,
    personalizednewsongdata:{},
    getpersonalizedmv:false,
    personalizedmvdata:{}
}
export default function recommend(state = defaultState, action) {
    if(action.type === GET_BANNER_DATA){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getbannerdata = action.get_banner_data
        flag.bannerdata = action.banner_data
        return flag
    }
    else if(action.type === GET_PERSONALIZED_PLAYLIAT){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getpersonalizedplaylist = action.get_personalized_playlist
        flag.personalizedplaylistdata = action.personalized_playlist_data
        return flag
    }
    else if(action.type === GET_PERSONALIZED_NEWSONG){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getpersonalizednewsong = action.get_personalized_newsong
        flag.personalizednewsongdata = action.personalized_newsong_data
        return flag
    }
    else if(action.type === GET_PERSONALIZED_MV){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getpersonalizedmv = action.get_personalized_mv
        flag.personalizedmvdata = action.personalized_mv_data
        return flag
    }
    return state
}