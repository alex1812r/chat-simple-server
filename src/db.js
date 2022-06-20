const mongoose = require('mongoose');

mongoose.connect(process.env.DATEBASE_URL);

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