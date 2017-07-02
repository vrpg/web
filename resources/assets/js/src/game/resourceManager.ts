/// <reference path="../references.ts" />

namespace ResourceManager {
    var _manager: BABYLON.AssetsManager;

    export function createManager(scene: BABYLON.Scene): void {
        this._manager = new BABYLON.AssetsManager(scene);
    }

    export function getManager(): BABYLON.AssetsManager {
        return this._manager;
    }
}
