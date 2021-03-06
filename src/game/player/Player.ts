/// <reference path="../../references.ts" />

import * as BABYLON from 'babylonjs'
import { EventSocket } from '../../communication/EventSocket';
import { ResourceManager } from '../ResourceManager';
import { SocketEnvelope, SocketMessage, SocketMessageType, MoveMessage } from '../../proto/compiled';

class Player {
    private readonly _mesh: BABYLON.Mesh;
    private readonly _eventSocket: EventSocket;
    readonly _playerId: string;

    constructor(name: string, position: BABYLON.Vector3, scene: BABYLON.Scene, eventSocket?: EventSocket, cameraName?: string) {
        this._playerId = name;
        this._eventSocket = eventSocket;
        this._mesh = BABYLON.Mesh.CreateBox(name, 1, scene);
        position.y = position.y;
        this._mesh.position = position;
        this._mesh.definedFacingForward = true;

        let material = new BABYLON.StandardMaterial(name + "Texture", scene);
        this._mesh.material = material;
        var imageTask = ResourceManager.addTextureTask('player texture', "box.jpg");
        imageTask.onSuccess = function (task) {
            material.ambientTexture = task.texture;
        }

        if (cameraName) {
            let camera = new BABYLON.FollowCamera(cameraName, new BABYLON.Vector3(position.x, position.y + 10, position.z), scene);
            camera.lockedTarget = this.getPlayer();
            camera.heightOffset = 10;
            scene.activeCamera = camera;
        }
    }

    getPlayer(): BABYLON.Mesh {
        return this._mesh;
    }

    moveForward(): void {
        this._mesh.movePOV(0, 0, 1);
        this.sendMoveEvent();
    }
    moveBackward(): void {
        this._mesh.movePOV(0, 0, -1);
        this.sendMoveEvent();
    }
    moveRight(): void {
        this._mesh.movePOV(1, 0, 0);
        this.sendMoveEvent();
    }
    moveLeft(): void {
        this._mesh.movePOV(-1, 0, 0);
        this.sendMoveEvent();
    }
    turnLeft(): void {
        this._mesh.rotatePOV(0, -Math.PI / 2, 0);
    }
    turnRight(): void {
        this._mesh.rotatePOV(0, Math.PI / 2, 0);
    }

    private sendMoveEvent(): void {
        if (this._eventSocket) {
            let pos: BABYLON.Vector3 = this._mesh.position;

            let socketEnvelope = new SocketEnvelope({
                socketMessage: new SocketMessage({
                    messageType: SocketMessageType.MOVE_SOCKET,
                    message: MoveMessage.encode(new MoveMessage({
                        eventSource: this._playerId,
                        x: pos.x,
                        y: pos.y,
                        z: pos.z
                    })).finish()
                })
            })

            this._eventSocket.sendEvent(socketEnvelope);
        }
    }
}
export { Player }