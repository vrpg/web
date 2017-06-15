class GameMessage {
    _eventName: string;
    _eventSource: string;
    _eventContent: any;

    constructor(eventName: string, eventSource: string, eventContent: any) {
        this._eventName = eventName;
        this._eventSource = eventSource;
        this._eventContent = eventContent;
    }
}
class GameMessageType {
    static readonly JOIN = "join";
    static readonly MOVE = "move";
    static readonly LEAVE = "leave";
    static readonly GET_STATE = "get_state";
    static readonly STATE = "state";
}
export { GameMessage, GameMessageType }
