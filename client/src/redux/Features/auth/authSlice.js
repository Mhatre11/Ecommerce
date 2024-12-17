import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem("userInfo")) 
    : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("userInfo"),
  isAdmin: localStorage.getItem("isAdmin") === "true",
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { _id, username, email, isAdmin, token } = action.payload;
      
      // Create user info object
      const userInfo = { _id, username, email, isAdmin };
      
      // Log credential setting for debugging
      console.log('Setting Credentials:', {
        userInfo,
        tokenProvided: !!token
      });

      // Update state
      state.userInfo = userInfo;
      state.token = token;
      state.isAuthenticated = true;
      state.isAdmin = isAdmin;
      
      // Store in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      
      // Store token separately for easier access
      if (token) {
        localStorage.setItem('token', token);
      }
      localStorage.setItem("isAdmin", isAdmin);
    },
    logout: (state) => {
      // Log logout action
      console.log('Logging out user');

      // Clear state
      state.userInfo = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      
      // Clear localStorage
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
