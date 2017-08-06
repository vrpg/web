/// <reference path="../references.ts" />

namespace ResourceManager {
    var _manager: BABYLON.AssetsManager;

    export function createManager(scene: BABYLON.Scene): void {
        this._manager = new BABYLON.AssetsManager(scene);
    }

    export function addTextureTask(name: string, requestedObject: string): BABYLON.ITextureAssetTask {
        let requestUrl = API_URL + "/resources/" + requestedObject;
        return this._manager.addTextureTask(name, requestUrl);
    }

    export function load(): void {
        this._manager.load();
    }
}

export { ResourceManager }
