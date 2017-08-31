import { GameMessage } from './GameMessage';
import { EventListener } from './EventListener';

class EventSocket {
    private _socket: WebSocket;
    private _listeners: EventListener[];
    private _isConnected: boolean;
    private _opOpenCallback: () => void;

    constructor() {
        var url: string = WEBSOCKET_URL + "/test";
        this._socket = new WebSocket(url);
        this._listeners = [];
        this._isConnected = false;

        this._socket.onopen = (onOpenEvent) => {
            console.log("Websocket connection is established!");
            this._isConnected = true;
            this._opOpenCallback();
        };
        this._socket.onclose = (onCloseEvent) => {
            console.log("Websocket connection is closed!");
            this._isConnected = false;
        }
        this._socket.onerror = (onErrorEvent) => {
            console.error("Websocket error: " + onErrorEvent);
        }
        this._socket.onmessage = (onMessageEvent) => {
            console.log("onmessage: " + onMessageEvent);

            let json = JSON.parse(onMessageEvent.data);
            var gameEvent = new GameMessage(json.eventName, json.eventSource, json.eventContent);
            this.notifyListeners(gameEvent);
        }
    }

    public onOpen(callback: () => void): void {
        this._opOpenCallback = callback;
    }

    public sendEvent(event: GameMessage): void {
        if (!this._isConnected) {
            console.warn("Not connected!");
            return;
        }
        var message = {
            eventName: event._eventName,
            eventSource: event._eventSource,
            eventContent: event._eventContent
        };
        this._socket.send(JSON.stringify(message));
    }

    private notifyListeners(event: GameMessage): void {
        this._listeners.forEach(listener => {
            listener.onEvent(event);
        });
    }

    public addEventListener(listener: EventListener): ListenerRegistration {
        this._listeners.push(listener);

        var registration: ListenerRegistration = {
            removeListener(): void {
                let index: number = this._listeners.indexOf(listener);
                if (index > -1) {
                    this._listeners.splice(index, 1);
                } else {
                    throw new Error("Unexpected state. Listeners not contains the listener!");
                }
            }
        };

        return registration;
    }
}
interface ListenerRegistration {
    removeListener(): void;
}

export { EventSocket, ListenerRegistration }