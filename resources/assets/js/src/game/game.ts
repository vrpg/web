/// <reference path="../references.ts" />

import 'babylon';
import { Player } from "./player/player";

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _light: BABYLON.Light;
  private _player: Player;

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

    let ground = BABYLON.MeshBuilder.CreateGround('ground1',
      { width: 10, height: 10, subdivisions: 2 }, this._scene);
    let groundMaterial = new BABYLON.StandardMaterial("groundTexture", this._scene);

    groundMaterial.ambientTexture = new BABYLON.Texture("images/grass.png", this._scene);
    ground.material = groundMaterial;

    this._player = new Player("player1", new BABYLON.Vector3(0, 0, 0), 1, this._scene);
  }

  animate(): void {
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
        case "KeyQ":
          this._player.turnLeft();
          break;
        case "KeyE":
          this._player.turnRight();
          break;
        default:
        //not necessary to handle
      }
    });

    var socket = new WebSocket("ws://localhost:8080/test");
    socket.onopen = function (event) {
      console.log("I am connected!");
      socket.send("i am connected!");
    };
    socket.onmessage = function (event) {
      console.log("I got a message");
    };
  }
}
export { Game };