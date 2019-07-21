import { OPEN_SEARCH_TIP ,GET_HOT_SEARCH,INPUT_SEARCH,GET_SEARCH_SUGGEST,
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
     
} from './actionType'

const defaultState = {
   opensearchtip:false,
   gethotsearch:false,
   hotsearchdata:{},
   Text:'',
   getsearchsuggest:false,
   searchsuggestdata:{},
   getsearchresmusic:false,
   searchresmusicdata:{},
   getsearchresartist:false,
   searchresartistdata:{},
   getsearchresalbum:false,
   searchresalbumdata:{},
   getsearchresmv:false,
   searchresmvdata:{},
   getsearchresvedio:false,
   searchresvediodata:{},
   getsearchresmusiclist:false,
   searchresmusiclistdata:{},
   getsearchreslrc:false,
   searchreslrcdata:{},
   searchtimes:0
}
export default function search(state = defaultState, action) {
   if(action.type === OPEN_SEARCH_TIP){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.opensearchtip = action.act
        return flag
   }
   else if(action.type === GET_HOT_SEARCH){
        flag = JSON.parse(JSON.stringify(state))
        flag.gethotsearch = action.get_hot_search
        flag.hotsearchdata = action.hot_search_data
        return flag
   }
   else if(action.type === INPUT_SEARCH){
        flag = JSON.parse(JSON.stringify(state))
        flag.Text = action.text
        return flag
   }
   else if(action.type === GET_SEARCH_SUGGEST){
        flag = JSON.parse(JSON.stringify(state))
        flag.getsearchsuggest = action.get_search_suggest
        flag.searchsuggestdata = action.search_suggest_data
        return flag
    }
    else if(action.type === GET_SEARCH_RES_MUSIC){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresmusic = action.get_search_res_music
          flag.searchresmusicdata = action.search_res_music_data
          return flag
    }
    else if(action.type === GET_SEARCH_RES_ALBUM){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresalbum = action.get_search_res_album
          flag.searchresalbumdata = action.search_res_album_data
          return flag
     }
     else if(action.type === GET_SEARCH_RES_MUSICLIST){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresmusiclist = action.get_search_res_musiclist
          flag.searchresmusiclistdata = action.search_res_musiclist_data
          return flag
     }
     else if(action.type === GET_SEARCH_RES_MV){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresmv = action.get_search_res_mv
          flag.searchresmvdata = action.search_res_mv_data
          return flag
     }
     else if(action.type === GET_SEARCH_RES_ARTIST){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresartist = action.get_search_res_artist
          flag.searchresartistdata = action.search_res_artist_data
          return flag
     }
     else if(action.type === GET_SEARCH_RES_VEDIO){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchresvedio = action.get_search_res_vedio
          flag.searchresvediodata = action.search_res_vedio_data
          return flag
     }
     else if(action.type === GET_SEARCH_RES_LRC){
          flag = JSON.parse(JSON.stringify(state))
          flag.getsearchreslrc = action.get_search_res_lrc
          flag.searchreslrcdata = action.search_res_lrc_data
          return flag
     }
     else if(action.type === ADD_SEARCH_TIME){
          flag = JSON.parse(JSON.stringify(state))
          flag.searchtimes = flag.searchtimes - 1
          return flag
     }
     else if(action.type === DELETE_SEARCH_TIME){
          flag = JSON.parse(JSON.stringify(state))
          flag.searchtimes = flag.searchtimes + 1
          return flag
     }
     else if(action.type === CLEAR_SEARCH_TIME){
          flag = JSON.parse(JSON.stringify(state))
          flag.searchtimes = 0
          return flag
     }
    return state
}