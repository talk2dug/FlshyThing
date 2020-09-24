var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*var spawn = require('child_process').spawn,
    child = null;
    child = spawn("ffmpeg", [
      "-i", "rtsp://admin:UUnv9njxg123@10.10.10.3:554/cam/realmonitor?channel=1&subtype=0",
      "-c", "copy",
      "-map", "0",
      "-f", "segment",
      "-segment_time", "300",
      "-segment_format", "mp4",
      "/home/pi/videos/capture-%03d.mp4"
  ]);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stdout);
  Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://admin:UUnv9njxg123@10.10.10.3:554/cam/realmonitor?channel=1&subtype=0',
  wsPort: 9998,
  ffmpegOptions: { // options ffmpeg flags
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 30, // options with required values specify the value after the key
    "-map": "0",
  }
})
*/



module.exports = app;
