import { AppUtil } from "../app-util"

export class App {
    private _lastUsedUtil: AppUtil|null = null
    constructor(private _canvas: HTMLCanvasElement){

    }
    useUtil(appUtil:AppUtil) {
        if(this._lastUsedUtil){
            this.notUseUtil(this._lastUsedUtil)
        }      
        this._lastUsedUtil = appUtil
        this._lastUsedUtil.canvas = this._canvas
        this._canvas.addEventListener('mousedown', appUtil.onMouseDown)
        this._canvas.addEventListener('mousemove', appUtil.onMouseMove)
        this._canvas.addEventListener('mouseup', appUtil.onMouseUp)
    }
    notUseUtil(appUtil:AppUtil){
        this._canvas.removeEventListener('mousedown', appUtil.onMouseDown)
        this._canvas.removeEventListener('mousemove', appUtil.onMouseMove)
        this._canvas.removeEventListener('mouseup', appUtil.onMouseUp)
    }
}
