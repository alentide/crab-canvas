import { AppUtil } from "../app-util"
import { windowToCanvas } from "../utils"

export class CrossLine implements AppUtil {
    private _hasDown = false
    private _imageData!: ImageData
    public canvas!: HTMLCanvasElement

    constructor() {

    }

    get context() {
        return this.canvas.getContext('2d') as CanvasRenderingContext2D
    }
    onMouseDown = () => {
        this._imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this._hasDown = true
    }
    onMouseUp = () => {
        this._hasDown = false
        this.context.putImageData(this._imageData, 0, 0)
    }
    onMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (!this._hasDown) return
        this.context.putImageData(this._imageData, 0, 0)
        const mouseXY = windowToCanvas(this.canvas, e.clientX, e.clientY)
        this.context.beginPath()
        this.context.moveTo(0, mouseXY.y)
        this.context.lineTo(this.canvas.width, mouseXY.y)
        this.context.stroke()
        this.context.moveTo(mouseXY.x, 0)
        this.context.lineTo(mouseXY.x, this.canvas.height)
        this.context.stroke()
    }
}
