var httpUtils = require('./getFiles')
var SPD_Server = require('socket.io-client')('http://192.168.196.123:3000');
var socket_io = require('socket.io');
const moment = require('moment')
var io = socket_io();
var socketApi = {};
var alert = {}
let timestamp = {}
var os = require('os');
var ifaces = os.networkInterfaces();
const fs = require('fs');
require('events').EventEmitter.prototype._maxListeners = 100;
var timeoutID;
var endCallClicked = false
//Function to stop timer job
function clearAlert() {
    clearTimeout(timeoutID);
}
//This is the function that initiates the downloading of the files from the NVR
function downloadFiles() {
    httpUtils.getRTSPfileStream()
    httpUtils.getFile(1, moment())
    //Then runs every 15 min until time job stopped
    timeoutID = setTimeout(function() {
        httpUtils.getFile(1, moment())
        //here is we check to see if the flag "end call" has been clicked. If its true we stop the timer job
        if (endCallClicked) {
            clearAlert();
        }
    }, 900000)
}

io.on("connection", function(socket) {
    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function(iface) {
            console.log(ifname)
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            if (alias >= 1) {} else {
                ip = iface.address
            }
            ++alias;
        });
    });

    //Getting the GPS from the touchscreen PI
    socket.on('gpscarGPS', function(data) {
        //sending GPS data back out
        //console.log("car:  " + data.lon)

        SPD_Server.emit('gpscarGPS', data)
    })
    //Here is where we listen for socket calls and perform actions based on the data
    socket.on('bodyCamgps', function(data) {
        SPD_Server.emit('bodyCamGPS', data)
        //console.log("BodyCam:  " + data.lon)
    })
    socket.on('action', function(data) {
        switch (data) {
            case 'signIn':
                if (piUtils.isCardMounted() === true) {
                    console.log('SD card mounted')
                    //offTable = fs.readFileSync('officer.json');
                    //let officer = offTable.find(el => el.name === data.name)
                    //officer.badgenum
                    break;
                } else {
                    alert.type = "No drive mounted"
                    io.emit('driveAlert', alert)
                    break;
                }
                case 'startCall':
                    console.log("staaaart caaaaal")
                    datestamp = moment()
                    downloadFiles()
                    io.emit("bodyCam", "START")
                    break;
                case 'endCall':
                    console.log('end caaaal')
                    datestamp = moment()
                    endCallClicked = true
                    io.emit("bodyCam", "STOP")
                    httpUtils.stopFFMPEG()

                    break;
                case 'download':

                    //setTimeout(function(){
                    //downloadFiles()
                    break;
                default:

        }
    })
    socket.on('settings', function(data) {

        //io.emit('setting',data)
    })
});
socketApi.io = io;

socketApi.sendNotification = function() {
    io.sockets.emit('hello', {
        msg: 'Hello World!'
    });
}
module.exports = socketApi;