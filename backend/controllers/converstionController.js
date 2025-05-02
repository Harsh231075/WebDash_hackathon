import Conversation from '../models/conservationModel.js';
import Message from '../models/messageModel.js';
import { getReceiverSocketId, getIO } from '../sokect/socket.js'; 
import User from '../models/User.js';
import Profile from '../models/Profile.js'

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId =  req.user;
// console.log(senderId,receiverId);
    const message = await Message.create({
      receiverId,
      senderId,
      content
    });

    let conversation = await Conversation.findOne({
      praticipaints: { $all: [receiverId, senderId] }
    });

    if (conversation) {
      conversation.message.push(message._id);
      await conversation.save();
    } else {
      conversation = await Conversation.create({
        praticipaints: [senderId, receiverId],
        message: [message._id]
      });
    }

    const receiverSocketId = getReceiverSocketId(receiverId);
    const io = getIO(); // <-- get io instance
// console.log("receiverSocketId =>",receiverSocketId);
    if (receiverSocketId) {
      console.log("socket =>",message,receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", message);
    }

    return res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Conversation Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const senderId = req.user;
// console.log(senderId,receiverId);
    const conversation = await Conversation.findOne({
      praticipaints: { $all: [receiverId, senderId] }
    }).populate({
      path: 'message',
      populate: [
        { path: 'senderId', select: 'name _id' },
        { path: 'receiverId', select: 'name _id' }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ message: 'No conversation found' });
    }

    res.status(200).json({ message: "Messages fetched successfully", conversation });

  } catch (error) {
    console.error("getAllMessage Error:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getConversationsForUser = async (req, res) => {
  try {
    const userId =  req.user; // Just to be safe

    const conversations = await Conversation.find({ praticipaints: userId })
      .sort({ updatedAt: -1 });
  // console.log(conversations);
    
    const result = [];

    for (const conv of conversations) {
      // Get other user ID
      const otherUserId = conv.praticipaints.find(
        (p) => p.toString() !== userId.toString()
      );
  //  console.log(otherUserId);

      // Fetch other user's full name and profile phot
      const otherUser = await Profile.findOne({ user: otherUserId });

      // console.log(otherUser);

      const lastMessage = conv.message[conv.message.length - 1];
      // console.log(lastMessage);
      const mess=await Message.findById(lastMessage);

      // console.log(mess);

      result.push({
        _id: otherUser?.user || '',
        sender: otherUser?.hero?.name || 'Unknown',
        avatar: otherUser?.hero?.avatar || '',
        message: mess?.content || '',
        time: formatTimeAgo(mess?.createdAt),
        unread: conv.unreadMap?.get(userId.toString()) ?? true,
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in getConversationsForUser:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

function formatTimeAgo(date) {
  if (!date) return '';
  const diff = Date.now() - new Date(date);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  return `${hours} hours ago`;
}