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
     * SocketGameMessageType enum.
     * @exports SocketGameMessageType
     * @enum {string}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} JOIN=1 JOIN value
     * @property {number} MOVE=2 MOVE value
     * @property {number} LEAVE=3 LEAVE value
     * @property {number} GET_STATE=4 GET_STATE value
     * @property {number} STATE=5 STATE value
     */
    $root.SocketGameMessageType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "JOIN"] = 1;
        values[valuesById[2] = "MOVE"] = 2;
        values[valuesById[3] = "LEAVE"] = 3;
        values[valuesById[4] = "GET_STATE"] = 4;
        values[valuesById[5] = "STATE"] = 5;
        return values;
    })();
    
    $root.SocketGameMessage = (function() {
    
        /**
         * Properties of a SocketGameMessage.
         * @exports ISocketGameMessage
         * @interface ISocketGameMessage
         * @property {SocketGameMessageType} [eventType] SocketGameMessage eventType
         * @property {string} [eventSource] SocketGameMessage eventSource
         * @property {number} [x] SocketGameMessage x
         * @property {number} [y] SocketGameMessage y
         * @property {number} [z] SocketGameMessage z
         */
    
        /**
         * Constructs a new SocketGameMessage.
         * @exports SocketGameMessage
         * @classdesc Represents a SocketGameMessage.
         * @constructor
         * @param {ISocketGameMessage=} [properties] Properties to set
         */
        function SocketGameMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * SocketGameMessage eventType.
         * @member {SocketGameMessageType}eventType
         * @memberof SocketGameMessage
         * @instance
         */
        SocketGameMessage.prototype.eventType = 0;
    
        /**
         * SocketGameMessage eventSource.
         * @member {string}eventSource
         * @memberof SocketGameMessage
         * @instance
         */
        SocketGameMessage.prototype.eventSource = "";
    
        /**
         * SocketGameMessage x.
         * @member {number}x
         * @memberof SocketGameMessage
         * @instance
         */
        SocketGameMessage.prototype.x = 0;
    
        /**
         * SocketGameMessage y.
         * @member {number}y
         * @memberof SocketGameMessage
         * @instance
         */
        SocketGameMessage.prototype.y = 0;
    
        /**
         * SocketGameMessage z.
         * @member {number}z
         * @memberof SocketGameMessage
         * @instance
         */
        SocketGameMessage.prototype.z = 0;
    
        /**
         * Creates a new SocketGameMessage instance using the specified properties.
         * @function create
         * @memberof SocketGameMessage
         * @static
         * @param {ISocketGameMessage=} [properties] Properties to set
         * @returns {SocketGameMessage} SocketGameMessage instance
         */
        SocketGameMessage.create = function create(properties) {
            return new SocketGameMessage(properties);
        };
    
        /**
         * Encodes the specified SocketGameMessage message. Does not implicitly {@link SocketGameMessage.verify|verify} messages.
         * @function encode
         * @memberof SocketGameMessage
         * @static
         * @param {ISocketGameMessage} message SocketGameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SocketGameMessage.encode = function encode(message, writer) {
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
         * Encodes the specified SocketGameMessage message, length delimited. Does not implicitly {@link SocketGameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SocketGameMessage
         * @static
         * @param {ISocketGameMessage} message SocketGameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SocketGameMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes a SocketGameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof SocketGameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SocketGameMessage} SocketGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SocketGameMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.SocketGameMessage();
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
         * Decodes a SocketGameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SocketGameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SocketGameMessage} SocketGameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SocketGameMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies a SocketGameMessage message.
         * @function verify
         * @memberof SocketGameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SocketGameMessage.verify = function verify(message) {
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
         * Creates a SocketGameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SocketGameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SocketGameMessage} SocketGameMessage
         */
        SocketGameMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.SocketGameMessage)
                return object;
            var message = new $root.SocketGameMessage();
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
         * Creates a plain object from a SocketGameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SocketGameMessage
         * @static
         * @param {SocketGameMessage} message SocketGameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SocketGameMessage.toObject = function toObject(message, options) {
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
                object.eventType = options.enums === String ? $root.SocketGameMessageType[message.eventType] : message.eventType;
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
         * Converts this SocketGameMessage to JSON.
         * @function toJSON
         * @memberof SocketGameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SocketGameMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return SocketGameMessage;
    })();
    
    $root.ApiGameDescription = (function() {
    
        /**
         * Properties of an ApiGameDescription.
         * @exports IApiGameDescription
         * @interface IApiGameDescription
         * @property {string} [id] ApiGameDescription id
         * @property {string} [name] ApiGameDescription name
         * @property {Array.<string>} [objects] ApiGameDescription objects
         */
    
        /**
         * Constructs a new ApiGameDescription.
         * @exports ApiGameDescription
         * @classdesc Represents an ApiGameDescription.
         * @constructor
         * @param {IApiGameDescription=} [properties] Properties to set
         */
        function ApiGameDescription(properties) {
            this.objects = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ApiGameDescription id.
         * @member {string}id
         * @memberof ApiGameDescription
         * @instance
         */
        ApiGameDescription.prototype.id = "";
    
        /**
         * ApiGameDescription name.
         * @member {string}name
         * @memberof ApiGameDescription
         * @instance
         */
        ApiGameDescription.prototype.name = "";
    
        /**
         * ApiGameDescription objects.
         * @member {Array.<string>}objects
         * @memberof ApiGameDescription
         * @instance
         */
        ApiGameDescription.prototype.objects = $util.emptyArray;
    
        /**
         * Creates a new ApiGameDescription instance using the specified properties.
         * @function create
         * @memberof ApiGameDescription
         * @static
         * @param {IApiGameDescription=} [properties] Properties to set
         * @returns {ApiGameDescription} ApiGameDescription instance
         */
        ApiGameDescription.create = function create(properties) {
            return new ApiGameDescription(properties);
        };
    
        /**
         * Encodes the specified ApiGameDescription message. Does not implicitly {@link ApiGameDescription.verify|verify} messages.
         * @function encode
         * @memberof ApiGameDescription
         * @static
         * @param {IApiGameDescription} message ApiGameDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiGameDescription.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.objects != null && message.objects.length)
                for (var i = 0; i < message.objects.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.objects[i]);
            return writer;
        };
    
        /**
         * Encodes the specified ApiGameDescription message, length delimited. Does not implicitly {@link ApiGameDescription.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ApiGameDescription
         * @static
         * @param {IApiGameDescription} message ApiGameDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiGameDescription.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an ApiGameDescription message from the specified reader or buffer.
         * @function decode
         * @memberof ApiGameDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ApiGameDescription} ApiGameDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiGameDescription.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApiGameDescription();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    if (!(message.objects && message.objects.length))
                        message.objects = [];
                    message.objects.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an ApiGameDescription message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ApiGameDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ApiGameDescription} ApiGameDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiGameDescription.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an ApiGameDescription message.
         * @function verify
         * @memberof ApiGameDescription
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiGameDescription.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.objects != null && message.hasOwnProperty("objects")) {
                if (!Array.isArray(message.objects))
                    return "objects: array expected";
                for (var i = 0; i < message.objects.length; ++i)
                    if (!$util.isString(message.objects[i]))
                        return "objects: string[] expected";
            }
            return null;
        };
    
        /**
         * Creates an ApiGameDescription message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ApiGameDescription
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ApiGameDescription} ApiGameDescription
         */
        ApiGameDescription.fromObject = function fromObject(object) {
            if (object instanceof $root.ApiGameDescription)
                return object;
            var message = new $root.ApiGameDescription();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.objects) {
                if (!Array.isArray(object.objects))
                    throw TypeError(".ApiGameDescription.objects: array expected");
                message.objects = [];
                for (var i = 0; i < object.objects.length; ++i)
                    message.objects[i] = String(object.objects[i]);
            }
            return message;
        };
    
        /**
         * Creates a plain object from an ApiGameDescription message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ApiGameDescription
         * @static
         * @param {ApiGameDescription} message ApiGameDescription
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiGameDescription.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.objects = [];
            if (options.defaults) {
                object.id = "";
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.objects && message.objects.length) {
                object.objects = [];
                for (var j = 0; j < message.objects.length; ++j)
                    object.objects[j] = message.objects[j];
            }
            return object;
        };
    
        /**
         * Converts this ApiGameDescription to JSON.
         * @function toJSON
         * @memberof ApiGameDescription
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiGameDescription.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return ApiGameDescription;
    })();
    
    $root.ApiMeshDescription = (function() {
    
        /**
         * Properties of an ApiMeshDescription.
         * @exports IApiMeshDescription
         * @interface IApiMeshDescription
         * @property {string} [id] ApiMeshDescription id
         * @property {string} [name] ApiMeshDescription name
         * @property {string} [objectPath] ApiMeshDescription objectPath
         * @property {number} [posX] ApiMeshDescription posX
         * @property {number} [posY] ApiMeshDescription posY
         * @property {number} [posZ] ApiMeshDescription posZ
         * @property {number} [scale] ApiMeshDescription scale
         */
    
        /**
         * Constructs a new ApiMeshDescription.
         * @exports ApiMeshDescription
         * @classdesc Represents an ApiMeshDescription.
         * @constructor
         * @param {IApiMeshDescription=} [properties] Properties to set
         */
        function ApiMeshDescription(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }
    
        /**
         * ApiMeshDescription id.
         * @member {string}id
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.id = "";
    
        /**
         * ApiMeshDescription name.
         * @member {string}name
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.name = "";
    
        /**
         * ApiMeshDescription objectPath.
         * @member {string}objectPath
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.objectPath = "";
    
        /**
         * ApiMeshDescription posX.
         * @member {number}posX
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.posX = 0;
    
        /**
         * ApiMeshDescription posY.
         * @member {number}posY
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.posY = 0;
    
        /**
         * ApiMeshDescription posZ.
         * @member {number}posZ
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.posZ = 0;
    
        /**
         * ApiMeshDescription scale.
         * @member {number}scale
         * @memberof ApiMeshDescription
         * @instance
         */
        ApiMeshDescription.prototype.scale = 0;
    
        /**
         * Creates a new ApiMeshDescription instance using the specified properties.
         * @function create
         * @memberof ApiMeshDescription
         * @static
         * @param {IApiMeshDescription=} [properties] Properties to set
         * @returns {ApiMeshDescription} ApiMeshDescription instance
         */
        ApiMeshDescription.create = function create(properties) {
            return new ApiMeshDescription(properties);
        };
    
        /**
         * Encodes the specified ApiMeshDescription message. Does not implicitly {@link ApiMeshDescription.verify|verify} messages.
         * @function encode
         * @memberof ApiMeshDescription
         * @static
         * @param {IApiMeshDescription} message ApiMeshDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiMeshDescription.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.objectPath != null && message.hasOwnProperty("objectPath"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.objectPath);
            if (message.posX != null && message.hasOwnProperty("posX"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.posX);
            if (message.posY != null && message.hasOwnProperty("posY"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.posY);
            if (message.posZ != null && message.hasOwnProperty("posZ"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.posZ);
            if (message.scale != null && message.hasOwnProperty("scale"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.scale);
            return writer;
        };
    
        /**
         * Encodes the specified ApiMeshDescription message, length delimited. Does not implicitly {@link ApiMeshDescription.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ApiMeshDescription
         * @static
         * @param {IApiMeshDescription} message ApiMeshDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiMeshDescription.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };
    
        /**
         * Decodes an ApiMeshDescription message from the specified reader or buffer.
         * @function decode
         * @memberof ApiMeshDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ApiMeshDescription} ApiMeshDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiMeshDescription.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ApiMeshDescription();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.objectPath = reader.string();
                    break;
                case 4:
                    message.posX = reader.double();
                    break;
                case 5:
                    message.posY = reader.double();
                    break;
                case 6:
                    message.posZ = reader.double();
                    break;
                case 7:
                    message.scale = reader.double();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };
    
        /**
         * Decodes an ApiMeshDescription message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ApiMeshDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ApiMeshDescription} ApiMeshDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiMeshDescription.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };
    
        /**
         * Verifies an ApiMeshDescription message.
         * @function verify
         * @memberof ApiMeshDescription
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiMeshDescription.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.objectPath != null && message.hasOwnProperty("objectPath"))
                if (!$util.isString(message.objectPath))
                    return "objectPath: string expected";
            if (message.posX != null && message.hasOwnProperty("posX"))
                if (typeof message.posX !== "number")
                    return "posX: number expected";
            if (message.posY != null && message.hasOwnProperty("posY"))
                if (typeof message.posY !== "number")
                    return "posY: number expected";
            if (message.posZ != null && message.hasOwnProperty("posZ"))
                if (typeof message.posZ !== "number")
                    return "posZ: number expected";
            if (message.scale != null && message.hasOwnProperty("scale"))
                if (typeof message.scale !== "number")
                    return "scale: number expected";
            return null;
        };
    
        /**
         * Creates an ApiMeshDescription message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ApiMeshDescription
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ApiMeshDescription} ApiMeshDescription
         */
        ApiMeshDescription.fromObject = function fromObject(object) {
            if (object instanceof $root.ApiMeshDescription)
                return object;
            var message = new $root.ApiMeshDescription();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.objectPath != null)
                message.objectPath = String(object.objectPath);
            if (object.posX != null)
                message.posX = Number(object.posX);
            if (object.posY != null)
                message.posY = Number(object.posY);
            if (object.posZ != null)
                message.posZ = Number(object.posZ);
            if (object.scale != null)
                message.scale = Number(object.scale);
            return message;
        };
    
        /**
         * Creates a plain object from an ApiMeshDescription message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ApiMeshDescription
         * @static
         * @param {ApiMeshDescription} message ApiMeshDescription
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiMeshDescription.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.objectPath = "";
                object.posX = 0;
                object.posY = 0;
                object.posZ = 0;
                object.scale = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.objectPath != null && message.hasOwnProperty("objectPath"))
                object.objectPath = message.objectPath;
            if (message.posX != null && message.hasOwnProperty("posX"))
                object.posX = options.json && !isFinite(message.posX) ? String(message.posX) : message.posX;
            if (message.posY != null && message.hasOwnProperty("posY"))
                object.posY = options.json && !isFinite(message.posY) ? String(message.posY) : message.posY;
            if (message.posZ != null && message.hasOwnProperty("posZ"))
                object.posZ = options.json && !isFinite(message.posZ) ? String(message.posZ) : message.posZ;
            if (message.scale != null && message.hasOwnProperty("scale"))
                object.scale = options.json && !isFinite(message.scale) ? String(message.scale) : message.scale;
            return object;
        };
    
        /**
         * Converts this ApiMeshDescription to JSON.
         * @function toJSON
         * @memberof ApiMeshDescription
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiMeshDescription.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
    
        return ApiMeshDescription;
    })();

    return $root;
});
