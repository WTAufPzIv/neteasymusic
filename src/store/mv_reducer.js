import { GET_MV,GET_MV_DETAIL,GET_MV_URL } from './actionType'

const defaultState = {
   getmv:false,
   mvdata:{},
   getmvdetail:false,
   mvdetaildata:{},
   getmvurl:false,
   mvurldata:'',
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
    return state
}