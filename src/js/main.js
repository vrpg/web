define(["require", "exports", "./game/game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let game = new game_1.Game('renderCanvas');
    game.createScene();
    game.animate();
});
