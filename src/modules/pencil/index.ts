import { AppUtil } from "../app-util"
import { Point } from "../point"
import { windowToCanvas } from "../utils"

export class Pencil implements AppUtil {
    private _hasDown = false
    private _imageData!: ImageData
    public canvas!: HTMLCanvasElement
    private startPoint = new Point(0, 0)
    private endPoint = new Point(0, 0)
    constructor() {

    }

    get context() {
        return this.canvas.getContext('2d') as CanvasRenderingContext2D
    }
    onMouseDown = (e: MouseEvent) => {
        this._imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this._hasDown = true
        const mouseXY = windowToCanvas(this.canvas, e.clientX, e.clientY)

        this.context.beginPath()
        this.context.moveTo(mouseXY.x, mouseXY.y)
    }

    onMouseMove = (e: MouseEvent) => {
        e.preventDefault()
        if (!this._hasDown) return
        this.context.putImageData(this._imageData, 0, 0)
        const mouseXY = windowToCanvas(this.canvas, e.clientX, e.clientY)
        this.context.lineTo(mouseXY.x, mouseXY.y)
        this.context.stroke()
    }

    onMouseUp = () => {
        this._hasDown = false
        this.context.putImageData(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height), 0, 0)
    }
}
