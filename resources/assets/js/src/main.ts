///<reference path="../lib/babylonjs/dist/babylon.2.5.d.ts" />
import { Game } from "./game/game";

let game = new Game('renderCanvas');
game.createScene();
game.animate();