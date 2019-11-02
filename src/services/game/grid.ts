import { Group } from '../rendering/Group';
import { Point, TileMatrix } from '../../types';
import { Tile } from '../rendering';
import { createTileMatrix } from '../../utils';

function isInside(matrix: TileMatrix, x: number, y: number) {
    return y >= 0 && y < matrix.length && x >= 0 && x < matrix[y].length;
}

function isEmptyTile(matrix: TileMatrix, x: number, y: number) {
    return isInside(matrix, x, y) && matrix[y][x] === -1;
}

export class Grid extends Group {
    tileMatrix: Array<Array<number>>;
    isEnabled: boolean = true;
    isUpdated: boolean = false;
    tileMap: Map<string, Tile> = new Map();

    constructor(
        position: Point,
        public tileSize: number = 50,
        public gridSize: number = 5,
        public full: boolean = false
    ) {
        super(position);

        this.tileMatrix = createTileMatrix(gridSize, full);

        this.tileMatrix.forEach((row, y) => {
            row.forEach((type, x) => {
                if (type === -1) return;

                const tile = new Tile(
                    [tileSize * x, tileSize * y],
                    tileSize,
                    type
                );

                tile.onClick = this.handleClick.bind(this, {
                    type,
                    tile,
                    x,
                    y,
                });

                this.add(tile);
                this.tileMap.set(`${x}-${y}`, tile);
            });
        });
    }

    handleClick({
        x,
        y,
        tile,
        type,
    }: {
        x: number;
        y: number;
        tile: Tile;
        type: number;
    }) {
        if (!this.isEnabled) return false;

        const { tileMatrix, tileSize } = this;

        const swapTiles = (x: number, y: number, dir: Point) => {
            const nextX = x + dir[0];
            const nextY = y + dir[1];

            if (!isInside(tileMatrix, nextX, nextY)) return false;

            if (
                isEmptyTile(tileMatrix, nextX, nextY) ||
                swapTiles(nextX, nextY, dir)
            ) {
                const type = tileMatrix[y][x];
                const tileKey = `${x}-${y}`;
                const tile = this.tileMap.get(tileKey);

                this.tileMap.delete(tileKey)
                this.tileMap.set(`${nextX}-${nextY}`, tile);

                tileMatrix[nextY][nextX] = type;
                tileMatrix[y][x] = -1;

                tile.position = [tileSize * nextX, tileSize * nextY];
                tile.onClick = this.handleClick.bind(this, {
                    type,
                    tile,
                    x: nextX,
                    y: nextY,
                });

                return true;
            }
        };

        const result = [[1, 0], [-1, 0], [0, 1], [0, -1]].some((dir: Point) =>
            swapTiles(x, y, dir)
        );

        this.isUpdated = result;
    }
}
