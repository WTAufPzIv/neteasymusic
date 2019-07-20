import { GO_MUSICLIST_DETAIL,GO_ARTIST_DETAIL,GO_ALBUM_DETAIL,NEW_TOP,PUSH_STACK,POP_STACK,CLEAR_STACK,GO_MV_DETAIL } from './actionType'
function ArrayStack(){  
    this.arr = [];  
         //压栈操作  
     this.push  =  (element) => {  
         this.arr.push(element);  
     }  
         //退栈操作  
         this.pop = function(){  
         return this.arr.pop();  
     }  
         //获取栈顶元素  
         this.top = function(){  
         return this.arr[this.arr.length-1];  
     }  
         //获取栈长  
         this.size = function(){  
         return this.arr.length;  
     }  
         //清空栈  
         this.clear = function() {  
             console.log('已清除')
        this.arr = [];  
         return true;  
     }  
   
     this.toString = function(){  
         return this.arr.toString();  
     }  
 }  
let s = new ArrayStack()
// s.clear()
const defaultState = {
    path : '',
    stack:s.top()
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
     var i = s.top() - 1
     s.pop()
     s.push(i)
     flag.stack = s.top()
     return flag
   }
   else if(action.type === PUSH_STACK){//压栈
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     s.push(-1)
     flag.stack = s.top()
     return flag
   }
   else if(action.type === POP_STACK){//出栈
     flag = JSON.parse(JSON.stringify(state))//深拷贝
     s.pop()
     flag.stack = s.top()
     return flag
   }
   else if(action.type === CLEAR_STACK){
     flag = JSON.parse(JSON.stringify(state))
     s.clear()
     flag.stack = 0
     return flag
   }
   else if(action.type === GO_MV_DETAIL){
    flag = JSON.parse(JSON.stringify(state))//深拷贝
    flag.path = 'mv'
    return flag
   }
    return state
}