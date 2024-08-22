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
import ticketService from './ticketService';

// get user from localstorage
// const user = JSON.parse(localStorage.getItem('user'));

// initial state
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new ticket, ticket is coming from form in NewTicket.jsx, request to backend
// async: action first
export const createTicket = createAsyncThunk(
  'tickets/create', // name of action
  // async function, ticketData is coming from form
  async (ticketData, thunkAPI) => {
    // console.log('user in createAsyncThunk : ', user);

    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      // console.log('error in register : ', error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user tickets, request to backend
// async: action first
export const getTickets = createAsyncThunk(
  'tickets/getAll', // name of action
  // async function, do not pass anything to the ticketData
  // You can only pass one argument to the thunk
  async (_, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      return await ticketService.getTickets(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      // console.log('error in register : ', error);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user ticket, request to backend
// async: action first
export const getTicket = createAsyncThunk(
  'tickets/get', // name of action
  // async function, do not pass anything to the ticketData
  async (ticketId, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user ticket, request to backend
// async: action first
export const deleteTicket = createAsyncThunk(
  'tickets/delete', // name of action
  // async function, do not pass anything to the ticketData
  async (ticketId, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      return await ticketService.deleteTicket(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Close user ticket, request to backend
// async: action first
export const closeTicket = createAsyncThunk(
  'tickets/close', // name of action
  // async function, do not pass anything to the ticketData
  async (ticket, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      // console.log('ticket -------> ', ticket);
      return await ticketService.closeTicket(ticket, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString(); // this is going to be payload

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// state를 변화시킴
export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  // actions types = "tickets/reset"
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = null;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.tickets = [];
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = {};
      })
      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // backend에 갔다올 필요없이 frontend에서 바로 상태 바뀜
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'closed')
            : ticket
        );
        // state.ticket.status = action.payload.status;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = {};
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = {};
      });
  },
});

// reset이라는 함수를 action기능이 작동하도록 다른데서 쓸거라는 뜻이다.
export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
