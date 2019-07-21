import { GET_MV,GET_MV_DETAIL,GET_MV_URL,GET_MV_COMMENT, DELETE_MV_COMMENT } from './actionType'

const defaultState = {
   getmv:false,
   mvdata:{},
   getmvdetail:false,
   mvdetaildata:{},
   getmvurl:false,
   mvurldata:'',
   getmvcomment:false,
   mvcommentdata:{},
   mvcommentdatahot:[],
   mvcommentdataall:[]
}
export default function mv(state = defaultState, action) {
    if(action.type === GET_MV){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.getmv = action.get_mv
        flag.mvdata = action.mv_data
        return flag
    }
    else if(action.type === GET_MV_DETAIL){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmvdetail = action.get_mv_detail
        flag.mvdetaildata = action.mv_detail_data
        return flag
    }
    else if(action.type === GET_MV_URL){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmvurl = action.get_mv_url
        flag.mvurldata = action.mv_url_data
        return flag
    }
    else if(action.type === GET_MV_COMMENT){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmvcomment = action.get_mv_comment
        flag.mvcommentdata = action.mv_comment_data
        action.mv_comment_data_hot.map((item) => {
            flag.mvcommentdatahot.push(item)
        })
        action.mv_comment_data_all.map((item) => {
            flag.mvcommentdataall.push(item)
        })
        return flag
    }
    else if(action.type === DELETE_MV_COMMENT){
        flag = JSON.parse(JSON.stringify(state))
        flag.getmvcomment = false
        flag.mvcommentdata = {}      
        flag.mvcommentdatahot = []
        flag.mvcommentdataall = []
        return flag
    }
    return state
}