import { 
    PLAY_LOCALMUSIC,
    CAN_CHANGE_PLAY_STATUS,
    CANNT_CHANGE_PLAY_STATUS,
    OPEN_PLAY_DETAIL,
    PLAY_STATUS,
    LOGIN_STATUS,
    OPEN_USER,
    LOGIN_STATUS_CODE,
    LOGIN_SUCCESS,
    OPEN_USER_DETAIL,
    GET_USER_DETAIL_INFO,
    OPEN_MSG_CONTAINER,
    GET_BANNER_DATA,
    GET_PERSONALIZED_PLAYLIAT,
    GET_PERSONALIZED_NEWSONG,
    GET_PERSONALIZED_MV,
    GET_PLAYLIST,
    GET_TOP1,
    GET_TOP2,
    GET_TOP3,
    GET_TOP4,
    GET_TOP5,
    GET_TOP6,
    GET_ARTIST,
    GET_NEWMUSIC,
    GET_NEWALBUM,
    GET_DAYSONG,
    GET_MV,
    GET_YUNPAN,
    GET_LIKE_ALBUM,
    GET_LIKE_ARTIST,
    GET_LIKE_VIDEO,
    GET_BUY_ALBUM,
    GET_USER_PLAYLIST,
    GET_PLAYLIST_DETAIL,
    ADD_PLAYLIST_MUSIC_DETAIL,
    GET_USER_LIKE_MUSIC,
    GO_MUSICLIST_DETAIL,
    GO_ARTIST_DETAIL,
    GET_MUSICLIST_COMMENT,
    DELETE_DATA,
    DELETE_ARTIST_DATA,
    GET_ARTIST_MUSIC,
    GET_ARTIST_MV,
    GET_ARTIST_ALBUM,
    GET_ARTIST_DES,
    GO_ALBUM_DETAIL,
    GET_ALBUM_DETAIL,
    GET_ALBUM_COMMENT,
    GET_ALBUM_DYNAMIC,
    DELETE_ALBUM_DATA,
    NEW_TOP,
    PUSH_STACK,
    POP_STACK ,
    CLEAR_STACK,
    GET_MV_DETAIL,
    GET_MV_URL,
    GO_MV_DETAIL,
    GET_MV_COMMENT,
    DELETE_MV_COMMENT,
    OPEN_SEARCH_TIP,
    GET_HOT_SEARCH,
    INPUT_SEARCH,
    GET_SEARCH_SUGGEST,
    GO_SEARCH,
    GET_SEARCH_RES_MUSIC,
    GET_SEARCH_RES_ARTIST,
    GET_SEARCH_RES_VEDIO ,
    GET_SEARCH_RES_MUSICLIST,
    GET_SEARCH_RES_ALBUM  ,
    GET_SEARCH_RES_LRC ,
    GET_SEARCH_RES_MV,
    ADD_SEARCH_TIME,
    DELETE_SEARCH_TIME,
    CLEAR_SEARCH_TIME
} from "./actionType";
import axios from 'axios'
import { message  } from 'antd'
import moment from 'moment'
export const play_localmusic = (index,playtype,files) => ({
    type:PLAY_LOCALMUSIC,
    index:index,
    play_type:playtype,
    play_file:files
})
export const canchangeplaystatus = () => ({
    type:CAN_CHANGE_PLAY_STATUS,
})
export const canntchangeplaystatus = () => ({
    type:CANNT_CHANGE_PLAY_STATUS,
})
export const openplaydetail = (Bool,musicdata) => {
    return (dispatch) => {
        dispatch({
            type:OPEN_PLAY_DETAIL,
            playdetail_status:Bool,
            playing_data:musicdata
        })
        dispatch({
            type:OPEN_USER_DETAIL,
            open_user_detail:false
        })
    }
}
export const playstatus = (Bool) => ({
    type:PLAY_STATUS,
    play_status:Bool
})
export const getloginstatus = () => {
    return (dispatch) => {
        return axios.post('http://localhost:9093/login/status')
        .then(res => {
            // console.log(666666)
            // console.log(res)
            dispatch({
                type:LOGIN_STATUS,
                login_status:true,
                userinfo:res
            })
            axios.post('http://localhost:9093/user/detail',{uid:res.data.profile.userId})
            .then(ress => {
                dispatch({
                    type:GET_USER_DETAIL_INFO,
                    user_detail_info:ress,
                    user_detail_info_success:true
                })
            })
        })
        .catch(err => {
            dispatch({
                type:LOGIN_STATUS,
                login_status:false,
                userinfo:{}
            })
        })
    }
}
export const openuser = (Bool) => {
    return {
        type:OPEN_USER,
        open_user:Bool
    }
}
export const login = (phone, psw) => {
    return (dispatch) => {
        let time = Date.parse(new Date())
        axios.post('http://localhost:9093/login/cellphone',{phone:phone,password:psw,timestamp:time})
        .then(res => {
            message.success('登陆成功');
            dispatch({
                type:OPEN_USER,
                open_user:false
            })
            axios.post('http://localhost:9093/login/status')
            .then(ress => {
                dispatch({
                    type:LOGIN_STATUS,
                    login_status:true,
                    userinfo:ress
                })
                // console.log(ress)
                axios.post('http://localhost:9093/user/detail',{uid:ress.data.profile.userId})
                .then(resss => {
                    dispatch({
                        type:GET_USER_DETAIL_INFO,
                        user_detail_info:resss,
                        user_detail_info_success:true
                    })
                })
                .catch(errrr => {
                    console.log(errrr)
                })
            })
            .catch(errr => {
                console.log(errr)
            })
            dispatch({
                type:LOGIN_SUCCESS,
            })
        })
        .catch(err => {
            dispatch({
                type:LOGIN_STATUS,
                login_status:false,
                userinfo:{}
            })
            console.log(err.response.status)
            if(err.response.status === 501){
                console.log('需要注册')
                dispatch({
                    type:LOGIN_STATUS_CODE,
                    code:err.response.status,
                })
                message.error('该手机号还没有注册');
            }
            else if(err.response.status === 502){
                console.log('密码错误')
                dispatch({
                    type:LOGIN_STATUS_CODE,
                    code:err.response.status,
                })
                message.error('密码输入错误');
            }
            else if(err.response.status === 509){
                console.log('密码错误次数达到限制')
                dispatch({
                    type:LOGIN_STATUS_CODE,
                    code:err.response.status,
                })
                message.error('密码错误次数达到限制，请前往网易云音乐官网找回密码');
            }
        })
    }
}
export const openuserdetail = (Bool) => {
    return dispatch => {
        dispatch({
            type:OPEN_USER_DETAIL,
            open_user_detail:Bool
        })
        dispatch({
            type:OPEN_PLAY_DETAIL,
            playdetail_status:false,
            playing_data:{}
        })
    }
}
export const getuserdetailinfo = (uid) => {
    return dispatch => {
        axios.post('http://localhost:9093/user/detail',{uid:uid})
        .then(res => {
            dispatch({
                type:GET_USER_DETAIL_INFO,
                user_detail_info:res
            })
        })
    }
}
export const openmascontainer = (Bool) => {
    return dispatch => {
        dispatch({
            type:OPEN_MSG_CONTAINER,
            open_msg_container:Bool
        })
        dispatch({
            type:OPEN_PLAY_DETAIL,
            playdetail_status:false,
            playing_data:{}
        })
    }
}
export const logout = () => {
    return dispatch => {
        axios.post('http://localhost:9093/logout')
        .then(res => {
            dispatch({
                type:LOGIN_STATUS,
                login_status:false,
                userinfo:{}
            })
            dispatch({
                type:OPEN_MSG_CONTAINER,
                open_msg_container:false
            })
            dispatch({
                type:OPEN_USER_DETAIL,
                open_user_detail:false
            })
            dispatch({
                type:GET_USER_DETAIL_INFO,
                user_detail_info:{},
                user_detail_info_success:false
            })
        })
        .catch(err => {
            console.log('退出登录炸了')
        })
    }
}
export const askbannerdata = () => {
    return dispatch => {
        axios.post('http://localhost:9093/banner')
        .then(res => {
            dispatch({
                type:GET_BANNER_DATA,
                get_banner_data:true,
                banner_data:res
            })
        })
        .catch(err => {
            dispatch({
                type:GET_BANNER_DATA,
                get_banner_data:false,
                banner_data:{}
            })
        })
    }
}
export const askpersonalizedplaylistdata = () => {
    return dispatch => {
        // axios.post('http://localhost:9093/personalized?timestamp='+moment(Date().now).valueOf())
        axios.post('http://localhost:9093/personalized')
        .then(res => {
            dispatch({
                type:GET_PERSONALIZED_PLAYLIAT,
                get_personalized_playlist:true,
                personalized_playlist_data:res
            })
        })
        .catch(err => {
            dispatch({
                type:GET_PERSONALIZED_PLAYLIAT,
                get_personalized_playlist:false,
                personalized_playlist_data:{}
            })
        })
    }
}
export const askpersonalizednewsongdata = () => {
    return dispatch => {
        axios.post('http://localhost:9093/personalized/newsong')
        .then(res => {
            dispatch({
                type:GET_PERSONALIZED_NEWSONG,
                get_personalized_newsong:true,
                personalized_newsong_data:res
            })
        })
        .catch(err => {
            dispatch({
                type:GET_PERSONALIZED_NEWSONG,
                get_personalized_newsong:false,
                personalized_newsong_data:{}
            })
        })
    }
}
export const askpersonalizedmvdata = () => {
    return dispatch => {
        axios.post('http://localhost:9093/personalized/mv')
        .then(res => {
            dispatch({
                type:GET_PERSONALIZED_MV,
                get_personalized_mv:true,
                personalized_mv_data:res
            })
        })
        .catch(err => {
            dispatch({
                type:GET_PERSONALIZED_MV,
                get_personalized_mv:false,
                personalized_mv_data:{}
            })
        })
    }
}
export const askplaylist = (classname,page,num) => {
    return dispatch => {
        axios.post('http://localhost:9093/top/playlist?limit='+num+'&cat='+classname+'&offset='+num*page)
        .then(res => {
            dispatch({
                type:GET_PLAYLIST,
                get_playlist:true,
                playlist_data:res
            })
        })
    }
}
export const asktopdata1 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/top/list?idx=3')
        .then(res => {
            dispatch({
                type:GET_TOP1,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const asktopdata2 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/top/list?idx=0')
        .then(res => {
            dispatch({
                type:GET_TOP2,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const asktopdata3 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/top/list?idx=2')
        .then(res => {
            dispatch({
                type:GET_TOP3,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const asktopdata4 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/top/list?idx=1')
        .then(res => {
            dispatch({
                type:GET_TOP4,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const asktopdata5 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/playlist/detail?id=2809513713')
        .then(res => {
            dispatch({
                type:GET_TOP5,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const asktopdata6 = () => {
    return dispatch => {
        axios.post('http://localhost:9093/toplist/artist')
        .then(res => {
            dispatch({
                type:GET_TOP6,
                get_top:true,
                top_data:res
            })
        })
    }
}
export const askartistdata = (type,num,page,letter) => {
    return dispatch => {
        axios.post('http://localhost:9093/artist/list?cat='+type+'&limit='+num+'&offset='+page+'&initial='+(letter !== ''?letter:''))
        .then(res => {
            dispatch({
                type:GET_ARTIST,
                get_artist:true,
                artist_data:res
            })
        })
    }
}
export const asknewmusic = () => {
    return dispatch => {
        axios.post('http://localhost:9093/top/song?type=0')
        .then(res => {
            dispatch({
                type:GET_NEWMUSIC,
                get_newmusic:true,
                newmusic_data:res
            })
        })
    }
}
export const asknewalbum = () => {
    return dispatch => {
        axios.post('http://localhost:9093/album/newest')
        .then(res => {
            dispatch({
                type:GET_NEWALBUM,
                get_newalbum:true,
                newalbum_data:res
            })
        })
    }
}
export const askdaysong = () => {
    return dispatch => {
        axios.post('http://localhost:9093/recommend/songs')
        .then(res => {
            dispatch({
                type:GET_DAYSONG,
                get_daysong:true,
                daysong_data:res
            })
        })
    }
}
export const askmv = (type,page,order) => {
    return dispatch => {
        axios.post('http://localhost:9093/mv/all?area=' + type + '&limit=30&offset='+page+'&order='+order)
        .then(res => {
            dispatch({
                type:GET_MV,
                get_mv:true,
                mv_data:res
            })
        })
    }
}
export const askyunpan = () => {
    return dispatch => {
        axios.post('http://localhost:9093/user/cloud')
        .then(res => {
            dispatch({
                type:GET_YUNPAN,
                get_yunpan:true,
                yunpan_data:res
            })
        })
    }
}
export const asklikealbum = (page) => {
    return dispatch => {
        axios.post('http://localhost:9093/album/sublist?limit=30&offset='+page*30)
        .then(res => {
            dispatch({
                type:GET_LIKE_ALBUM,
                get_like_album:true,
                like_album_data:res
            })
        })
    }
}
export const asklikeartist = (page) => {
    return dispatch => {
        axios.post('http://localhost:9093/artist/sublist?limit=30&offset='+page*30)
        .then(res => {
            dispatch({
                type:GET_LIKE_ARTIST,
                get_like_artist:true,
                like_artist_data:res
            })
        })
    }
}
export const asklikevideo = (page) => {
    return dispatch => {
        axios.post('http://localhost:9093/mv/sublist?limit=30&offset='+page*30)
        .then(res => {
            dispatch({
                type:GET_LIKE_VIDEO,
                get_like_video:true,
                like_video_data:res
            })
        })
    }
}
export const askbuyalbum = (page) =>{
    return dispatch => {
        axios.post('http://localhost:9093/digitalAlbum/purchased?limit=30&offset='+page*30)
        .then(res => {
            dispatch({
                type:GET_BUY_ALBUM,
                get_buy_album:true,
                buy_album_data:res
            })
        })
    }
}
export const askuserplaylist = (uid) => {
    return dispatch => {
       
        axios.post('http://localhost:9093/user/playlist?uid='+uid)
        .then(res => {
       
            dispatch({
                type:GET_USER_PLAYLIST,
                get_user_playlist:true,
                user_playlist_data:res
            })
        })
    }
}
export const askplaylistdetail = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/playlist/detail?id='+id)
        .then(res => {
            dispatch({
                type:GET_PLAYLIST_DETAIL,
                get_play_list_detail:true,
                play_list_detail_data:res
            })
                dispatch({
                    type:ADD_PLAYLIST_MUSIC_DETAIL,
                    get_playlist_music_detail:true,
                    playlist_music_detail_data:res.data.playlist.tracks
                })
        })
    }
}
export const askuserlikemusic = (uid) => {
    return dispatch => {
        axios.post('http://localhost:9093/likelist?uid=' + uid)
        .then(res => {
            dispatch({
                type:GET_USER_LIKE_MUSIC,
                get_user_like_music:true,
                user_like_music_data:res
            })
        })
    }
}
export const gomusiclistdeail = () => {
    return {
        type:GO_MUSICLIST_DETAIL
    }
} 
export const goartistdetail = () => {
    return {
        type:GO_ARTIST_DETAIL
    }
}
export const goalbumdetail = () => {
    return {
        type:GO_ALBUM_DETAIL
    }
}
export const gomvdetail = () => {
    return {
        type:GO_MV_DETAIL
    }
}
export const gosearch = () => {
    return {
        type:GO_SEARCH
    }
}
export const askplaylistcomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/playlist?id='+id+'&before='+page)
        .then(res => {
            dispatch({
                type:GET_MUSICLIST_COMMENT,
                get_musiclist_comment:true,
                musiclist_comment_data:res,
                musiclist_comment_data_hot:res.data.hotComments,
                musiclist_comment_data_all:res.data.comments
            })
        })
    }
}
export const askmoreplaylistcomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/playlist?id='+id+'&before='+page+'&limit=20')
        .then(res => {
            dispatch({
                type:GET_MUSICLIST_COMMENT,
                get_musiclist_comment:true,
                musiclist_comment_data:res,
                musiclist_comment_data_hot:[],
                musiclist_comment_data_all:res.data.comments
            })
        })
    }
}
export const deletedata = () => {
    console.log('删除缓存')
    return {
        type:DELETE_DATA
    }
}
export const releascomment = (e,id) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment?t=1&type=2&id='+id+'&content='+e)
        .then(res => {
            message.success('评论成功')
            dispatch({
                type:DELETE_DATA
            })
            let d = dispatch
            axios.post('http://localhost:9093/comment/playlist?id='+id+'&before=0&limit=20&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_MUSICLIST_COMMENT,
                    get_musiclist_comment:true,
                    musiclist_comment_data:ress,
                    musiclist_comment_data_hot:ress.data.hotComments,
                    musiclist_comment_data_all:ress.data.comments
                })
            })
        })
    }
}
export const votecomment = (id,cid,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/like?id='+id+'&cid='+cid+'&t='+type+'&type=2')
        .then(res => {
            message.success('操作成功(可能延迟展示)')
        })
    }
}
export const coll = (id,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/playlist/subscribe?t='+type+'&id='+id)
        .then(res => {
            message.success('操作成功')
            axios.post('http://localhost:9093/playlist/detail?id='+id+'&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_PLAYLIST_DETAIL,
                    get_play_list_detail:true,
                    play_list_detail_data:ress
                })
                    dispatch({
                        type:ADD_PLAYLIST_MUSIC_DETAIL,
                        get_playlist_music_detail:true,
                        playlist_music_detail_data:ress.data.playlist.tracks
                    })
            })
        })
    }
}
export const sharemusiclist = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/share/resource?id='+id+'&type=playlist')
        .then(res => {
            message.success('操作成功')
        })
    }
}
export const clearoldartistdata = () => {
    return {
        type:DELETE_ARTIST_DATA 
    }
}
export const askartistmusic = (id) => {
    return dispatch => {
        dispatch({
            type:GET_ARTIST_MUSIC,
            get_artist_music:false,
            artist_music_data:{}
        })
        axios.post('http://localhost:9093/artists?id='+id)
        .then(res => {
            dispatch({
                type:GET_ARTIST_MUSIC,
                get_artist_music:true,
                artist_music_data:res.data
            })
        })
    }
}
export const askartistmv = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/artist/mv?limit=30&id='+id+'&offset='+page*30)
        .then(res => {
            dispatch({
                type:GET_ARTIST_MV,
                get_artist_mv:true,
                artist_mv_data:res.data
            })
        })
    }
}
export const askartistalbum = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/artist/album?id='+id+'&offset=' + page*50)
        .then(res => {
            dispatch({
                type:GET_ARTIST_ALBUM,
                get_artist_album:true,
                artist_album_data:res.data,
            })
        })
    }
}
export const askartistdescribe = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/artist/desc?id=' + id)
        .then(res => {
            dispatch({
                type:GET_ARTIST_DES,
                get_artist_des:true,
                artist_des_data:res.data,
            })
        })
    }
}
export const askalbumdetail = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/album?id=' +id)
        .then(res => {
            dispatch({
                type:GET_ALBUM_DETAIL,
                get_album_detail:true,
                album_detail_data:res.data
            })
        })
    }
}
export const askalbumdynamic = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/album/detail/dynamic?id=' +id)
        .then(res => {
            console.log(res)
            dispatch({
                type:GET_ALBUM_DYNAMIC,
                get_album_dynamic:true,
                album_dynamic_data:res.data
            })
        })
    }

}
export const askalbumcomment = (id, page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/album?id='+id+'&before='+page+'&limit=30')
        .then(res => {
            console.log(res.data)
            dispatch({
                type:GET_ALBUM_COMMENT,
                get_album_comment:true,
                album_comment_data:res.data,
                album_comment_data_hot:res.data.hotComments,
                album_comment_data_all:res.data.comments
            })
        })
    }
}
export const askmorealbumcomment = (id, page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/album?id='+id+'&before='+page+'&limit=30')
        .then(res => {
            dispatch({
                type:GET_ALBUM_COMMENT,
                get_album_comment:true,
                album_comment_data:res.data,
                album_comment_data_hot:[],
                album_comment_data_all:res.data.comments
            })
        })
    }
}
export const deletalbumedata = () => {
    return {
        type:DELETE_ALBUM_DATA
    }
}
export const collalbum = (id,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/album/sub?t='+type+'&id='+id+'&timestamp='+moment(Date().now).valueOf())
        .then(res => {
            message.success('操作成功(可能延迟展示)')
            dispatch({
                type:GET_ALBUM_DYNAMIC,
                get_album_dynamic:false,
                album_dynamic_data:{}
            })
            axios.post('http://localhost:9093/album/detail/dynamic?id='+id+'&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_ALBUM_DYNAMIC,
                    get_album_dynamic:true,
                    album_dynamic_data:ress.data
                })
            })
        })
    }
}

export const releascommentalbum = (e,id) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment?t=1&type=3&id='+id+'&content='+e+'&timestamp='+moment(Date().now).valueOf())
        .then(res => {
            message.success("评论成功")
            dispatch({
                type:DELETE_ALBUM_DATA
            })
            axios.post('http://localhost:9093/comment/album?id='+id+'&before=0&limit=30&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_ALBUM_COMMENT,
                    get_album_comment:true,
                    album_comment_data:ress.data,
                    album_comment_data_hot:ress.data.hotComments,
                    album_comment_data_all:ress.data.comments
                })
            })
        })
    }
}
export const votecommentalbum = (id,cid,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/like?id='+id+'&cid='+cid+'&t='+type+'&type=3')
        .then(res => {
            message.success('操作成功(可能延迟展示)')
        })
    }
}
export const newtop = () => {
    return {
        type:NEW_TOP
    }
}
export const pushstack = () => {
    return {
        type:PUSH_STACK
    }
}
export const popstack = () => {
    return{
        type:POP_STACK
    }
}
export const clearstack = () => {
    return {
        type:CLEAR_STACK
    }
}
export const askmvdetail = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/mv/detail?mvid='+id)
        .then(res => {
            dispatch({
                type:GET_MV_DETAIL,
                get_mv_detail:true,
                mv_detail_data:res.data
            })
        })
    }
}
export const askmvurl = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/mv/url?id='+id)
        .then(res => {
            dispatch({
                type:GET_MV_URL,
                get_mv_url:true,
                mv_url_data:res.data
            })
        })
    }
}
export const deletemvdata = () => {
    return dispatch => {
        console.log('删除mv页面数据')
        dispatch({
            type:GET_MV_DETAIL,
            get_mv_detail:false,
            mv_detail_data:{}
        })
        dispatch({
            type:GET_MV_URL,
            get_mv_url:false,
            mv_url_data:''
        })
        dispatch({
            type:DELETE_MV_COMMENT
        })
    }
}
export const askvediodetail = (id) => {
    return dispatch => {
        axios.post('http://localhost:9093/video/detail?id='+id)
        .then(res => {
            dispatch({
                type:GET_MV_DETAIL,
                get_mv_detail:true,
                mv_detail_data:res.data
            })
        })
    }
}
export const askvediourl = (id) => {
    return dispatch =>{
        axios.post('http://localhost:9093/video/url?id='+id)
        .then(res => {
            dispatch({
                type:GET_MV_URL,
                get_mv_url:true,
                mv_url_data:res.data
            })
        })
    }
}
export const askvediocomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/video?id='+id+'&limit=30&before='+page)
        .then(res => {
            dispatch({
                type:GET_MV_COMMENT,
                get_mv_comment:true,
                mv_comment_data:res.data,
                mv_comment_data_hot:res.data.hotComments,
                mv_comment_data_all:res.data.comments
            })
        })
    }
}
export const askmvcomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/mv?id='+id+'&limit=30&before='+page)
        .then(res => {
            dispatch({
                type:GET_MV_COMMENT,
                get_mv_comment:true,
                mv_comment_data:res.data,
                mv_comment_data_hot:res.data.hotComments,
                mv_comment_data_all:res.data.comments
            })
        })
    }
}
export const askmorevediocomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/video?id='+id+'&limit=30&before='+page)
        .then(res => {
            dispatch({
                type:GET_MV_COMMENT,
                get_mv_comment:true,
                mv_comment_data:res.data,
                mv_comment_data_hot:[],
                mv_comment_data_all:res.data.comments
            })
        })
    }
}
export const askmroemvcomment = (id,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/mv?id='+id+'&limit=30&before='+page)
        .then(res => {
            dispatch({
                type:GET_MV_COMMENT,
                get_mv_comment:true,
                mv_comment_data:res.data,
                mv_comment_data_hot:[],
                mv_comment_data_all:res.data.comments
            })
        })
    }
}
export const releascommentmv = (e,id) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment?t=1&type=1&id='+id+'&content='+e)
        .then(res => {
            message.success('评论成功')
            dispatch({
                type:DELETE_MV_COMMENT
            })
            axios.post('http://localhost:9093/comment/mv?id='+id+'&limit=30&before=0&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_MV_COMMENT,
                    get_mv_comment:true,
                    mv_comment_data:ress.data,
                    mv_comment_data_hot:ress.data.hotComments,
                    mv_comment_data_all:ress.data.comments
                })
            })
        })
    }
}
export const releascommentvedio = (e,id) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment?t=1&type=5&id='+id+'&content='+e)
        .then(res => {
            message.success('评论成功')
            dispatch({
                type:DELETE_MV_COMMENT
            })
            axios.post('http://localhost:9093/comment/video?id='+id+'&limit=30&before=0&timestamp='+moment(Date().now).valueOf())
            .then(ress => {
                dispatch({
                    type:GET_MV_COMMENT,
                    get_mv_comment:true,
                    mv_comment_data:ress.data,
                    mv_comment_data_hot:ress.data.hotComments,
                    mv_comment_data_all:ress.data.comments
                })
            })
        })
    }
}
export const votecommentmv = (id,cid,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/like?id='+id+'&cid='+cid+'&t='+type+'&type=1')
        .then(res => {
            message.success('操作成功(可能延迟展示)')
        })
    }
}

export const votecommentvedio = (id,cid,type) => {
    return dispatch => {
        axios.post('http://localhost:9093/comment/like?id='+id+'&cid='+cid+'&t='+type+'&type=5')
        .then(res => {
            message.success('操作成功(可能延迟展示)')
        })
    }
}
export const actsearchtip = (bool) => {
    return {
        type:OPEN_SEARCH_TIP,
        act:bool
    }
}
export const askhotsearch = () => {
    return dispatch => {
        axios.post('http://localhost:9093/search/hot/detail')
        .then(res => {
            dispatch({
                type:GET_HOT_SEARCH,
                get_hot_search:true,
                hot_search_data:res.data
            })
        })
    }
}
export const inputsearch = (e) => {
    return dispatch => {
        dispatch({
            type:INPUT_SEARCH,
            text:e
        })
        dispatch({
            type:GET_SEARCH_SUGGEST,
            get_search_suggest:false,
            search_suggest_data:{}
        })
        if(e !== ''){
            axios.post('http://localhost:9093/search/suggest?keywords='+ e)
            .then(res => {
                dispatch({
                    type:GET_SEARCH_SUGGEST,
                    get_search_suggest:true,
                    search_suggest_data:res.data
                })
            })
        }
        else{
            dispatch({
                type:GET_SEARCH_SUGGEST,
                get_search_suggest:false,
                search_suggest_data:{}
            })
        }
    }
}
export const asksearchres = (e,type,page) => {
    return dispatch => {
        axios.post('http://localhost:9093/search?keywords='+e+'&type='+type+'&limit=50&offset='+page*50)
        .then(res => {
            if(type === 1){
                dispatch({
                    type:GET_SEARCH_RES_MUSIC,
                    get_search_res_music:true,
                    search_res_music_data:res.data
                })
            }
            else if(type === 10){
                dispatch({
                    type:GET_SEARCH_RES_ALBUM,
                    get_search_res_album:true,
                    search_res_album_data:res.data
                })
            }
            else if(type === 100){
                dispatch({
                    type:GET_SEARCH_RES_ARTIST,
                    get_search_res_artist:true,
                    search_res_artist_data:res.data
                })
            }
            else if(type === 1000){
                dispatch({
                    type:GET_SEARCH_RES_MUSICLIST,
                    get_search_res_musiclist:true,
                    search_res_musiclist_data:res.data
                })
            }
            else if(type === 1004){
                dispatch({
                    type:GET_SEARCH_RES_MV,
                    get_search_res_mv:true,
                    search_res_mv_data:res.data
                })
            }
            else if(type === 1006){
                dispatch({
                    type:GET_SEARCH_RES_LRC,
                    get_search_res_lrc:true,
                    search_res_lrc_data:res.data
                })
            }
            else if(type === 1014){
                dispatch({
                    type:GET_SEARCH_RES_VEDIO,
                    get_search_res_vedio:true,
                    search_res_vedio_data:res.data
                })
            }
        })
    }
}
export const addsearchtime = () => {
    return {
        type:ADD_SEARCH_TIME
    }
}
export const deletesearchtime = () => {
    return {
        type:DELETE_SEARCH_TIME
    }
}
export const clearsearchtime = () => {
    return {
        type:CLEAR_SEARCH_TIME
    }
}
// export const playmusiclist = (indx,type,data) => {
//     return {
//         type:
//     }
// }