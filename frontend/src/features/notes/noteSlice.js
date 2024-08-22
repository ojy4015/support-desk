import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

// initial state
const initialState = {
  notes: [],
  note: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new ticket note, note is coming from form in Modal, request to backend
// async: action first
export const createNote = createAsyncThunk(
  'notes/create', // name of action
  // async function, ticketData is coming from form
  async ({ noteText, ticketId }, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('noteData : ', noteData);

      // because this is protected route, we need a token in front end
      return await noteService.createNote(noteText, ticketId, token);
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

// Get ticket notes for a ticket for a logged in user, request to backend
// async: action first
export const getNotes = createAsyncThunk(
  'notes/getAll', // name of action
  // async function, do not pass anything to the ticketData
  // You can only pass one argument to the thunk
  async (ticketId, thunkAPI) => {
    try {
      // user is stored in localstorage and state
      // thunkAPI.getState() : we can get anything from state
      const token = thunkAPI.getState().auth.user.token;
      //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
      // console.log('ticketData : ', ticketData);

      // because this is protected route, we need a token in front end
      return await noteService.getNotes(ticketId, token);
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
// export const getTicket = createAsyncThunk(
//   'tickets/get', // name of action
//   // async function, do not pass anything to the ticketData
//   async (ticketId, thunkAPI) => {
//     try {
//       // user is stored in localstorage and state
//       // thunkAPI.getState() : we can get anything from state
//       const token = thunkAPI.getState().auth.user.token;
//       //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
//       // console.log('ticketData : ', ticketData);

//       // because this is protected route, we need a token in front end
//       return await ticketService.getTicket(ticketId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(); // this is going to be payload

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Delete user ticket, request to backend
// async: action first
// export const deleteTicket = createAsyncThunk(
//   'tickets/delete', // name of action
//   // async function, do not pass anything to the ticketData
//   async (ticketId, thunkAPI) => {
//     try {
//       // user is stored in localstorage and state
//       // thunkAPI.getState() : we can get anything from state
//       const token = thunkAPI.getState().auth.user.token;
//       //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
//       // console.log('ticketData : ', ticketData);

//       // because this is protected route, we need a token in front end
//       return await ticketService.deleteTicket(ticketId, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(); // this is going to be payload

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Close user ticket, request to backend
// async: action first
// export const closeTicket = createAsyncThunk(
//   'tickets/close', // name of action
//   // async function, do not pass anything to the ticketData
//   async (ticket, thunkAPI) => {
//     try {
//       // user is stored in localstorage and state
//       // thunkAPI.getState() : we can get anything from state
//       const token = thunkAPI.getState().auth.user.token;
//       //console.log('const token = thunkAPI.getState().auth.user.token; ', token);
//       // console.log('ticketData : ', ticketData);

//       // because this is protected route, we need a token in front end
//       // console.log('ticket -------> ', ticket);
//       return await ticketService.closeTicket(ticket, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString(); // this is going to be payload

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// state를 변화시킴
export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  // actions types = "notes/reset"
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.note = action.payload;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.note = null;
        state.notes = [];
      })
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload; // array notes from the server
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.notes = [];
      });
    //   .addCase(getTicket.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getTicket.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.ticket = action.payload;
    //   })
    //   .addCase(getTicket.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.payload;
    //     state.ticket = {};
    //   })
    //   .addCase(closeTicket.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(closeTicket.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     // backend에 갔다올 필요없이 frontend에서 바로 상태 바뀜
    //     state.tickets.map((ticket) =>
    //       ticket._id === action.payload._id
    //         ? (ticket.status = 'closed')
    //         : ticket
    //     );
    //     // state.ticket.status = action.payload.status;
    //   })
    //   .addCase(closeTicket.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.payload;
    //     state.ticket = {};
    //   })
    //   .addCase(deleteTicket.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteTicket.fulfilled, (state) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //   })
    //   .addCase(deleteTicket.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.payload;
    //     state.ticket = {};
    //   });
  },
});

// reset이라는 함수를 action기능이 작동하도록 다른데서 쓸거라는 뜻이다.
export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
