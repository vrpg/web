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
export { GameMessage }
