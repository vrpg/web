import "babylon";

class Player {
    private _mesh: BABYLON.Mesh;

    constructor(name: string, position: BABYLON.Vector3, size: number, scene: BABYLON.Scene) {
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

    getPlayer(): BABYLON.Mesh {
        return this._mesh;
    }

    moveForward(): void {
        this._mesh.movePOV(0, 0, 1);
    }
    moveBackward(): void {
        this._mesh.movePOV(0, 0, -1);
    }
    moveRight(): void {
        this._mesh.movePOV(1, 0, 0);
    }
    moveLeft(): void {
        this._mesh.movePOV(-1, 0, 0);
    }
    turnLeft(): void {
        this._mesh.rotatePOV(0, -Math.PI / 2, 0);
    }
    turnRight(): void {
        this._mesh.rotatePOV(0, Math.PI / 2, 0);
    }
}
export { Player }