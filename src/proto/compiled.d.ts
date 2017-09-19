import * as $protobuf from "protobufjs";

/** SocketGameMessageType enum. */
export enum SocketGameMessageType {
    UNKNOWN = 0,
    JOIN = 1,
    MOVE = 2,
    LEAVE = 3,
    GET_STATE = 4,
    STATE = 5
}

/** Properties of a SocketGameMessage. */
export interface ISocketGameMessage {

    /** SocketGameMessage eventType */
    eventType?: SocketGameMessageType;

    /** SocketGameMessage eventSource */
    eventSource?: string;

    /** SocketGameMessage x */
    x?: number;

    /** SocketGameMessage y */
    y?: number;

    /** SocketGameMessage z */
    z?: number;
}

/** Represents a SocketGameMessage. */
export class SocketGameMessage {

    /**
     * Constructs a new SocketGameMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: ISocketGameMessage);

    /** SocketGameMessage eventType. */
    public eventType: SocketGameMessageType;

    /** SocketGameMessage eventSource. */
    public eventSource: string;

    /** SocketGameMessage x. */
    public x: number;

    /** SocketGameMessage y. */
    public y: number;

    /** SocketGameMessage z. */
    public z: number;

    /**
     * Creates a new SocketGameMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SocketGameMessage instance
     */
    public static create(properties?: ISocketGameMessage): SocketGameMessage;

    /**
     * Encodes the specified SocketGameMessage message. Does not implicitly {@link SocketGameMessage.verify|verify} messages.
     * @param message SocketGameMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: ISocketGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified SocketGameMessage message, length delimited. Does not implicitly {@link SocketGameMessage.verify|verify} messages.
     * @param message SocketGameMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: ISocketGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SocketGameMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SocketGameMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): SocketGameMessage;

    /**
     * Decodes a SocketGameMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SocketGameMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): SocketGameMessage;

    /**
     * Verifies a SocketGameMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a SocketGameMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SocketGameMessage
     */
    public static fromObject(object: { [k: string]: any }): SocketGameMessage;

    /**
     * Creates a plain object from a SocketGameMessage message. Also converts values to other types if specified.
     * @param message SocketGameMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: SocketGameMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this SocketGameMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ApiGameDescription. */
export interface IApiGameDescription {

    /** ApiGameDescription id */
    id?: string;

    /** ApiGameDescription name */
    name?: string;

    /** ApiGameDescription objects */
    objects?: string[];
}

/** Represents an ApiGameDescription. */
export class ApiGameDescription {

    /**
     * Constructs a new ApiGameDescription.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApiGameDescription);

    /** ApiGameDescription id. */
    public id: string;

    /** ApiGameDescription name. */
    public name: string;

    /** ApiGameDescription objects. */
    public objects: string[];

    /**
     * Creates a new ApiGameDescription instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApiGameDescription instance
     */
    public static create(properties?: IApiGameDescription): ApiGameDescription;

    /**
     * Encodes the specified ApiGameDescription message. Does not implicitly {@link ApiGameDescription.verify|verify} messages.
     * @param message ApiGameDescription message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApiGameDescription, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApiGameDescription message, length delimited. Does not implicitly {@link ApiGameDescription.verify|verify} messages.
     * @param message ApiGameDescription message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApiGameDescription, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApiGameDescription message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApiGameDescription
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApiGameDescription;

    /**
     * Decodes an ApiGameDescription message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApiGameDescription
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApiGameDescription;

    /**
     * Verifies an ApiGameDescription message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApiGameDescription message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApiGameDescription
     */
    public static fromObject(object: { [k: string]: any }): ApiGameDescription;

    /**
     * Creates a plain object from an ApiGameDescription message. Also converts values to other types if specified.
     * @param message ApiGameDescription
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApiGameDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApiGameDescription to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of an ApiMeshDescription. */
export interface IApiMeshDescription {

    /** ApiMeshDescription id */
    id?: string;

    /** ApiMeshDescription name */
    name?: string;

    /** ApiMeshDescription objectPath */
    objectPath?: string;

    /** ApiMeshDescription posX */
    posX?: number;

    /** ApiMeshDescription posY */
    posY?: number;

    /** ApiMeshDescription posZ */
    posZ?: number;

    /** ApiMeshDescription scale */
    scale?: number;
}

/** Represents an ApiMeshDescription. */
export class ApiMeshDescription {

    /**
     * Constructs a new ApiMeshDescription.
     * @param [properties] Properties to set
     */
    constructor(properties?: IApiMeshDescription);

    /** ApiMeshDescription id. */
    public id: string;

    /** ApiMeshDescription name. */
    public name: string;

    /** ApiMeshDescription objectPath. */
    public objectPath: string;

    /** ApiMeshDescription posX. */
    public posX: number;

    /** ApiMeshDescription posY. */
    public posY: number;

    /** ApiMeshDescription posZ. */
    public posZ: number;

    /** ApiMeshDescription scale. */
    public scale: number;

    /**
     * Creates a new ApiMeshDescription instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ApiMeshDescription instance
     */
    public static create(properties?: IApiMeshDescription): ApiMeshDescription;

    /**
     * Encodes the specified ApiMeshDescription message. Does not implicitly {@link ApiMeshDescription.verify|verify} messages.
     * @param message ApiMeshDescription message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IApiMeshDescription, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ApiMeshDescription message, length delimited. Does not implicitly {@link ApiMeshDescription.verify|verify} messages.
     * @param message ApiMeshDescription message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IApiMeshDescription, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an ApiMeshDescription message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ApiMeshDescription
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ApiMeshDescription;

    /**
     * Decodes an ApiMeshDescription message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ApiMeshDescription
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ApiMeshDescription;

    /**
     * Verifies an ApiMeshDescription message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an ApiMeshDescription message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ApiMeshDescription
     */
    public static fromObject(object: { [k: string]: any }): ApiMeshDescription;

    /**
     * Creates a plain object from an ApiMeshDescription message. Also converts values to other types if specified.
     * @param message ApiMeshDescription
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ApiMeshDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ApiMeshDescription to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
