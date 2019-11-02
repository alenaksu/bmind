import { Group } from '../rendering/Group';
import { Point, TileMatrix } from '../../types';
import { Tile } from '../rendering';
import { createTileMatrix } from '../../utils';

function isEmptyTile(matrix: TileMatrix, x: number, y: number) {
    return (
        y >= 0 &&
        y < matrix.length &&
        x >= 0 &&
        x < matrix[y].length &&
        matrix[y][x] === -1
    );
}

export class Grid extends Group {
    tileMatrix: Array<Array<number>>;
    isEnabled: boolean = true;
    isUpdated: boolean = false;

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

        [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([xDir, yDir]: Point) => {
            const newX = x + xDir;
            const newY = y + yDir;

            if (!isEmptyTile(tileMatrix, newX, newY)) return false;

            tileMatrix[newY][newX] = type;
            tileMatrix[y][x] = -1;

            tile.position = [tileSize * newX, tileSize * newY];
            tile.onClick = this.handleClick.bind(this, {
                type,
                tile,
                x: newX,
                y: newY,
            });

            return true;
        });

        this.isUpdated = true;
    }
}
