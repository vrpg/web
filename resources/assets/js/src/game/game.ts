/// <reference path="../references.ts" />

import 'babylon';
import { Player } from "./player/player";
import { EventSocket } from '../communication/eventSocket';
import { EventListener } from '../communication/eventListener';
import { GameMessage, GameMessageType } from '../communication/gameMessage';
import { UUID } from '../util/uuid';

class Game implements EventListener {
  private readonly _canvas: HTMLCanvasElement;
  private readonly _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _light: BABYLON.Light;
  private _player: Player;
  private readonly _eventSocket: EventSocket;
  private _players: Player[];

  constructor(canvasElement: string) {
    // Create canvas and engine
    this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this._eventSocket = new EventSocket("ws://localhost:8080/test");
    this._eventSocket.addEventListener(this);
    this._players = [];
  }

  createScene(): void {
    this._scene = new BABYLON.Scene(this._engine);

    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

    let ground = BABYLON.MeshBuilder.CreateGround('ground1',
      { width: 10, height: 10, subdivisions: 2 }, this._scene);
    let groundMaterial = new BABYLON.StandardMaterial("groundTexture", this._scene);

    groundMaterial.ambientTexture = new BABYLON.Texture("images/grass.png", this._scene);
    ground.material = groundMaterial;

    this._player = new Player("player-" + UUID.generateUUID(), new BABYLON.Vector3(0, 0.5, 0), this._scene, this._eventSocket, "camera1");
    let position: BABYLON.Vector3 = this._player.getPlayer().position;
    this._eventSocket.onOpen(() => {
      this._eventSocket.sendEvent(new GameMessage(GameMessageType.JOIN, this._player._playerId, { x: position.x, y: position.y, z: position.z }));
      this._eventSocket.sendEvent(new GameMessage(GameMessageType.GET_STATE, this._player._playerId, {}));
    });
  }

  animate(): void {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
    window.addEventListener('resize', () => {
      this._engine.resize();
    });

    window.addEventListener('keydown', (event) => {
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
  }

  onEvent(event: GameMessage): void {
    let content = event._eventContent;
    let source: string = event._eventSource;
    switch (event._eventName) {
      case GameMessageType.JOIN:
        this._players.push(new Player(source, new BABYLON.Vector3(content.x, content.y, content.z), this._scene));
        break;
      case GameMessageType.STATE:
        let found: boolean;
        for (let i in this._players) {
          if (this._players[i]._playerId === source) {
            found = true;
          }
        }
        if (!found) {
          this._players.push(new Player(source, new BABYLON.Vector3(content.x, content.y, content.z), this._scene));
        }
      case GameMessageType.MOVE:
        this._players.forEach(p => {
          if (p._playerId === source) {
            let mesh: BABYLON.Mesh = p.getPlayer();
            mesh.position.x = content.x;
            mesh.position.y = content.y;
            mesh.position.z = content.z;
          }
        });
        break;
      case GameMessageType.LEAVE:
        let indexForDelete;
        for (let i in this._players) {
          let p: Player = this._players[i];
          if (p._playerId === source) {
            indexForDelete = i;
            p.getPlayer().dispose();
          }
        }
        if (indexForDelete) {
          this._players.splice(indexForDelete, 1);
        }
        break;
      case GameMessageType.GET_STATE:
        let pos: BABYLON.Vector3 = this._player.getPlayer().position;
        this._eventSocket.sendEvent(new GameMessage(GameMessageType.STATE, this._player._playerId, { x: pos.x, y: pos.y, z: pos.z }));
        break;
      default:
        console.warn("unexpected eventName: " + event._eventName);
    }
  }
}
export { Game };