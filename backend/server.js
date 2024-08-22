// entry point to backend

const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

// initialize app variable
const app = express();

// Enable All CORS Requests
app.use(cors());

// set a middleware
// allow send raw json
app.use(express.json());
// allow send x-www-form-uriencode
app.use(express.urlencoded({ extended: false }));

// create a route with express, http://localhost:5000
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Routes : /api/users 을 ./routes/userRoutes.js 파일과 연결함
app.use('/api/users', require('./routes/userRoutes'));

// Routes : /api/tickets 을 ./routes/ticketRoutes.js 파일과 연결함
app.use('/api/tickets', require('./routes/ticketRoutes'));

// app.post('/api/users', (req, res) => {
//   res.send('Register Route');
// });
// app.post('/api/users/login', (req, res) => {
//   res.send('Login Route');
// });

// app.get('/api/users/me', (req, res) => {
//   res.status(200).send('me');
// });

// error middleware : gives a json format error message
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
