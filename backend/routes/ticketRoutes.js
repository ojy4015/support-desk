const express = require('express');
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

// Re-route into note router
// noteRoutes의 기본경로('/')가 /api/tickets/:ticketId/notes이 되도록 한다.
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

// ticketRoutes의 기본경로('/')는 /api/tickets
router.route('/').get(protect, getTickets).post(protect, createTicket);
// router.get('/', protect, getTickets);
// router.post('/', protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
