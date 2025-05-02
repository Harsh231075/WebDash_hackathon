import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../redux/features/userSlice';
// import fetchUserReducer from '../redux/features/fectUserSlice';
import selectedUserReducer from './selectedUserSlice';
import sendMessageReducer from './messageSlice';
 import socketReducer from './socketSlice';
// import onlineUsersReducer from '../redux/features/onlineSlice';
const store = configureStore({
    reducer: {
        // user: userReducer,
        // fetchUser: fetchUserReducer,
         selectedUser:selectedUserReducer,
         sendMessage:sendMessageReducer,
         socket:socketReducer,
        // onlineUsers:onlineUsersReducer,
    },
});

export default store;
