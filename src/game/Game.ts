/// <reference path="../references.ts" />

import * as $protobuf from "protobufjs";
import { SocketGameMessage as GameMessage, SocketGameMessageType as GameMessageType } from "../proto/compiled";
import { Player } from "./player/Player";
import { EventSocket } from '../communication/EventSocket';
import { EventListener } from '../communication/EventListener';
import { UUID } from '../util/uuid';
import { ResourceManager } from './ResourceManager';
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'

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
        this._eventSocket = new EventSocket();
        this._eventSocket.addEventListener(this);
        this._players = [];
    }

    createScene(): void {
        this._scene = new BABYLON.Scene(this._engine);
        ResourceManager.createManager(this._scene);

        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        let ground = BABYLON.MeshBuilder.CreateGround('ground1',
            { width: 10, height: 10, subdivisions: 2 }, this._scene);

        let groundMaterial: BABYLON.StandardMaterial = new BABYLON.StandardMaterial("groundTexture", this._scene);
        ground.material = groundMaterial;
        var imageTask = ResourceManager.addTextureTask('ground texture', "grass.jpg");
        imageTask.onSuccess = function (task) {
            groundMaterial.ambientTexture = task.texture;
        }

        this._player = new Player("player-" + UUID.generateUUID(), new BABYLON.Vector3(0, 0.5, 0), this._scene, this._eventSocket, "camera1");
        let position: BABYLON.Vector3 = this._player.getPlayer().position;

        this._eventSocket.onOpen(() => {
            let joinMessage = new GameMessage({
                eventType: GameMessageType.JOIN,
                eventSource: this._player._playerId,
                x: position.x,
                y: position.y,
                z: position.z
            });
            this._eventSocket.sendEvent(joinMessage);

            let getStateMessage = new GameMessage({
                eventType: GameMessageType.GET_STATE,
                eventSource: this._player._playerId
            });
            this._eventSocket.sendEvent(getStateMessage);
        });

        let meshTask = ResourceManager.addMeshTask("test.obj");
        meshTask.onSuccess = function (task: BABYLON.MeshAssetTask) {
            console.log(task.loadedMeshes);
        }

        //this.createGUI();
    }

    createGUI(): void {
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

        var rect1 = new GUI.Rectangle();
        rect1.width = "400px";
        rect1.height = "400px";
        rect1.cornerRadius = 20;
        rect1.color = "Orange";
        rect1.thickness = 4;
        rect1.background = "green";
        advancedTexture.addControl(rect1);

        var text = new GUI.TextBlock();
        text.top = "-40px";
        text.text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur non augue et nisi porttitor pretium.";
        text.textWrapping = true;
        text.color = "white";
        text.fontSize = 24;
        rect1.addControl(text);

        var button = GUI.Button.CreateSimpleButton("button", "Close!"); button.width = "150px";
        button.height = "40px";
        button.color = "white";
        button.top = "40px";
        button.background = "green";
        button.onPointerDownObservable.add(function () {
            advancedTexture.removeControl(rect1);
        });
        rect1.addControl(button);

        advancedTexture.addControl(rect1);
    }

    animate(): void {
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
        ResourceManager.load();

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
        let source: string = event.eventSource;
        switch (event.eventType) {
            case GameMessageType.JOIN:
                this._players.push(new Player(source, new BABYLON.Vector3(Number(event.x), Number(event.y), Number(event.z)), this._scene));
                break;
            case GameMessageType.STATE:
                let found: boolean;
                for (let i in this._players) {
                    if (this._players[i]._playerId === source) {
                        found = true;
                    }
                }
                if (!found) {
                    this._players.push(new Player(source, new BABYLON.Vector3(event.x, event.y, event.z), this._scene));
                }
            case GameMessageType.MOVE:
                this._players.forEach(p => {
                    if (p._playerId === source) {
                        let mesh: BABYLON.Mesh = p.getPlayer();
                        mesh.position.x = event.x;
                        mesh.position.y = event.y;
                        mesh.position.z = event.z;
                    }
                });
                break;
            case GameMessageType.LEAVE:
                let indexForDelete: number;
                for (let i in this._players) {
                    let p: Player = this._players[i];
                    if (p._playerId === source) {
                        indexForDelete = this._players.indexOf(p);
                        p.getPlayer().dispose();
                    }
                }
                if (indexForDelete) {
                    this._players.splice(indexForDelete, 1);
                }
                break;
            case GameMessageType.GET_STATE:
                let pos: BABYLON.Vector3 = this._player.getPlayer().position;

                let gameMessage = new GameMessage({
                    eventType: GameMessageType.STATE,
                    eventSource: this._player._playerId,
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                });

                this._eventSocket.sendEvent(gameMessage);
                break;
            default:
                console.warn("unexpected eventName: " + event.eventType);
        }
    }
}
export { Game };
