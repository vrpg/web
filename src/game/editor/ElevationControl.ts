import * as BABYLON from 'babylonjs'

interface Position {
    x: number
    y: number
}

export class ElevationControl {

    private readonly HEIGHT = 0.2
    private readonly RADIUS = 1.0
    private readonly _ground: BABYLON.Mesh
    private _currentPosition: Position
    private _invertDirection: number = 1
    private _heightMin: number = 0
    private _heightMax: number = 11
    private _direction = -1

    constructor(ground: BABYLON.Mesh) {
        this._ground = ground
    }

    attachControl = (canvas: HTMLCanvasElement) => {
        canvas.addEventListener("pointerdown", this.onPointerDown, true)
        canvas.addEventListener("pointerup", this.onPointerUp, true)
        canvas.addEventListener("pointerout", this.onPointerUp, true)
        canvas.addEventListener("pointermove", this.onPointerMove, true)
        window.addEventListener("blur", this.onLostFocus, true)

        this._ground.getScene().registerBeforeRender(this.onBeforeRender)

        console.log("attach")
    }

    detachControl = (canvas: HTMLCanvasElement) => {
        canvas.removeEventListener("pointerdown", this.onPointerDown)
        canvas.removeEventListener("pointerup", this.onPointerUp)
        canvas.removeEventListener("pointerout", this.onPointerUp)
        canvas.removeEventListener("pointermove", this.onPointerMove)
        window.removeEventListener("blur", this.onLostFocus)

        this._ground.getScene().unregisterBeforeRender(this.onBeforeRender)

        console.log("detach")
    }

    private onBeforeRender = () => {
        if (!this._currentPosition) {
            return
        }
        console.log("before render")

        let pickInfo = this._ground.getScene().pick(this._currentPosition.x, this._currentPosition.y)

        if (!pickInfo.hit) return
        if (pickInfo.pickedMesh != this._ground) return

        this.elevateFaces(pickInfo, this.RADIUS, this.HEIGHT)
    }

    private elevateFaces = (pickInfo: BABYLON.PickingInfo, radius: number, height: number) => {
        let sphereCenter = pickInfo.pickedPoint

        this._ground.updateMeshPositions((data: BABYLON.FloatArray) => {
            let pointCount = Math.floor(data.length / 3)

            for (let i = 0; i < pointCount; i++) {
                let group = i * 3
                let x = data[group + 0]
                let y = data[group + 1]
                let z = data[group + 2]

                let closeEnough = Math.abs(Math.sqrt(Math.pow(x - sphereCenter.x, 2) + Math.pow(z - sphereCenter.z, 2)) - radius) < radius
                if (closeEnough && y <= this._heightMax && y >= this._heightMin) {
                    data[group + 1] = y + height
                }
            }
        }, true)
    }

    private onPointerDown = (event: PointerEvent) => {
        event.preventDefault()

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
    }

    private onPointerUp = (event: PointerEvent) => {
        event.preventDefault()

        this._currentPosition = null
    }

    private onPointerMove = (event: PointerEvent) => {
        event.preventDefault()

        if (!this._currentPosition) {
            return
        }

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
    }

    private onLostFocus = () => {
        this._currentPosition = null
    }
}
