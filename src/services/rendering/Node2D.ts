import { Node2DInterface, Point } from '../../types';

export abstract class Node2D implements Node2DInterface {
    size?: Point;
    children?: Node2DInterface[];
    onClick?: (point: Point) => void;
    parent?: Node2DInterface;

    constructor(public position: Point) {}

    getPosition(): Point {
        const position: Point = [...this.position] as Point;
        if (this.parent) {
            const parentPosition = this.parent.getPosition();

            position[0] += parentPosition[0];
            position[1] += parentPosition[1];
        }

        return position;
    }

    draw(context: CanvasRenderingContext2D): void {
        throw new Error('Method not implemented.');
    }
}
