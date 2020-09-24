var five = require("johnny-five")
var board = new five.Board();
    
var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};

var os = require('os');
var ifaces = os.networkInterfaces();

require('events').EventEmitter.prototype._maxListeners = 100;

  
board.on("ready", function() {
  var piezo = new five.Piezo(2);
  var led = new five.Led(12);
  // Injects the piezo into the repl
  board.repl.inject({
    piezo: piezo,
    led: led
  });
  
  // Create an Led on pin 13
 /* 

  // Strobe the pin on/off, defaults to 100ms phases
  


  // Plays a song
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
    tempo: 100
  });

  // Plays the same song with a string representation
  
*/

var motion = new five.Motion(11);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart");
    io.emit("motion", 'motion')
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend");
    io.emit("motionend", 'motionend')
  });

  // "data" events are fired at the interval set in opts.freq
  // or every 25ms. Uncomment the following to see all
  // motion detection readings.
  // motion.on("data", function(data) {
  //   console.log(data);
  // });



//This is the function that initiates the downloading of the files from the NVR


io.on("connection", function(socket) {
    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        
    });

    socket.on('action', function(data) {
        switch (data) {
            case 'lightsOn':
              led.on()
                console.log(data)
                    break;
                
                case 'alarm':
                    piezo.play({
                        // song is composed by a string of notes
                        // a default beat is set, and the default octave is used
                        // any invalid note is read as "no note"
                        song: "C D F D A ",
                        beats: 1 / 4,
                        tempo: 100
                      });
                    break;
                case 'lightsOff':
                  led.off();

                    break;
                case 'download':

                    break;
                default:

        }
    })
  
});
});
socketApi.io = io;

module.exports = socketApi;