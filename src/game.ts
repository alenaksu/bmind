import { Renderer, Scene, Tile } from './services/rendering';
import { InputHandler } from './services/input';
import { Grid } from './services/game/grid';
import { compareMatrix, createTileMatrix } from './utils';

const renderer = new Renderer();
renderer.setSize(1080, 1920);
// renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const scene = new Scene();
scene.background = '#eeeeee';

const inputHandler = new InputHandler(renderer.canvas, scene);

const grid = new Grid([140, 40], 160);
scene.add(grid);

const expectGrid = new Grid([300, 1200], 160, 3, true);
expectGrid.isEnabled = false;
scene.add(expectGrid);


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
            location.reload();
        }
        grid.isUpdated = false;
    }
};
loop();

document.body.appendChild(renderer.canvas);
