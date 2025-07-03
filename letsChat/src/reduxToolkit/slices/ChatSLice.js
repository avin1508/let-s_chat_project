import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

export const getUserChats = createAsyncThunk(
    "chat/getUserChats",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("chat/user-chats")
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || "Something went wrong")
        }
    }
)

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        userChats: [],
        userChatsLoading: false,
        userChatsError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserChats.pending, (state) => {
            state.userChatsLoading = true;
            state.userChatsError = null;
        });
        builder.addCase(getUserChats.fulfilled, (state, action) => {
            state.userChatsLoading = false;
            state.userChats = action.payload;
        });
        builder.addCase(getUserChats.rejected, (state, action) => {
            state.userChatsLoading = false;
            state.userChatsError = action.payload;
        });
    },
});

export default chatSlice.reducer;