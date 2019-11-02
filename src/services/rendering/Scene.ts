import { Point, Node2DInterface } from '../../types';
import { isIntersecting } from '../../utils';

export class Scene {
    children: Array<Node2DInterface> = [];
    background: string = null;

    add(obj: Node2DInterface) {
        this.children.push(obj);
    }

    intersectNodes(point: Point) {
        const intersections: Array<Node2DInterface> = [];
        const nodes = [...this.children];

        while (nodes.length) {
            const node = nodes.shift();

            if (node.children) {
                nodes.push(...node.children);
            } else if (isIntersecting(point, node)) {
                intersections.push(node);
            }
        }

        return intersections;
    }
}
