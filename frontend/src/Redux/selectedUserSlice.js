import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: []
};

const selectedUserSlice = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      // Ensure we're properly updating the entire selectedUser object
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = initialState.selectedUser;
    }
  }
});


export const { setSelectedUser, clearSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
