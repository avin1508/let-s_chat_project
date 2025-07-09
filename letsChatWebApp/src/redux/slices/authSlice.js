import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('user')) || null;
  } catch (error) {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage(), // ✅ Get user on app start
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // ✅ Clear on logout
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
