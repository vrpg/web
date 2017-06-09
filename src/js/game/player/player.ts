import "babylon";

class Player {
    private _mesh: BABYLON.Mesh;

    constructor(position: BABYLON.Vector3, size: number, scene: BABYLON.Scene) {
        this._mesh = BABYLON.Mesh.CreateBox("player", size, scene);
        position.y = position.y + size / 2;
        this._mesh.position = position;

        let camera = new BABYLON.FollowCamera('camera1', new BABYLON.Vector3(position.x, position.y + 10, position.z), scene);
        camera.lockedTarget = this.getPlayer();
        camera.heightOffset = 10;
        scene.activeCamera = camera;
    }

    getPlayer(): BABYLON.Mesh {
        return this._mesh;
    }

    moveForward(): void {
        this._mesh.position.z -= 1;
    }
    moveBackward(): void {
        this._mesh.position.z += 1;
    }
    moveRight(): void {
        this._mesh.position.x -= 1;
    }
    moveLeft(): void {
        this._mesh.position.x += 1;
    }
}
export { Player }