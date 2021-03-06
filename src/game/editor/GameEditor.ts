import { Animatable } from './../Animatable'
import { ElevationControl, ElevationMode } from './ElevationControl'
import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui'
import 'babylonjs-serializers'

export enum GameEditorMode {
    CAMERA, ELEVATION
}

export class GameEditor implements Animatable {
    private readonly _engine: BABYLON.Engine
    private readonly _canvas: HTMLCanvasElement
    private _elevationControls: ElevationControl
    private _scene: BABYLON.Scene
    private _editorMode: GameEditorMode
    private _camera: BABYLON.UniversalCamera
    private _ground: BABYLON.Mesh

    constructor(canvas: HTMLCanvasElement) {
        this._engine = new BABYLON.Engine(canvas, true)
        this._canvas = canvas
    }

    public exportGround(): string {
        let _export = BABYLON.OBJExport.OBJ([this._ground])
        console.log(_export)
        return _export
    }

    public createScene() {
        this._scene = new BABYLON.Scene(this._engine)
        this._scene.ambientColor = new BABYLON.Color3(1, 1, 1);

        this._camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 20, -20), this._scene)
        this._camera.setTarget(BABYLON.Vector3.Zero())
        this._camera.attachControl(this._canvas, true)

        let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 1), this._scene)

        this._ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: 20,
            height: 20,
            updatable: true,
            subdivisions: 200
        }, this._scene)
        this._elevationControls = new ElevationControl(this._ground)

        let myMaterial = new BABYLON.StandardMaterial("myMaterial", this._scene)
        myMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)

        this._ground.material = myMaterial;

        this.changeMode(GameEditorMode.CAMERA)
        this.createMenu()
    }

    public animate() {
        this._engine.runRenderLoop(() => {
            this._scene.render()
        })
        window.addEventListener('resize', () => {
            this._engine.resize()
        })
    }

    private createMenu() {
        let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('control_menu')

        let panel = new GUI.StackPanel()
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        panel.left = "20px"
        panel.top = "20px"
        advancedTexture.addControl(panel)

        let cameraButton = this.createButton("cameraButton", "Camera", GameEditorMode.CAMERA)
        cameraButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        panel.addControl(cameraButton)

        let elevationControlPanel = new GUI.StackPanel()
        elevationControlPanel.isVertical = false
        panel.addControl(elevationControlPanel)

        let elevationButton = this.createButton("elevationButton", "Elevation", GameEditorMode.ELEVATION)
        elevationControlPanel.addControl(elevationButton)

        let upButton = GUI.Button.CreateSimpleButton("upButton", "UP")
        upButton.height = "50px"
        upButton.width = "100px"
        upButton.onPointerDownObservable.add(() => { this._elevationControls.elevationMode = ElevationMode.UP })
        elevationControlPanel.addControl(upButton)

        let downButton = GUI.Button.CreateSimpleButton("downButton", "DOWN")
        downButton.height = "50px"
        downButton.width = "100px"
        downButton.onPointerDownObservable.add(() => { this._elevationControls.elevationMode = ElevationMode.DOWN })
        elevationControlPanel.addControl(downButton)

        let exportButton = GUI.Button.CreateSimpleButton("exportButton", "Export")
        exportButton.height = "50px"
        exportButton.width = "100px"
        exportButton.onPointerDownObservable.add(() => { this.exportGround() })
        panel.addControl(exportButton)
    }

    private createButton(name: string, text: string, toMode: GameEditorMode): GUI.Button {
        let button = GUI.Button.CreateSimpleButton(name, text)
        button.height = "50px"
        button.width = "100px"
        button.onPointerDownObservable.add(() => { this.changeMode(toMode) })

        return button
    }

    private changeMode(mode: GameEditorMode) {
        if (mode == null || mode === this._editorMode) {
            return
        }

        this._editorMode = mode

        switch (this._editorMode) {
            case GameEditorMode.CAMERA: {
                this._elevationControls.detachControl(this._canvas)
                this._camera.attachControl(this._canvas)
                break
            }
            case GameEditorMode.ELEVATION: {
                this._camera.detachControl(this._canvas)
                this._elevationControls.attachControl(this._canvas)
                break
            }
        }
    }
}
