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
         * @property {Object.<string,string>} [eventContent] GameMessage eventContent
         */
    
        /**
         * Constructs a new GameMessage.
         * @exports GameMessage
         * @classdesc Represents a GameMessage.
         * @constructor
         * @param {IGameMessage=} [properties] Properties to set
         */
        function GameMessage(properties) {
            this.eventContent = {};
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
         * GameMessage eventContent.
         * @member {Object.<string,string>}eventContent
         * @memberof GameMessage
         * @instance
         */
        GameMessage.prototype.eventContent = $util.emptyObject;
    
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
            if (message.eventContent != null && message.hasOwnProperty("eventContent"))
                for (var keys = Object.keys(message.eventContent), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.eventContent[keys[i]]).ldelim();
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
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameMessage(), key;
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
                    reader.skip().pos++;
                    if (message.eventContent === $util.emptyObject)
                        message.eventContent = {};
                    key = reader.string();
                    reader.pos++;
                    message.eventContent[key] = reader.string();
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
            if (message.eventContent != null && message.hasOwnProperty("eventContent")) {
                if (!$util.isObject(message.eventContent))
                    return "eventContent: object expected";
                var key = Object.keys(message.eventContent);
                for (var i = 0; i < key.length; ++i)
                    if (!$util.isString(message.eventContent[key[i]]))
                        return "eventContent: string{k:string} expected";
            }
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
            if (object.eventContent) {
                if (typeof object.eventContent !== "object")
                    throw TypeError(".GameMessage.eventContent: object expected");
                message.eventContent = {};
                for (var keys = Object.keys(object.eventContent), i = 0; i < keys.length; ++i)
                    message.eventContent[keys[i]] = String(object.eventContent[keys[i]]);
            }
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
            if (options.objects || options.defaults)
                object.eventContent = {};
            if (options.defaults) {
                object.eventType = options.enums === String ? "UNKNOWN" : 0;
                object.eventSource = "";
            }
            if (message.eventType != null && message.hasOwnProperty("eventType"))
                object.eventType = options.enums === String ? $root.GameMessageType[message.eventType] : message.eventType;
            if (message.eventSource != null && message.hasOwnProperty("eventSource"))
                object.eventSource = message.eventSource;
            var keys2;
            if (message.eventContent && (keys2 = Object.keys(message.eventContent)).length) {
                object.eventContent = {};
                for (var j = 0; j < keys2.length; ++j)
                    object.eventContent[keys2[j]] = message.eventContent[keys2[j]];
            }
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
