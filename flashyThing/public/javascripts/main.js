var buttons = "<button type='button' class='btn btn-primary'>Lights On</button>"+
"<button type='button' class='btn btn-secondary'>Lights Off</button>"+
"<button type='button' class='btn btn-success'>Success</button>"+
"<button type='button' class='btn btn-danger'>Danger</button>"

var socket = io();
var mainServer = io('//192.168.196.113:3000/');
$(function() {
  mainServer.on('connect', function(state) {
    console.log("CONNECTED")
 })
 mainServer.on('motion', function(data) {
  
  $('#motion').html("<div class='alert alert-danger' role='alert'>"+
  "Motion has been detected!"+
"</div>")
console.log("MOTION")


 })
 mainServer.on('motionend', function(data) {
  $('#motion').html("")
console.log("MOTION END")


 })
 mainServer.on('cameraAlarm', function(data) {
  $('#cameraMotion').html("<div class='alert alert-danger' role='alert'>"+
  "Motion has been IN THE CAMERA!"+
"</div>")
mainServer.emit('action', "lightsOn");
console.log("MOTION CAMERA")
setTimeout(() => {
  $('#cameraMotion').html("")
  mainServer.emit('action', "lightsOff");
}, 10000);

 })
    $('#mainDIV').html("<img id='canvas' src='http://192.168.196.113:8081/'></img>")
    //player = new JSMpeg.Player('ws://192.168.196.113:9998', {
          //canvas: document.getElementById('canvas') // Canvas should be a canvas DOM element
        //})	
        $('#userInput').html(buttons)
    	


        mainServer.emit('streamCam', 1);

        $('.btn-primary').on('click', function(event) {
          event.preventDefault(); // To prevent following the link (optional)
          mainServer.emit('action', "lightsOn");
        });
        $('.btn-secondary').on('click', function(event) {
          event.preventDefault(); // To prevent following the link (optional)
          mainServer.emit('action', "lightsOff");
        });
        $('.btn-danger').on('click', function(event) {
          event.preventDefault(); // To prevent following the link (optional)
          mainServer.emit('action', "alarm");
        });
    })