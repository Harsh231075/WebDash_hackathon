import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [], // ek hi array
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setAllMessages: (state, action) => {
      state.messages = action.payload; // backend se full array
    },
    addMessage: (state, action) => {
        state.messages = [...state.messages, action.payload]; // immutable update
      },
    clearMessages: (state) => {
      state.messages = [];
    }
  }
});

export const { setAllMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
