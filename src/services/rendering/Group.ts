import { Node2D } from "./Node2D";

export class Group extends Node2D {
    children: Array<Node2D> = [];

    add(node: Node2D) {
        this.children.push(node);
        node.parent = this;
    }

    draw(context: CanvasRenderingContext2D) {
        context.save();

        context.translate(...this.position);
        this.children.forEach(node => node.draw(context));
        context.restore();
    }
}