import { Server } from "socket.io";

let io; // <-- globally define io
const userSocketMap = {}; // <-- globally define userSocketMap

const setupSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['POST', 'GET'],
        },
    });

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        console.log('Connected to socket.io', userId,"and",socket.id);
        
        if (userId !== undefined) {
            userSocketMap[userId] = socket.id;
        }
        
        io.emit('getOnlineUsers', Object.keys(userSocketMap));

        socket.on('disconnect', () => {
            console.log('Disconnected from socket.io', userId);
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });

    return io;
};

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export const getIO = () => {
    return io;
};

export { setupSocket };
