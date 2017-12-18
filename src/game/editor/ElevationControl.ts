import * as BABYLON from 'babylonjs'
import { Util } from '../../util/Util'

interface Position {
    x: number
    y: number
}

export class ElevationControl {

    private readonly _ground: BABYLON.Mesh
    private _currentPosition: Position
    private _invertDirection: number = 1
    private heightMin: number = 0
    private heightMax: number = 11
    private _facesOfVertices: Array<any> = []
    private _groundVerticesPositions: BABYLON.FloatArray
    private _groundVerticesNormals: BABYLON.FloatArray
    private _groundPositions: Array<BABYLON.Vector3> = []
    private _groundIndices: BABYLON.IndicesArray
    private _groundFacesNormals: Array<BABYLON.Vector3> = []
    private _subdivisionsOfVertices: any = []
    private _direction = -1
    private _selectedVertices: Array<number> = []
    private radius = 5.0;

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

        console.log("attach")
    }

    detachControl(canvas: HTMLCanvasElement) {
        canvas.removeEventListener("pointerdown", this.onPointerDown)
        canvas.removeEventListener("pointerup", this.onPointerUp)
        canvas.removeEventListener("pointerout", this.onPointerUp)
        canvas.removeEventListener("pointermove", this.onPointerMove)
        window.removeEventListener("blur", this.onLostFocus)

        this._ground.getScene().unregisterBeforeRender(this.onBeforeRender)

        console.log("detach")
    }

    private onBeforeRender() {
        let asd = Util.nullCheck(this._currentPosition)
        if (!this._currentPosition) {
            return
        }
        console.log("before render")

        let pickInfo = this._ground.getScene().pick(this._currentPosition.x, this._currentPosition.y)

        if (!pickInfo.hit) return
        if (pickInfo.pickedMesh != this._ground) return

        this.elevateFaces(pickInfo, this.radius, 0.2);
    }

    private elevateFaces(pickInfo: BABYLON.PickingInfo, radius: number, height: number) {
        console.log("lel")
        let sphereCenter = pickInfo.pickedPoint
        sphereCenter.y = 0

        for (let subIndex = 0; subIndex < this._ground.subMeshes.length; subIndex++) {
            let subMesh = this._ground.subMeshes[subIndex]

            if (!this.isIntersected(subMesh.getBoundingInfo().boundingBox, sphereCenter, radius)) {
                continue
            }

            for (let index = subMesh.verticesStart; index < subMesh.verticesStart + subMesh.verticesCount; index++) {
                let position = this._groundPositions[index]
                sphereCenter.y = position.y

                let distance = BABYLON.Vector3.Distance(position, sphereCenter)

                if (distance < radius) {
                    this._selectedVertices[index] = distance
                }
            }
        }

        // Elevate vertices
        for (let selectedVertice of this._selectedVertices) {
            let position = this._groundPositions[selectedVertice]
            let distance = this._selectedVertices[selectedVertice]

            let fullHeight = height * this._direction * this._invertDirection
            if (distance < radius * 0.3) {
                position.y += fullHeight
            } else {
                position.y += fullHeight * (1.0 - (distance - radius * 0.3) / (radius * 0.7))
            }

            if (position.y > this.heightMax)
                position.y = this.heightMax
            else if (position.y < this.heightMin)
                position.y = this.heightMin

            this._groundVerticesPositions[selectedVertice * 3 + 1] = position.y

            this.updateSubdivisions(selectedVertice)
        }

        // Normals
        this.reComputeNormals()

        // Update vertex buffer
        this._ground.updateVerticesData(BABYLON.VertexBuffer.PositionKind, this._groundVerticesPositions)
        this._ground.updateVerticesData(BABYLON.VertexBuffer.NormalKind, this._groundVerticesNormals)
    }

    private updateSubdivisions(vertexIndex: number) {
        for (let index = 0; index < this._subdivisionsOfVertices[vertexIndex].length; index++) {
            let sub = this._subdivisionsOfVertices[vertexIndex][index]
            let boundingBox = sub.getBoundingInfo().boundingBox
            let boundingSphere = sub.getBoundingInfo().boundingSphere

            if (this._groundPositions[vertexIndex].y < boundingBox.minimum.y) {
                boundingSphere.radius += Math.abs(this._groundPositions[vertexIndex].y - boundingBox.minimum.y)
                boundingBox.minimum.y = this._groundPositions[vertexIndex].y
            } else if (this._groundPositions[vertexIndex].y > boundingBox.maximum.y) {
                boundingBox.maximum.y = this._groundPositions[vertexIndex].y
            }
        }

        let boundingBox = this._ground.getBoundingInfo().boundingBox
        let boundingSphere = this._ground.getBoundingInfo().boundingSphere
        if (this._groundPositions[vertexIndex].y < boundingBox.minimum.y) {
            boundingSphere.radius += Math.abs(this._groundPositions[vertexIndex].y - boundingBox.minimum.y)
            boundingBox.minimum.y = this._groundPositions[vertexIndex].y
        } else if (this._groundPositions[vertexIndex].y > boundingBox.maximum.y) {
            boundingBox.maximum.y = this._groundPositions[vertexIndex].y
        }
    }

    private reComputeNormals = function () {
        let faces = []
        let face

        for (let selectedVertice of this._selectedVertices) {
            let faceOfVertices = this._facesOfVertices[selectedVertice]
            for (let index = 0; index < faceOfVertices.length; index++) {
                faces[faceOfVertices[index]] = true
            }
        }

        for (face of faces) {
            this._computeFaceNormal(face)
        }

        for (face of faces) {
            let faceInfo = this._getFaceVerticesIndex(face)
            this._computeNormal(faceInfo.v1)
            this._computeNormal(faceInfo.v2)
            this._computeNormal(faceInfo.v3)
        }
    }

    private isIntersected(boundingBox: BABYLON.BoundingBox, sphereCenter: BABYLON.Vector3, sphereRadius: number) {
        let vector = BABYLON.Vector3.Clamp(sphereCenter, boundingBox.minimumWorld, boundingBox.maximumWorld)
        let num = BABYLON.Vector3.DistanceSquared(sphereCenter, vector)
        return (num <= (sphereRadius * sphereRadius))
    }

    private prepareDataModelForElevation() {
        if (this._facesOfVertices == null) {
            this._facesOfVertices = []

            this._groundVerticesPositions = this._ground.getVerticesData(BABYLON.VertexBuffer.PositionKind)
            this._groundVerticesNormals = this._ground.getVerticesData(BABYLON.VertexBuffer.NormalKind)
            this._groundIndices = this._ground.getIndices()

            this._groundPositions = []
            let index
            for (index = 0; index < this._groundVerticesPositions.length; index += 3) {
                this._groundPositions.push(new BABYLON.Vector3(this._groundVerticesPositions[index], this._groundVerticesPositions[index + 1], this._groundVerticesPositions[index + 2]))
            }


            for (index = 0; index < this._ground.getTotalIndices() / 3; index++) {
                this._computeFaceNormal(index)
            }

            this.getFacesOfVertices()
        }
    }

    private _computeFaceNormal(face: number) {
        let faceInfo = this.getFaceVerticesIndex(face)

        let v1v2 = this._groundPositions[faceInfo.v1].subtract(this._groundPositions[faceInfo.v2])
        let v3v2 = this._groundPositions[faceInfo.v3].subtract(this._groundPositions[faceInfo.v2])

        this._groundFacesNormals[face] = BABYLON.Vector3.Normalize(BABYLON.Vector3.Cross(v1v2, v3v2))
    }

    private getFaceVerticesIndex(faceID: number) {
        return {
            v1: this._groundIndices[faceID * 3],
            v2: this._groundIndices[faceID * 3 + 1],
            v3: this._groundIndices[faceID * 3 + 2]
        }
    }

    private getFacesOfVertices() {
        this._facesOfVertices = []
        this._subdivisionsOfVertices = []
        let index

        for (index = 0; index < this._groundPositions.length; index++) {
            this._facesOfVertices[index] = []
            this._subdivisionsOfVertices[index] = []
        }

        for (index = 0; index < this._groundIndices.length; index++) {
            this._facesOfVertices[this._groundIndices[index]].push((index / 3) | 0)
        }

        for (let subIndex = 0; subIndex < this._ground.subMeshes.length; subIndex++) {
            let subMesh = this._ground.subMeshes[subIndex]
            for (index = subMesh.verticesStart; index < subMesh.verticesStart + subMesh.verticesCount; index++) {
                this._subdivisionsOfVertices[index].push(subMesh)
            }
        }
    }
    private computeNormal(vertexIndex: number) {
        let faces = this._facesOfVertices[vertexIndex]

        let normal = BABYLON.Vector3.Zero()
        for (let index = 0; index < faces.length; index++) {
            normal = normal.add(this._groundFacesNormals[faces[index]])
        }

        normal = BABYLON.Vector3.Normalize(normal.scale(1.0 / faces.length))

        this._groundVerticesNormals[vertexIndex * 3] = normal.x
        this._groundVerticesNormals[vertexIndex * 3 + 1] = normal.y
        this._groundVerticesNormals[vertexIndex * 3 + 2] = normal.z
    }

    private onPointerDown(event: PointerEvent) {
        event.preventDefault()

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
        console.log("down - " + JSON.stringify(this._currentPosition))
    }

    private onPointerUp(event: PointerEvent) {
        event.preventDefault()

        this._currentPosition = null
        console.log("up")
    }

    private onPointerMove(event: PointerEvent) {
        event.preventDefault()

        if (!this._currentPosition) {
            return
        }

        this._invertDirection = event.button == 2 ? -1 : 1

        this._currentPosition = {
            x: event.clientX,
            y: event.clientY
        }
    }

    private onLostFocus() {
        this._currentPosition = null
        console.log("up")
    }
}
