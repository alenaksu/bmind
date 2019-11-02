export interface Node2DInterface {
    position: Point;
    size?: Point;
    children?: Array<Node2DInterface>;
    onClick?: (point: Point) => void;
    parent?: Node2DInterface;

    draw(context: CanvasRenderingContext2D): void;
    getPosition(): Point;
}

export type TileMatrix = Array<Array<number>>;

export type Point = [number, number];
export type Line = [Point, Point];
