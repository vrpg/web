import * as BABYLON from 'babylonjs'
import { int, double, Vector3 } from 'babylonjs-loaders';

interface Position {
    x: int
    y: int
}

export class ElevationControl {

    private readonly _ground: BABYLON.Mesh
    private _currentPosition: Position
    private _invertDirection: int = 1
    private heightMin: int = 0
    private heightMax: int = 11

    constructor(ground: BABYLON.Mesh) {
        this._ground = ground
    }

    attachControl(canvas: HTMLCanvasElement) {
        canvas.addEventListener("pointerdown", this.onPointerDown, true)
        canvas.addEventListener("pointerup", this.onPointerUp, true)
        canvas.addEventListener("pointerout", this.onPointerUp, true)
        canvas.addEventListener("pointermove", this.onPointerMove, true)
        window.addEventListener("blur", this.onLostFocus, true)

        this._ground.getScene().registerBeforeRender(this.onBeforeRender)
    }

    detachControl(canvas: HTMLCanvasElement) {
        canvas.removeEventListener("pointerdown", this.onPointerDown)
        canvas.removeEventListener("pointerup", this.onPointerUp)
        canvas.removeEventListener("pointerout", this.onPointerUp)
        canvas.removeEventListener("pointermove", this.onPointerMove)
        window.removeEventListener("blur", this.onLostFocus)

        this._ground.getScene().unregisterBeforeRender(this.onBeforeRender)
    }

    private onBeforeRender() {
        if (!this._currentPosition) {
            return
        }

        let pickInfo = this._ground.getScene().pick(this._currentPosition.x, this._currentPosition.y)

        if (!pickInfo.hit) return
        if (pickInfo.pickedMesh != this._ground) return

    }

    private elevateFaces(pickInfo: BABYLON.PickingInfo, radius: double, height: int) {
        let selectedVertices = []

        let sphereCenter = pickInfo.pickedPoint
        sphereCenter.y = 0

        for (let subIndex = 0; subIndex < this._ground.subMeshes.length; subIndex++) {
            let subMesh = this._ground.subMeshes[subIndex]

            if (!this.isIntersected(subMesh.getBoundingInfo().boundingBox, sphereCenter, radius)) {
                continue
            }

            for (let index = subMesh.verticesStart; index < subMesh.verticesStart + subMesh.verticesCount; index++) {

            }
        }
    }

    private isIntersected(boundingBox: BABYLON.BoundingBox, sphereCenter: BABYLON.Vector3, radius: double) {

    }

    private prepareDataModelForElevation() {

    }

    private onPointerDown(event: PointerEvent) {
        event.preventDefault()

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
    }

    private onPointerUp(event: PointerEvent) {
        event.preventDefault()

        this._currentPosition = null
    }

    private onPointerMove(event: PointerEvent) {
        event.preventDefault()

        if (!this._currentPosition) {
            return;
        }

        this._invertDirection = event.button == 2 ? -1 : 1

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
    }

    private onLostFocus() {
        this._currentPosition = null
    }
}
