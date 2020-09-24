$(function() {
    $('#mainDIV').html("<canvas id='canvas'></canvas>")
    player = new JSMpeg.Player('ws://192.168.196.113:9998', {
          canvas: document.getElementById('canvas') // Canvas should be a canvas DOM element
        })	
        $('#userINput').html("<canvas id='canvas'></canvas>")
    player = new JSMpeg.Player('ws://192.168.196.113:9998', {
          canvas: document.getElementById('canvas') // Canvas should be a canvas DOM element
        })	



    })