import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from 'http';
import connectDB from "./db/connectDB.js";
import cloudinary from 'cloudinary';
const { v2 } = cloudinary;
import fileupload from 'express-fileupload'
import { setupSocket } from './sokect/socket.js';
import messageRoute from "./routes/messageRoute.js"

import authRoutes from "./routes/authRoutes.js";
import profileRote from './routes/profileRoutes.js'
import postRoute from './routes/postRoutes.js'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, 
}));
app.use(express.json());
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));

v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Connect to DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is working...");
});
app.use("/api/auth", authRoutes);
app.use('/api/profile', profileRote);
app.use('/api/post', postRoute);
app.use('/api/message', messageRoute);

setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Socket.IO Setup
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });

//   socket.on('join_chat', (userId) => {
//     socket.join(userId); // User joins their own ID as a room
//     console.log(`User ${socket.id} joined chat ${userId}`);
//   });

//   socket.on('send_message', async (data) => {
//     console.log('Received message via Socket:', data);
//     try {
//       const { receiverId, content, senderId, senderName } = data;

//       const conversation = await findOrCreateConversation(senderId, receiverId);

//       conversation.messages.push({
//         sender: senderId,
//         content: content
//       });
//       conversation.updatedAt = Date.now();
//       await conversation.save();

//       // Emit the message to both sender and receiver (using their IDs as rooms)
//       io.to(senderId).emit('receive_message', {
//         _id: conversation.messages[conversation.messages.length - 1]._id,
//         senderId: senderId,
//         content: content,
//         senderName: senderName
//       });
//       io.to(receiverId).emit('receive_message', {
//         _id: conversation.messages[conversation.messages.length - 1]._id,
//         senderId: senderId,
//         content: content,
//         senderName: senderName
//       });

//     } catch (error) {
//       console.error('Error handling sent message:', error);
//     }
//   });
// });

// // Re-using the findOrCreateConversation function here
// const findOrCreateConversation = async (userId1, userId2) => {
//   const participants = [userId1, userId2].sort();
//   let conversation = await Conversation.findOne({ participants: { $all: participants } });
//   if (!conversation) {
//     conversation = await Conversation.create({ participants: participants, messages: [] });
//   }
//   return conversation;
// };