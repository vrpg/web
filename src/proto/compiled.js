/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    /**
     * GameMessageType enum.
     * @exports GameMessageType
     * @enum {string}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} JOIN=1 JOIN value
     * @property {number} MOVE=2 MOVE value
     * @property {number} LEAVE=3 LEAVE value
     * @property {number} GET_STATE=4 GET_STATE value
     * @property {number} STATE=5 STATE value
     */
    $root.GameMessageType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "JOIN"] = 1;
        values[valuesById[2] = "MOVE"] = 2;
        values[valuesById[3] = "LEAVE"] = 3;
        values[valuesById[4] = "GET_STATE"] = 4;
        values[valuesById[5] = "STATE"] = 5;
        return values;
    })();
    
    $root.GameMessage = (function() {
    
        /**
         * Properties of a GameMessage.
         * @exports IGameMessage
         * @interface IGameMessage
         * @property {GameMessageType} [eventType] GameMessage eventType
         * @property {string} [eventSource] GameMessage eventSource
         * @property {number} [x] GameMessage x
         * @property {number} [y] GameMessage y
         * @property {number} [z] GameMessage z
         */
    
        /**
         * Constructs a new GameMessage.
         * @exports GameMessage
         * @classdesc Represents a GameMessage.
         * @constructor
         * @param {IGameMessage=} [properties] Properties to set
         */
        function GameMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * GameMessage eventType.
         * @member {GameMessageType}eventType
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.eventType = 0;
    
        /**
         * GameMessage eventSource.
         * @member {string}eventSource
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.eventSource = "";
    
        /**
         * GameMessage x.
         * @member {number}x
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.x = 0;
    
        /**
         * GameMessage y.
         * @member {number}y
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.y = 0;
    
        /**
         * GameMessage z.
         * @member {number}z
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.z = 0;
    
        /**
         * Creates a new GameMessage instance using the specified properties.
         * @function create
         * @memberof GameMessage
         * @static
         * @param {IGameMessage=} [properties] Properties to set
         * @returns {GameMessage} GameMessage instance
         */
        GameMessage.create = function create(properties) {
            return new GameMessage(properties);
        };
    
        /**
         * Encodes the specified GameMessage message. Does not implicitly {@link GameMessage.verify|verify} messages.
         * @function encode
         * @memberof GameMessage
         * @static
         * @param {IGameMessage} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.eventType);
            if (message.eventSource != null && message.hasOwnProperty("eventSource"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.eventSource);
            if (message.x != null && message.hasOwnProperty("x"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.x);
            if (message.y != null && message.hasOwnProperty("y"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.y);
            if (message.z != null && message.hasOwnProperty("z"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.z);
            return writer;
        };
    
        /**
         * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link GameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof GameMessage
         * @static
         * @param {IGameMessage} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a GameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {GameMessage} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.eventType = reader.int32();
                    break;
                case 2:
                    message.eventSource = reader.string();
                    break;
                case 3:
                    message.x = reader.double();
                    break;
                case 4:
                    message.y = reader.double();
                    break;
                case 5:
                    message.z = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes a GameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {GameMessage} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a GameMessage message.
         * @function verify
         * @memberof GameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                switch (message.eventType) {
                default:
                    return "eventType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.eventSource != null && message.hasOwnProperty("eventSource"))
                if (!$util.isString(message.eventSource))
                    return "eventSource: string expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };
    
        /**
         * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof GameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {GameMessage} GameMessage
         */
        GameMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.GameMessage)
                return object;
            var message = new $root.GameMessage();
            switch (object.eventType) {
            case "UNKNOWN":
            case 0:
                message.eventType = 0;
                break;
            case "JOIN":
            case 1:
                message.eventType = 1;
                break;
            case "MOVE":
            case 2:
                message.eventType = 2;
                break;
            case "LEAVE":
            case 3:
                message.eventType = 3;
                break;
            case "GET_STATE":
            case 4:
                message.eventType = 4;
                break;
            case "STATE":
            case 5:
                message.eventType = 5;
                break;
            }
            if (object.eventSource != null)
                message.eventSource = String(object.eventSource);
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };
    
        /**
         * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof GameMessage
         * @static
         * @param {GameMessage} message GameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.eventType = options.enums === String ? "UNKNOWN" : 0;
                object.eventSource = "";
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                object.eventType = options.enums === String ? $root.GameMessageType[message.eventType] : message.eventType;
            if (message.eventSource != null && message.hasOwnProperty("eventSource"))
                object.eventSource = message.eventSource;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };
    
        /**
         * Converts this GameMessage to JSON.
         * @function toJSON
         * @memberof GameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return GameMessage;
    })();

    return $root;
});
