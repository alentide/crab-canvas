import { Circle } from './../../modules/circle/index';
import { Pencil } from './../../modules/pencil/index';
import { App } from "@/modules/app";
import { CrossLine } from "@/modules/cross-line"
import { Line } from "@/modules/line";



const main = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement


    // const context = canvas.getContext('2d')

    // if (!context) return
    // context.font = '20px Arial';
    // context.fillStyle = "blue"
    // context.strokeStyle = 'red'


    // context.fillText('Hello World', 0, 20);
    // context.strokeText('Hello World', 0, 40);
    
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
    const app = new App(canvas)
    app.useUtil(new CrossLine())

    app.useUtil(new Line())
    app.useUtil(new Pencil())
    app.useUtil(new Circle())
}

window.onload = main
