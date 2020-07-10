const WebSocket  = require('ws');

/** Class that deals with the low level handling of websocket to devices.
 *
 * This is the only class and children can use ws module when it comes to devices.
 */
class DeviceWs {
    constructor() {
        this.ws = new WebSocket.Server({noServer: true});
    }

    /** Try to send a message to a device. If the device is not connected the message will be dropped.
     * 
     * @param {string} deviceName
     * @param {any} jsonMessage
     * @returns {boolean} If there was a connection to send message too.
     */
    sendMessage(deviceName, jsonMessage){
        //TODO needs to handle a connection at some point.

        console.log(`Trying to send message to ${deviceName} but its not implemented. Payload:\n`, jsonMessage);
        
        return false;
    }

    /** Register a callback for used with device. The callback will be reused when device connects / disconnects.
     * 
     * @param {string} deviceName
     * @param {Function} callback The callback return a js object with the parsed json data from device.
     */
    onMessage(deviceName, callback) {
        //TODO
    }

    /** Gets the current ready state for the device in question. 3 (CLOSED) if no connections exist
     * 
     * @param {string} deviceName
     * @return {number} WebSocket ready state.
     */
    getState(deviceName) {
        return 3
    }

    /** Calls callback when connection have been open or closed for that device. 
     * @param {string} deviceName
     * @param {Function} callback
     */
    onStateChange(deviceName, callback) {
        //TODO
    }

    /**
     * @param {string} deviceName
     * @param {import("http").IncomingMessage} request
     * @param {import("net").Socket} socket
     * @param {Buffer} head
     */
    handleUpgrade(deviceName, request, socket, head) {
        this.ws.handleUpgrade(request, socket, head, function(websocket) {
            //TODO handle websocket
        })
    }
}

module.exports = DeviceWs;