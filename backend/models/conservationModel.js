import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  praticipaints: [{
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }],
  message: [{
    type: mongoose.Schema.ObjectId,
    ref: "Message"
  }]
});

const Conservation = mongoose.model('Conversation', conversationSchema);
export default Conservation;