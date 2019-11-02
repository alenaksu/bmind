import { Point } from '../../types';
import { Node2D } from './Node2D';
import { Colors } from '../../constants';

export class Tile extends Node2D {
    size: Point = [0, 0];
    padding: number = 10;
    onClick: (point: Point) => void = null;

    constructor(public position: Point, size: number, public type: number) {
        super(position);

        this.size = [size, size];
    }

    draw(context: CanvasRenderingContext2D) {
        const {
            position: [x, y],
            size,
            type,
        } = this;

        const [w, h] = size.map((x: number) => x - this.padding);

        context.fillStyle = Colors[type];
        context.fillRect(x, y, w, h);

        context.strokeStyle = '#666';
        context.strokeRect(x, y, w, h);
    }
}
