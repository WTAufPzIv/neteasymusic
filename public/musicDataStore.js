const { app  } = require('electron')
const Store = require('electron-store')
const path = require('path')
const uuid = require('uuid/v4')
class DataStore extends Store{
    constructor(settings){
        super(settings)
        this.tracks = this.get( 'tracks' ) || []
    }
    saveTrack(){//保存数据
        this.set('tracks',this.tracks)
        return this
    }
    getTrack(){//读取数据
        console.log(app.getPath('userData'))
        return this.get('tracks') || []
    }
    addTracks(tracks){//生成数据
        const tracksWithProps = tracks.map(track => {
            return {
                id:uuid(),
                path:track,
                filename:path.basename(track)
            }
        }).filter(track => {//去重
            const currentTracksPath = this.getTrack().map(track => track.path)
            return currentTracksPath.indexOf(track.path) < 0
        })
        this.tracks = [ ...this.tracks, ...tracksWithProps ]
        return this.saveTrack()
    }
    deleteTrack(deleteId){
        this.tracks = this.tracks.filter(item => item.id !== deleteId)
        return this.saveTrack()
    }
}
module.exports = DataStore