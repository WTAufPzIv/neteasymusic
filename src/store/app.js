import { combineReducers } from 'redux';
import player from './player_reducer';
import user from './user_reducer'
import recommend from './recommend_reducer';
import playlist from './playlist_reducer'
import top from './top_reducer'
import artist from './artist_reducer'
import newmusic from './newmusic_reducer'
import day from './day_reducer'
import mv from './mv_reducer'
import yunpan from './yunpan_reducer'
import like from './like_reducer'
import userplaylist from './userplaylist_reducer'
import router from './router_reducer'
const neteasecloudmusic = combineReducers({
    player,
    user,
    recommend,
    playlist,
    top,
    artist,
    newmusic,
    day,
    mv,
    yunpan,
    like,
    userplaylist,
    router
})
export default neteasecloudmusic;