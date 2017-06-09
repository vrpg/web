define(["require", "exports", "./player/player", "babylon"], function (require, exports, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(canvasElement) {
            // Create canvas and engine
            this._canvas = document.getElementById(canvasElement);
            this._engine = new BABYLON.Engine(this._canvas, true);
        }
        createScene() {
            this._scene = new BABYLON.Scene(this._engine);
            this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
            let ground = BABYLON.MeshBuilder.CreateGround('ground1', { width: 10, height: 10, subdivisions: 2 }, this._scene);
            let groundMaterial = new BABYLON.StandardMaterial("groundTexture", this._scene);
            groundMaterial.ambientTexture = new BABYLON.Texture("src/assets/grass.png", this._scene);
            ground.material = groundMaterial;
            this._player = new player_1.Player(new BABYLON.Vector3(0, 0, 0), 1, this._scene);
        }
        animate() {
            this._engine.runRenderLoop(() => {
                this._scene.render();
            });
            window.addEventListener('resize', () => {
                this._engine.resize();
            });
            window.addEventListener('keydown', (event) => {
                console.log("down - " + event.code);
                switch (event.code) {
                    case "KeyW":
                        this._player.moveForward();
                        break;
                    case "KeyS":
                        this._player.moveBackward();
                        break;
                    case "KeyA":
                        this._player.moveLeft();
                        break;
                    case "KeyD":
                        this._player.moveRight();
                        break;
                    default:
                }
            });
        }
    }
    exports.Game = Game;
});
