var express = require('express');
const { io } = require('../socketApi');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/cameraAlarm', function(req, res, next) {
  io.emit("cameraAlarm",'alarm')
  console.log("YUP")
});
module.exports = router;
