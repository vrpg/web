import * as $protobuf from "protobufjs";

/** GameMessageType enum. */
export enum GameMessageType {
    UNKNOWN = 0,
    JOIN = 1,
    MOVE = 2,
    LEAVE = 3,
    GET_STATE = 4,
    STATE = 5
}

/** Properties of a GameMessage. */
export interface IGameMessage {

    /** GameMessage eventType */
    eventType?: GameMessageType;

    /** GameMessage eventSource */
    eventSource?: string;

    /** GameMessage eventContent */
    eventContent?: { [k: string]: string };
}

/** Represents a GameMessage. */
export class GameMessage {

    /**
     * Constructs a new GameMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IGameMessage);

    /** GameMessage eventType. */
    public eventType: GameMessageType;

    /** GameMessage eventSource. */
    public eventSource: string;

    /** GameMessage eventContent. */
    public eventContent: { [k: string]: string };

    /**
     * Creates a new GameMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GameMessage instance
     */
    public static create(properties?: IGameMessage): GameMessage;

    /**
     * Encodes the specified GameMessage message. Does not implicitly {@link GameMessage.verify|verify} messages.
     * @param message GameMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link GameMessage.verify|verify} messages.
     * @param message GameMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GameMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GameMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): GameMessage;

    /**
     * Decodes a GameMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GameMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): GameMessage;

    /**
     * Verifies a GameMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GameMessage
     */
    public static fromObject(object: { [k: string]: any }): GameMessage;

    /**
     * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
     * @param message GameMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: GameMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this GameMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
