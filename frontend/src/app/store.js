// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// global states accessible from your app
// container for javascript apps it stores the whole state of the app in an immutable object tree
import { configureStore } from '@reduxjs/toolkit';

// import multiple slices
// import counterReducer
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import ticketReducer from '../features/tickets/ticketSlice';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  // counterReducer is available to the entire app through the provider
  // you can have as many slices as you want
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});
