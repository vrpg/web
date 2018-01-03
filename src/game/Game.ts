/// <reference path="../references.ts" />

import * as $protobuf from "protobufjs";
import * as PROTO from "../proto/compiled";
import { Player } from "./player/Player";
import { EventSocket } from '../communication/EventSocket';
import { EventListener } from '../communication/EventListener';
import { UUID } from '../util/uuid';
import { ResourceManager } from './ResourceManager';
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import { Animatable } from './Animatable'

class Game implements EventListener, Animatable {
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
            let joinMessage = new PROTO.JoinMessage({
                eventSource: this._player._playerId,
                x: position.x,
                y: position.y,
                z: position.z
            });

            let socketEnvelope = new PROTO.SocketEnvelope({
                socketMessage: new PROTO.SocketMessage({
                    messageType: PROTO.SocketMessageType.JOIN_SOCKET,
                    message: PROTO.JoinMessage.encode(joinMessage).finish()
                })
            });

            this._eventSocket.sendEvent(socketEnvelope);

            socketEnvelope.socketMessage = new PROTO.SocketMessage({
                messageType: PROTO.SocketMessageType.GET_STATE_SOCKET,
                message: PROTO.GetStateMessage.encode(new PROTO.GetStateMessage({
                    eventSource: this._player._playerId
                })).finish()
            });

            this._eventSocket.sendEvent(socketEnvelope);
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

    onEvent(event: PROTO.SocketEnvelope): void {
        switch (event.socketMessage.messageType) {
            case PROTO.SocketMessageType.JOIN_SOCKET:
                let joinMessage = PROTO.JoinMessage.decode(event.socketMessage.message)

                this._players.push(new Player(joinMessage.eventSource, new BABYLON.Vector3(Number(joinMessage.x), Number(joinMessage.y), Number(joinMessage.z)), this._scene));
                break;
            case PROTO.SocketMessageType.STATE_SOCKET:
                let stateMessage = PROTO.StateMessage.decode(event.socketMessage.message)

                let found: boolean;
                for (let i in this._players) {
                    if (this._players[i]._playerId === stateMessage.eventSource) {
                        found = true;
                    }
                }
                if (!found) {
                    this._players.push(new Player(stateMessage.eventSource, new BABYLON.Vector3(stateMessage.x, stateMessage.y, stateMessage.z), this._scene));
                }
            case PROTO.SocketMessageType.MOVE_SOCKET:
                let moveMessage = PROTO.MoveMessage.decode(event.socketMessage.message)

                this._players.forEach(p => {
                    if (p._playerId === moveMessage.eventSource) {
                        let mesh: BABYLON.Mesh = p.getPlayer();
                        mesh.position.x = moveMessage.x;
                        mesh.position.y = moveMessage.y;
                        mesh.position.z = moveMessage.z;
                    }
                });
                break;
            case PROTO.SocketMessageType.LEAVE_SOCKET:
                let leaveMessage = PROTO.LeaveMessage.decode(event.socketMessage.message)

                let indexForDelete: number;
                for (let i in this._players) {
                    let p: Player = this._players[i];
                    if (p._playerId === leaveMessage.eventSource) {
                        indexForDelete = this._players.indexOf(p);
                        p.getPlayer().dispose();
                    }
                }
                if (indexForDelete) {
                    this._players.splice(indexForDelete, 1);
                }
                break;
            case PROTO.SocketMessageType.GET_STATE_SOCKET:
                let getStateMessage = PROTO.GetStateMessage.decode(event.socketMessage.message)

                let pos: BABYLON.Vector3 = this._player.getPlayer().position;

                let stateResponseMessage = new PROTO.StateMessage({
                    eventSource: this._player._playerId,
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                })

                let socketEnvelope = new PROTO.SocketEnvelope({
                    socketMessage: new PROTO.SocketMessage({
                        messageType: PROTO.SocketMessageType.STATE_SOCKET,
                        message: PROTO.StateMessage.encode(stateResponseMessage).finish()
                    })
                })

                this._eventSocket.sendEvent(socketEnvelope);
                break;
            default:
                console.warn("unexpected eventName: " + event.socketMessage.messageType);
        }
    }
}
export { Game };
