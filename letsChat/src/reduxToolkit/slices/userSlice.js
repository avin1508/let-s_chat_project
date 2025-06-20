import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../Utils/axiosInstance';

export const getUserProfileApi = createAsyncThunk(
  'user/getUserProfileApi',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/user/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userProfile: null,
    userProfileLoading: false,
    userProfileError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfileApi.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = null;
      })
      .addCase(getUserProfileApi.fulfilled, (state, action) => {
        state.userProfileLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfileApi.rejected, (state, action) => {
        state.userProfileLoading = false;
        state.userProfileError = action.payload;
      });
  },
});

export default userSlice.reducer;
