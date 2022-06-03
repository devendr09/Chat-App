const cors = require("cors");

const io = require("socket.io")(process.env.PORT || 8000, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
      credentials: true
    }
  });


const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    })
    socket.on('disconnect', data =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});