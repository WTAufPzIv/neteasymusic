import { GET_ALBUM_DETAIL,
    GET_ALBUM_COMMENT,
    GET_ALBUM_DYNAMIC,
    DELETE_ALBUM_DATA } from './actionType'

const defaultState = {
   getalbumdetail:false,
   albumdetaildata:{},
   getalbumdynamic:false,
   albumdynamicdata:{},
   getalbumcomment:false,
   albumcommentdata:{},
   albumcommentdataall:[],
   albumcommentdatahot:[]
}
export default function album(state = defaultState, action) {
    if(action.type === GET_ALBUM_DETAIL){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getalbumdetail = action.get_album_detail
        flag.albumdetaildata = action.album_detail_data
        return flag
    }
    else if(action.type === GET_ALBUM_COMMENT){
         flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getalbumcomment = action.get_album_comment
        flag.albumcommentdata = action.album_comment_data
        action.album_comment_data_hot.map((item) => {
            flag.albumcommentdatahot.push(item)
        })
        action.album_comment_data_all.map((item) => {
            flag.albumcommentdataall.push(item)
        })
        return flag
    }
    else if(action.type === GET_ALBUM_DYNAMIC){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getalbumdynamic = action.get_album_dynamic
        flag.albumdynamicdata = action.album_dynamic_data
        return flag
    }
    else if(action.type === DELETE_ALBUM_DATA){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getalbumcomment = false
        flag.albumcommentdata = {}
        flag.albumcommentdatahot = []        
        flag.albumcommentdataall = []
        return flag
    }
    return state
}