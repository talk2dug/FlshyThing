
    
var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};
var dreamHost = require('socket.io-client')('http://192.168.196.123:3001');
var os = require('os');
var ifaces = os.networkInterfaces();
var player = require('play-sound')(opts = {})
require('events').EventEmitter.prototype._maxListeners = 100;




function playAudioFile(file){


  player.play('/home/pi/flashyThing/file_example_MP3_700KB.mp3', { timeout: 100 }, function(err){
    if (err) throw err
  })
 





}

//This is the function that initiates the downloading of the files from the NVR
var exec = require('child_process').exec;

function speak(words){
  exec(words , function(error, stdout, stderr) {
    if (error){
      console.log(error)
    }
    if (!error){
      console.log(stdout)
    }
  
  })


}
io.on("connection", function(socket) {
    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        
    });
    socket.on('speak', function(data) {
      console.log(data)
      console.log(data.length)
      var toSay = "espeak  '" + data +" '"
      if(toSay.length > data.length){
      speak(toSay)
    }
    })


    socket.on('action', function(data) {
      console.log(data)
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
                case 'playFile':
                  playAudioFile()
                    break;
                default:

        }
    })
  
});


var systemInfo = {
  "name":"FlashyThing",
  "ip":"192.168.196.113",
  "numOfCams":3,
  "type":"PTZ"



}
setInterval(() => {
  dreamHost.emit('systemOnline',systemInfo)
}, 10000);
socketApi.io = io;

module.exports = socketApi;