import  React  from 'react'
import { Component } from 'react'
import ReactDom from 'react-dom';
import './LeftMenu.css'
import  like_music  from './data'
import create_music from './data1'
import { Link,Redirect } from 'react-router-dom'
const { ipcRenderer } = window.require('electron');
class LeftMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            height:700,
            islogin:true,
            iconColor:['w','g','g','g','g','g','g','g'],
            list_class:[
                'list_selected',
                'list_general',
                'list_general',
                'list_general',
                'list_general',
                'list_general',
                'list_general',
                'list_general',
            ],
            like_music_list:like_music,
            create_music_list:create_music
        }
        var flag1 = this.state.iconColor
        var flag2 = this.state.list_class
        for(var i = 0; i < this.state.like_music_list.length+this.state.create_music_list.length; i++) {
            flag1.push('g')
            flag2.push('list_general')
        }
        this.setState({
            iconColor:flag1,
            list_class:flag2,
        })
       
    }
    componentDidMount(){
        var that = this
        ipcRenderer.on('windowHeight', (event, height) => {
            //alert(height)
            if(height >= 1066){
              that.setState({
                height:1050 - 53 - 50
              })
            }
            else{
              that.setState({
                height:height-53-50
              })
            }
          })
    }
    hover = (index) => {
        if(this.state.list_class[index] !== 'list_selected'){
            var arr = this.state.list_class
            arr[index] = 'list_focus'
            this.setState({list_class:arr})
            arr = this.state.iconColor
            arr[index] = 'w'
            this.setState({iconColor:arr})
        }
    }
    unhover = (index) => {
        if(this.state.list_class[index] !== 'list_selected'){
            var arr = this.state.list_class
            arr[index] = 'list_general'
            this.setState({list_class:arr})
            arr = this.state.iconColor
            arr[index] = 'g'
            this.setState({iconColor:arr})
        }
    }
    click = (index) => {
        var arr = this.state.list_class
        for(var i = 0; i < this.state.list_class.length; i++){
            arr[i] = 'list_general'
        }
        this.setState({list_class:arr})
        arr[index] = 'list_selected'
        this.setState({list_class:arr})
        arr = this.state.iconColor
        for(i = 0; i < this.state.iconColor.length; i++){
            arr[i] = 'g'
        }
        arr = this.state.iconColor
        arr[index] = 'w'
        this.setState({iconColor:arr})
    }
    test = (e) => {
        console.log(e)
    }
    
    render(){
        return(
            <div className = 'leftmeun_body' 
            // style = {{'height':''+this.state.height+'px'}}
            style = {{'height':'100%'}}
            >
                
                <div className = 'Recommend'>
                    <div className = 'Recommend_head'>推荐</div>
                    <Link to = '/'><div className = {this.state.list_class[0]} onMouseMove = {this.hover.bind(this,0)} onMouseLeave = {this.unhover.bind(this,0)} onClick = {this.click.bind(this,0)}>
                        <img src = {require('./img/music_'+this.state.iconColor[0]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>发现音乐</span>
                    </div></Link>
                    <Link to = '/Fm'><div className = {this.state.list_class[1]} onMouseMove = {this.hover.bind(this,1)} onMouseLeave = {this.unhover.bind(this,1)} onClick = {this.click.bind(this,1)}>
                        <img src = {require('./img/fm_'+this.state.iconColor[1]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>FM电台</span>
                    </div></Link>
                    <Link to = '/video'><div className = {this.state.list_class[2]} onMouseMove = {this.hover.bind(this,2)} onMouseLeave = {this.unhover.bind(this,2)} onClick = {this.click.bind(this,2)}>
                        <img src = {require('./img/v_'+this.state.iconColor[2]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>视频</span>
                    </div></Link>
                    <Link to = '/friend'><div className = {this.state.list_class[3]} onMouseMove = {this.hover.bind(this,3)} onMouseLeave = {this.unhover.bind(this,3)} onClick = {this.click.bind(this,3)}>
                        <img src = {require('./img/comment_'+this.state.iconColor[3]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>朋友动态</span>
                    </div></Link>
                </div>

                <div className = 'Minemusic'>
                    <div className = 'Minemusic_head'>我的音乐</div>
                    <Link to = '/localmusic'><div className = {this.state.list_class[4]} onMouseMove = {this.hover.bind(this,4)} onMouseLeave = {this.unhover.bind(this,4)} onClick = {this.click.bind(this,4)}>
                        <img src = {require('./img/local_music_'+this.state.iconColor[4]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>本地音乐</span>
                    </div></Link>
                    <Link to = '/download'><div className = {this.state.list_class[5]} onMouseMove = {this.hover.bind(this,5)} onMouseLeave = {this.unhover.bind(this,5)} onClick = {this.click.bind(this,5)}>
                        <img src = {require('./img/download_'+this.state.iconColor[5]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>下载管理</span>
                    </div></Link>
                    <Link to = '/yunpan'><div className = {this.state.list_class[6]} onMouseMove = {this.hover.bind(this,6)} onMouseLeave = {this.unhover.bind(this,6)} onClick = {this.click.bind(this,6)} style = {{'display':this.state.islogin  ?'block':'none'}}>
                        <img src = {require('./img/yun_'+this.state.iconColor[6]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>我的音乐云盘</span>
                    </div></Link>
                    <Link to = '/like'><div className = {this.state.list_class[7]} onMouseMove = {this.hover.bind(this,7)} onMouseLeave = {this.unhover.bind(this,7)} onClick = {this.click.bind(this,7)} style = {{'display':this.state.islogin  ?'block':'none'}}>
                        <img src = {require('./img/like_'+this.state.iconColor[7]+'.png')} className = 'list_img'/>
                        <span className = 'list_span'>我的收藏</span>
                    </div></Link>
                </div>


                <div className = 'Likemusic_list' style = {{'display':this.state.create_music_list.length > 0 && this.state.islogin  ?'block':'none'}}>
                    <div className = 'Likemusic_list_head'>创建的歌单</div>
                    {
                        this.state.create_music_list.map((item,index) => {
                            return (
                                <Link to = '/musiclist'><div key = {index} className = {this.state.list_class[index+8]} onMouseMove = {this.hover.bind(this,index+8)} onMouseLeave = {this.unhover.bind(this,index+8)} onClick = {this.click.bind(this,index+8)}>
                                    <img src = {require('./img/like_music_list_'+this.state.iconColor[index + 8]+'.png')} className = 'list_img'/>
                                    <span className = 'list_span'>{this.state.create_music_list[index]}</span>
                                </div></Link>
                            )
                        })
                    }
                </div>


                <div className = 'Createmusic_list' style = {{'display':this.state.like_music_list.length > 0 && this.state.islogin  ?'block':'none'}}>
                    <div className = 'Createmusic_list_head'>收藏的歌单</div>
                    {
                        this.state.like_music_list.map((item,index) => {
                            return (
                                <Link to = '/musiclist'><div key = {index} className = {this.state.list_class[index+8+this.state.create_music_list.length]} onMouseMove = {this.hover.bind(this,index+8+this.state.create_music_list.length)} onMouseLeave = {this.unhover.bind(this,index+8+this.state.create_music_list.length)} onClick = {this.click.bind(this,index+8+this.state.create_music_list.length)}>
                                    <img src = {require('./img/like_music_list_'+this.state.iconColor[index + 8 + this.state.create_music_list.length]+'.png')} className = 'list_img'/>
                                    <span className = 'list_span'>{this.state.like_music_list[index]}</span>
                                </div></Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default LeftMenu