// var app = require('http').createServer(handler)
//   , io = require('socket.io').listen(app)
//   , fs = require('fs')
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

  io.set('transports', ['xhr-polling']);

app.listen(80);


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log("New connection");


  socket.on('moveToNextSlide', function (data) {
    socket.broadcast.emit('nextSlide', { slideNr: data.slideNr});
  });  

  socket.on('moveToPreviousSlide', function (data) {
    socket.broadcast.emit('previousSlide', { slideNr: data.slideNr});
  });

  socket.on('resetSlideshow', function (data) {
    socket.broadcast.emit('resetSlideshow',data);
  });

  socket.on('jumpToSlide', function (data) {
    socket.broadcast.emit('jumpToSlide',data);
  });



});