import Conversation from '../models/Conversation.js';
import User from '../models/User.js'; // Assuming you have a User model

// Function to find or create a conversation between two users
const findOrCreateConversation = async (userId1, userId2) => {
  // Ensure user IDs are comparable and ordered to find a unique conversation
  const participants = [userId1, userId2].sort();

  let conversation = await Conversation.findOne({
    participants: { $all: participants }
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: participants,
      messages: []
    });
  }
  return conversation;
};

// Controller function to store a new message
export const storeMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const senderId = req.user.id; // Assuming you have middleware to authenticate and attach user to req

    if (!receiver || !content) {
      return res.status(400).json({ message: 'Receiver ID and content are required.' });
    }

    const conversation = await findOrCreateConversation(senderId, receiver);

    conversation.messages.push({
      sender: senderId,
      content: content
    });

    conversation.updatedAt = Date.now();
    await conversation.save();

    res.status(201).json({ message: 'Message stored successfully.', conversation });
  } catch (error) {
    console.error('Error storing message:', error);
    res.status(500).json({ message: 'Failed to store message.' });
  }
};

// Controller function to fetch the chat history between two users
export const fetchChatHistory = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const currentUserId = req.user.id; // Assuming you have authentication middleware
    console.log("call hoya ");
    const participants = [currentUserId, otherUserId].sort();

    const conversation = await Conversation.findOne({
      participants: { $all: participants }
    }).populate('participants', 'username _id'); // Populate participant details

    if (!conversation) {
      return res.status(200).json({ messages: [] }); // No chat history found
    }

    const messagesWithNames = await Promise.all(
      conversation.messages.map(async (msg) => {
        const sender = await User.findById(msg.sender).select('name _id');
        return {
          _id: msg._id,
          senderId: sender?._id,
          senderName: sender?.name || 'Unknown',
          content: msg.content,
          createdAt: msg.createdAt,
          replyTo: msg.replyTo,
        };
      })
    );

    res.status(200).json({ messages: messagesWithNames });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to fetch chat history.' });
  }
};