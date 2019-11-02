import { Renderer, Scene, Tile } from './services/rendering';
import { InputHandler } from './services/input';
import { Point } from './types';
import { Group } from './services/rendering/Group';
import { Grid } from './services/game/grid';
import { compareMatrix, createTileMatrix } from './utils';

const renderer = new Renderer();
renderer.setSize(540, 960);
// renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const scene = new Scene();
scene.background = '#FFD38E';

const inputHandler = new InputHandler(renderer.canvas, scene);

const grid = new Grid([70, 20], 80);
scene.add(grid);

const expectGrid = new Grid([150, 600], 80, 3, true);
expectGrid.isEnabled = false;
scene.add(expectGrid);

console.log(scene.intersectNodes([10, 10]));

const loop = () => {
    requestAnimationFrame(loop);

    renderer.render(scene);

    if (grid.isUpdated) {
        if (
            compareMatrix(
                expectGrid.tileMatrix,
                grid.tileMatrix.slice(1, 4).map(r => r.slice(1, 4))
            )
        ) {
            alert('you won');
        }
        grid.isUpdated = false;
    }
};
loop();

document.body.appendChild(renderer.canvas);
