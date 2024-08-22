// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// import axios from 'axios';

// // create initial state
// const initialState = {
//   user: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Reister new user, user is coming from form in Register.jsx, request to backend
// // async: action first
// export const register = createAsyncThunk(
//   'auth/register', // name of action
//   // async function, user is coming from form
//   async (user, thunkAPI) => {
//     console.log('user in createAsyncThunk : ', user);

//     const API_URL = 'http://localhost:5000/api/users';

//     try {
//       //return await authService.register(user);

//       const response = await axios.post(API_URL, user);
//       // const response = await fetch('http://localhost:5000/api/users', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json; charset=utf-8',
//       //   },
//       //   body: user,
//       // });

//       if (response.data) {
//         localStorage.setItem('user', JSON.stringify(response.data));
//       }

//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }

//     // await new Promise((resolve) => setTimeout(resolve, 1000));
//     // return amount; // payload of this action
//   }
// );

// // Login user, user is coming from form in Login.jsx
// export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//   console.log('user in Login.jsx : ', user);
// });

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       // state.user = null;
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// get user from localstorage
const user = JSON.parse(localStorage.getItem('user'));

// create initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Reister new user, user is coming from form in Register.jsx, request to backend, public route
// async: action first
export const register = createAsyncThunk(
  'auth/register', // name of action
  // async function, user is coming from form
  async (user, thunkAPI) => {
    // console.log('user in createAsyncThunk : ', user);

    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      console.log('error in register : ', error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user, user is coming from form in Login.jsx, public route
export const login = createAsyncThunk(
  'auth/login', // name of action
  // async function, user is coming from form
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      console.log('error in login : ', error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//   console.log('user in Login.jsx : ', user);
// });

//Logout user
// async: action first
export const logout = createAsyncThunk(
  'auth/logout', // name of action
  // async function, user is coming from form
  async (user, thunkAPI) => {
    try {
      await authService.logout();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      console.log('error : ', error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// state를 변화시킴
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
