define(["require", "exports", "babylon"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(position, size, scene) {
            this._mesh = BABYLON.Mesh.CreateBox("player", size, scene);
            position.y = position.y + size / 2;
            this._mesh.position = position;
            let camera = new BABYLON.FollowCamera('camera1', new BABYLON.Vector3(position.x, position.y + 10, position.z), scene);
            camera.lockedTarget = this.getPlayer();
            camera.heightOffset = 10;
            scene.activeCamera = camera;
        }
        getPlayer() {
            return this._mesh;
        }
        moveForward() {
            this._mesh.position.z -= 1;
        }
        moveBackward() {
            this._mesh.position.z += 1;
        }
        moveRight() {
            this._mesh.position.x -= 1;
        }
        moveLeft() {
            this._mesh.position.x += 1;
        }
    }
    exports.Player = Player;
});
