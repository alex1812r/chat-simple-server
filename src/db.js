const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat-simple');

const MessageSchema = mongoose.Schema(
  {
    content: String,
    author: String
  },
  { 
    timestamps: true 
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };