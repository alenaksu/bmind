import { Scene } from './rendering';
import { Point } from '../types';

function getRelativeCoords(e: MouseEvent): Point {
    const target = e.target as HTMLCanvasElement;
    return [
        (e.clientX - target.offsetLeft),
        (e.clientY - target.offsetTop)
    ]
}

export class InputHandler {
    constructor(public canvas: HTMLCanvasElement, public scene: Scene) {
        canvas.addEventListener('click', this.handleClick);
    }

    handleClick = (e: MouseEvent) => {
        e.preventDefault();

        const { canvas, scene } = this;
        const { width, height, clientWidth, clientHeight } = canvas;

        const scaleX = width / clientWidth;
        const scaleY = height / clientHeight;
        const point: Point = getRelativeCoords(e);
        
        point[0] *= scaleX;
        point[1] *= scaleY;

        const nodes = scene.intersectNodes(point);

        nodes.forEach(node => {
            node.onClick && node.onClick(point);
        });
    };
}
