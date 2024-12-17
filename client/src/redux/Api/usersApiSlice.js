import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: 'include', // Ensure credentials are sent
      }),
      transformResponse: (response, meta) => {
        // Log raw response and headers
        console.log('Login Response:', response);
        console.log('Login Response Headers:', meta?.response?.headers);

        // Extract token from multiple possible sources
        const token = 
          response.token || 
          meta?.response?.headers?.get('authorization')?.split(' ')[1];
        
        console.log('Token Extraction Debug:', {
          tokenFromResponse: response.token,
          tokenFromHeaders: meta?.response?.headers?.get('authorization')
        });

        // Ensure token is returned with the response
        return { 
          ...response, 
          token: token 
        };
      },
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = userApiSlice;
