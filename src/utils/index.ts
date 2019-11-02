import { Node2DInterface, Point, TileMatrix } from '../types';

function isBetween(x: number, x0: number, x1: number): boolean {
    return x >= x0 && x <= x1;
}

export function isIntersecting(point: Point, obj: Node2DInterface) {
    const [x, y] = point;
    const [x0, y0] = obj.getPosition();
    const [x1, y1] = [obj.size[0] + x0, obj.size[1] + y0];

    return isBetween(x, x0, x1) && isBetween(y, y0, y1);
}

export function shuffle<T>(arr: Array<T>): Array<T> {
    return [...arr].sort(() => Math.random() - 0.5);
}

export function splitArray<T>(arr: Array<T>, size: number): Array<Array<T>> {
    const matrix: Array<Array<T>> = [];
    let row: Array<T>;
    arr.forEach((item, i) => {
        if (i % size === 0) {
            row = [];
            matrix.push(row);
        }

        row.push(item);

        return row;
    }, []);

    return matrix;
}

export function compareMatrix(
    matrix0: TileMatrix,
    matrix1: TileMatrix
): boolean {
    return matrix0.every((row, y) =>
        row.every((tile, x) => matrix1[y][x] === tile)
    );
}

export function createTileMatrix(size = 5, full: boolean = false) {
    let arr = [];
    for (let i = 0; i < size ** 2; i++) arr.push(i % size);

    arr = shuffle(arr);

    if (!full) {
        arr.splice(-1, 1, -1);
    }

    console.log(arr);

    return splitArray(arr, size);
}
