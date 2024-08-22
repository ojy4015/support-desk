const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add a user'],
      ref: 'User', // userSchema
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add a ticket'],
      ref: 'Ticket', // ticketSchema
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
