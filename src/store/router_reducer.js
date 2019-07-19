import { GO_MUSICLIST_DETAIL,GO_ARTIST_DETAIL,GO_ALBUM_DETAIL,NEW_TOP,PUSH_STACK,POP_STACK } from './actionType'
function ArrayStack(){  
     var arr = [];  
         //压栈操作  
     this.push = function(element){  
         arr.push(element);  
     }  
         //退栈操作  
     this.pop = function(){  
         return arr.pop();  
     }  
         //获取栈顶元素  
     this.top = function(){  
         return arr[arr.length-1];  
     }  
         //获取栈长  
     this.size = function(){  
         return arr.length;  
     }  
         //清空栈  
     this.clear = function(){  
         arr = [];  
         return true;  
     }  
   
     this.toString = function(){  
         return arr.toString();  
     }  
 }  
const defaultState = {
    path : '',
    stack:new ArrayStack()
}
export default function router(state = defaultState, action) {
   if(action.type === GO_MUSICLIST_DETAIL){
        var flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.path = 'musiclist'
        return flag
   }
   else if(action.type === GO_ARTIST_DETAIL){
        flag = JSON.parse(JSON.stringify(state))//深拷贝
        flag.path = 'artist'
        return flag
   }
   else if(action.type === GO_ALBUM_DETAIL){
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     flag.path = 'album'
     return flag
   }
   else if(action.type === NEW_TOP){//更新栈顶元素
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     var i = flag.stack.top() - 1
     flag.pop()
     flag.stack.push(i)
     return flag
   }
   else if(action.type === PUSH_STACK){//压栈
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     flag.stack.push(-1)
     return flag
   }
   else if(action.type === POP_STACK){//出栈
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     flag.stack.pop()
     return flag
   }

    return state
}