// Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
// because mongoose returns a promise
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc   get user tickets
// @route  GET http://localhost:5000/api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT(from the protect in authMiddleware.js)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // id 나 _id 둘다 작동 됨
  // 모든 ticket 가져옴 for 해당user
  const tickets = await Ticket.find({ user: req.user.id });
  //   const tickets = await Ticket.find({ user: req.user._id });

  res.status(200).json(tickets);
});

// @desc   get ticket id's ticket for logged in user
// @route  GET http://localhost:5000/api/tickets/:id (id는 ticket id)
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT(from the protect in authMiddleware.js)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // 해당ticket id의 ticket을 가져옴 for user
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // console.log('ticket.user.toString() : ', ticket.user.toString());
  // console.log('req.user.id : ', req.user.id);

  // 남의 ticket을 볼수 없음
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(ticket);
});

// @desc   delete ticket id's ticket for logged in user
// @route  DELETE http://localhost:5000/api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT(from the protect in authMiddleware.js)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // 해당ticket id의 ticket을 가져옴 for user
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // 남의 ticket을 삭제할 수 없음
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // 해당ticket id의 ticket을 삭제함 for user
  const deletedTicket = await Ticket.findOneAndDelete({ _id: req.params.id });

  if (!deletedTicket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  res
    .status(200)
    .json({ message: `${deletedTicket.product} is deleted successfully` });
});

// @desc   update ticket id's ticket for logged in user
// @route  PUT http://localhost:5000/api/tickets/:id
// @access Private

// in Frontend
// const response = await axios.put(
//   `http://localhost:5000/api/tickets/${ticketId}`, {status: 'closed'},
//   config
// );
const updateTicket = asyncHandler(async (req, res) => {
  const { product, description, status } = req.body;
  console.log('product, description, status : ', product, description, status);

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description to update');
  }

  // Get user using the id in the JWT(from the protect in authMiddleware.js)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // 해당ticket id의 ticket을 가져옴 for logged in user
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  // 남의 ticket을 수정할 수 없음
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // 해당ticket id의 ticket을 update함 for user
  const updatedTicket = await Ticket.findOneAndUpdate(
    { _id: req.params.id },
    {
      product,
      description,
      user: req.user.id,
      status, // 'close' in front end
    },
    { new: true }
  );

  if (!updatedTicket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  res.status(200).json(updatedTicket);
});

// @desc   Create new ticket
// @route  POST http://localhost:5000/api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  // console.log(' product, description : ', product, description);

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user using the id in the JWT(from the protect in authMiddleware.js)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // create new ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });
  //   const ticket = await Ticket.create({
  //     product,
  //     description,
  //     user: req.user._id,
  //     status: 'new',
  //   });

  res.status(201).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
