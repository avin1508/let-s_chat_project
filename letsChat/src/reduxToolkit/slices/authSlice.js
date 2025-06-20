import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Constants/apiBase";
import axios from "axios";

// Async Thunk to request OTP for registration
export const otpRequestForRegister = createAsyncThunk(
  'auth/otpRequestForRegister',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register/request-otp`, {
        email
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const resendOtpForRegister = createAsyncThunk(
  'auth/resendOtpForRegister',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register/resend-otp`, {
        email
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

export const veriFyOtpForRegister = createAsyncThunk(
  'auth/veriFyOtpForRegister',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register/verify-otp`, {
        email,
        otp
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

export const completeRegisterApi = createAsyncThunk(
  'auth/completeRegisterApi',
  async ({fullName, number, password, profilePic, token}, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', fullName);
      formData.append('phoneNumber', number);
      formData.append('password', password);
      if (profilePic) formData.append('profilePic', profilePic);
      const response = await axios.post(`${BASE_URL}/auth/register/complete`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
)

export const loginApi = createAsyncThunk(
  'auth/loginApi',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/auth/login`,
        { email, password }, // ✅ JSON body
        {
          headers: {
            'Content-Type': 'application/json' // ✅ JSON header
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    requestOtpData: null,
    requestOtpLoading: false,
    requestOtpError: null,

    reSendOtpData: null,
    reSendOtpLoading: false,
    reSendOtpError: null,

    veriFyOtpData: null,
    veriFyOtpLoading: false,
    veriFyOtpError: null,

    user: null,
    userLoading: false,
    userError: null
  },
  reducers: {
    logOutUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(otpRequestForRegister.pending, (state) => {
        state.requestOtpLoading = true;
        state.requestOtpError = null;
      })
      .addCase(otpRequestForRegister.fulfilled, (state, action) => {
        state.requestOtpLoading = false;
        state.requestOtpData = action.payload;
      })
      .addCase(otpRequestForRegister.rejected, (state, action) => {
        state.requestOtpLoading = false;
        state.requestOtpError = action.payload;
      })

      .addCase(resendOtpForRegister.pending, (state) => {
        state.reSendOtpLoading = true;
        state.reSendOtpError = null;
      })
      .addCase(resendOtpForRegister.fulfilled, (state, action) => {
        state.reSendOtpLoading = false;
        state.reSendOtpData = action.payload;
      })
      .addCase(resendOtpForRegister.rejected, (state, action) => {
        state.reSendOtpLoading = false;
        state.reSendOtpError = action.payload;
      })

      .addCase(veriFyOtpForRegister.pending, (state) => {
        state.veriFyOtpLoading = true;
        state.veriFyOtpError = null;
      })
      .addCase(veriFyOtpForRegister.fulfilled, (state, action) => {
        state.veriFyOtpLoading = false;
        state.veriFyOtpData = action.payload;
      })
      .addCase(veriFyOtpForRegister.rejected, (state, action) => {
        state.veriFyOtpLoading = false;
        state.veriFyOtpError = action.payload;
      })

      .addCase(completeRegisterApi.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(completeRegisterApi.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(completeRegisterApi.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })

      .addCase(loginApi.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload;
      })
  }
});

export const { logOutUser } = authSlice.actions;

export default authSlice.reducer;
