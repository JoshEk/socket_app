
/* eslint-disable no-console */

const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}`, '/index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

http.listen(3000, () => {
  console.log(`server started on port ${port}\n`);
});
