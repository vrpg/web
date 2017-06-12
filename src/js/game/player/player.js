define(["require", "exports", "babylon"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(name, position, size, scene) {
            this._mesh = BABYLON.Mesh.CreateBox(name, size, scene);
            position.y = position.y + size / 2;
            this._mesh.position = position;
            this._mesh.definedFacingForward = true;
            let material = new BABYLON.StandardMaterial(name + "Texture", scene);
            material.ambientTexture = new BABYLON.Texture("src/assets/box.jpg", scene);
            this._mesh.material = material;
            let camera = new BABYLON.FollowCamera('camera1', new BABYLON.Vector3(position.x, position.y + 10, position.z), scene);
            camera.lockedTarget = this.getPlayer();
            camera.heightOffset = 10;
            scene.activeCamera = camera;
        }
        getPlayer() {
            return this._mesh;
        }
        moveForward() {
            this._mesh.movePOV(0, 0, 1);
        }
        moveBackward() {
            this._mesh.movePOV(0, 0, -1);
        }
        moveRight() {
            this._mesh.movePOV(1, 0, 0);
        }
        moveLeft() {
            this._mesh.movePOV(-1, 0, 0);
        }
        turnLeft() {
            this._mesh.rotatePOV(0, -Math.PI / 2, 0);
        }
        turnRight() {
            this._mesh.rotatePOV(0, Math.PI / 2, 0);
        }
    }
    exports.Player = Player;
});
