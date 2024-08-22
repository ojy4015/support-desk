import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';
// const API_URL = '/api/users';

// register user
const register = async (userData) => {
  const response = await axios.post(
    `http://localhost:5000/api/users`,
    userData
  );

  // console.log('response : ', response);
  if (response.data) {
    // localstorage can only hold strings
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  // response.data =>
  // {email: "brad1@gmail.com"
  // name: "Brad1"
  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmU5ZDMxNjgyZGU3NWEwYjk2YWJjYyIsImlhdCI6MTcyMzc2ODExMywiZXhwIjoxNzI2MzYwMTEzfQ.Ja5yMuMg-THuuabMbxcmUEnfCoq5ZOKP2pJvLHFy19s"
  // _id: "66be9d31682de75a0b96abcc"}
  return response.data;
};

// login user
const login = async (userData) => {
  // const response = await axios.post(`${API_URL}/users/login`, userData);
  const response = await axios.post(
    `http://localhost:5000/api/users/login`,
    userData
  );

  if (response.data) {
    // localstorage can only hold strings
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  // response.data =>
  // {email: "brad1@gmail.com"
  // name: "Brad1"
  // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YmU5ZDMxNjgyZGU3NWEwYjk2YWJjYyIsImlhdCI6MTcyMzc2ODExMywiZXhwIjoxNzI2MzYwMTEzfQ.Ja5yMuMg-THuuabMbxcmUEnfCoq5ZOKP2pJvLHFy19s"
  // _id: "66be9d31682de75a0b96abcc"}
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem('user');

const authService = {
  register,
  logout,
  login,
};

export default authService;
