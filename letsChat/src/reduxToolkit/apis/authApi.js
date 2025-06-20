// /src/redux/apis/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../Constants/apiBase';  // <-- your base URL import

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL + '/api/v1/users',  // use BASE_URL here
  }),
  endpoints: (builder) => ({
    requestOtp: builder.mutation({
      query: (emailData) => ({
        url: '/register/request-otp',
        method: 'POST',
        body: emailData,
      }),
    }),
  }),
});

export const { useRequestOtpMutation } = authApi;
export default authApi;
