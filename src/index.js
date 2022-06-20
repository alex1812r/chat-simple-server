const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');

const { Message } = require('./db');

const app = express();

app.use(cors({}));

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.get('/messages', async (_req, res) => {
  const messages = await Message.find({});
  res.json({ messages });
})

const server = http.createServer(app);
server.listen(5000, () => {
  console.log('[SERVER]: server running on port 3000');
});

const io = new Server(server, { cors: {} });

io.on('connection', async (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('send_message', (msg) => {
    const message = new Message({ 
      content: msg.content,
      author: msg.author
    });
    message
      .save()
      .then(() => {
        io.emit('received_message', message);
      }).catch((err) => {
        console.log('error sending message', err);
      })
  })
});
