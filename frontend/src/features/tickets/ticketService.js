import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/users';
// const API_URL = '/api/users';

// create new ticket , protected route
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `http://localhost:5000/api/tickets`,
    ticketData,
    config
  );

  // console.log(
  //   'response.data in createTicket in ticketService : ',
  //   response.data
  // );

  // {createdAt:"2024-08-20T01:46:49.907Z"
  // description:"iPad error"
  // product:"iPad"
  // status:"new"
  // updatedAt:"2024-08-20T01:46:49.907Z"
  // user:"66b96c04dafaecac4b2d55e7"
  // _id:"66c3f589e4720e6238e12364"}
  return response.data;
};

// get user tickets for logged in user , protected route
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`http://localhost:5000/api/tickets`, config);

  // console.log(
  //   'response.data in createTicket in ticketService : ',
  //   response.data
  // );

  // {createdAt:"2024-08-20T01:46:49.907Z"
  // description:"iPad error"
  // product:"iPad"
  // status:"new"
  // updatedAt:"2024-08-20T01:46:49.907Z"
  // user:"66b96c04dafaecac4b2d55e7"
  // _id:"66c3f589e4720e6238e12364"}
  return response.data;
};

// get user ticket for logged in user , protected route
const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(
    `http://localhost:5000/api/tickets/${ticketId}`,
    config
  );
  return response.data;
};

// delete user ticket for logged in user , protected route
const deleteTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `http://localhost:5000/api/tickets/${ticketId}`,
    config
  );

  // console.log(
  //   'response.data in createTicket in ticketService : ',
  //   response.data
  // );

  // {createdAt:"2024-08-20T01:46:49.907Z"
  // description:"iPad error"
  // product:"iPad"
  // status:"new"
  // updatedAt:"2024-08-20T01:46:49.907Z"
  // user:"66b96c04dafaecac4b2d55e7"
  // _id:"66c3f589e4720e6238e12364"}
  return response.data;
};

// close user ticket for logged in user , protected route
const closeTicket = async (ticket, token) => {
  console.log('ticket : ', ticket);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // only status만 바뀜 나머지는 그대로
  const response = await axios.put(
    `http://localhost:5000/api/tickets/${ticket._id}`,
    {
      product: `${ticket.product}`,
      description: `${ticket.description}`,
      status: 'closed',
    },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  deleteTicket,
};

export default ticketService;
