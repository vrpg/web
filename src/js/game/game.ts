import "babylon";
import { Player } from "./player/player";

class Game {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _light: BABYLON.Light;
  private _player: Player;

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement);
    this._engine = new BABYLON.Engine(this._canvas, true);
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

    let ground = BABYLON.MeshBuilder.CreateGround('ground1',
      { width: 10, height: 10, subdivisions: 2 }, this._scene);
    let groundMaterial = new BABYLON.StandardMaterial("groundTexture", this._scene);

    groundMaterial.ambientTexture = new BABYLON.Texture("src/assets/grass.png", this._scene);
    ground.material = groundMaterial;

    this._player = new Player(new BABYLON.Vector3(0, 0, 0), 1, this._scene);
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
        default:
        //not necessary to handle
      }
    });
  }
}
export { Game };