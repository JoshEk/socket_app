
/* eslint-disable no-console */

const express = require('express');

const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}`, '/index.html'));
  console.log(__dirname);
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
