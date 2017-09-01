import { Game } from "./game/Game";
import * as Raven from 'raven-js';

if (SENTRY_DSN) {
    Raven.config(SENTRY_DSN).install();
}

let game = new Game('renderCanvas');
game.createScene();
game.animate();
