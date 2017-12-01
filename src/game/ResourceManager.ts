import { UUID } from '../util/uuid';
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'

namespace ResourceManager {
    var _manager: BABYLON.AssetsManager;

    export function createManager(scene: BABYLON.Scene): void {
        this._manager = new BABYLON.AssetsManager(scene);
    }

    export function addTextureTask(name: string, requestedObject: string): BABYLON.TextureAssetTask {
        let requestUrl = API_URL + "/resources/textures/" + requestedObject;
        return this._manager.addTextureTask(name, requestUrl);
    }

    export function addMeshTask(sceneFilename: string): BABYLON.MeshAssetTask {
        let rootUrl = API_URL + "/resources/meshes/";
        return this._manager.addMeshTask("mesh-task-" + UUID.generateUUID(), "", rootUrl, sceneFilename);
    }

    export function load(): void {
        this._manager.load();
    }
}

export { ResourceManager }
