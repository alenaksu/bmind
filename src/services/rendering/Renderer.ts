import { Scene } from './Scene';
import { Node2DInterface } from '../../types';

export class Renderer {
    context: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
    }

    drawBackground(color: string) {
        const { context, canvas } = this;

        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    drawNodes(Nodes: Array<Node2DInterface>) {
        Nodes.forEach(obj => obj.draw(this.context));
    }

    clear() {
        const { context, canvas } = this;

        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    render(scene: Scene) {
        this.clear();

        if (scene.background) this.drawBackground(scene.background);

        this.drawNodes(scene.children);
    }

    setSize(w: number, h: number) {
        this.canvas.width = Math.floor(w);
        this.canvas.height = Math.floor(h);
    }

    get size() {
        return [this.canvas.width, this.canvas.height];
    }
}
