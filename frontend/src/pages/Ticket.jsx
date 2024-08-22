import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

// useSelector : select anything in the global state(ex:user). useDispath : dispatch actions(ex:register)
import { useSelector, useDispatch } from 'react-redux';
// import actions
import {
  createTicket,
  getTickets,
  getTicket,
  reset,
  closeTicket,
  deleteTicket,
} from '../features/tickets/ticketSlice';
import {
  createNote,
  getNotes,
  reset as noteReset, //reset을 noteReset으로 rename(충돌방지)
} from '../features/notes/noteSlice';
import BackButton from '../components/BackButton';
import NoteItem from '../components/NoteItem';

// modal customerization
const customStyles = {
  content: {
    position: 'relative',
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { user } = useSelector((state) => state.auth);
  const { tickets, ticket, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.tickets);
  const {
    notes,
    note,
    // rename for avoiding name conflict
    isError: noteIsError,
    isSuccess: notIsSuccess,
    isLoading: noteIsLoading,
    message: noteMessage,
  } = useSelector((state) => state.notes);

  const [name] = useState(user.name);
  const [email] = useState(user.email);

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get the ticketId from URL : http://localhost:3000/ticket/66c4332395017472ad5be6a6
  const { ticketId } = useParams();

  //   const navigate = useNavigate();

  // we do want to clear the state on unmount(왜냐하면 return을 썼기때문)
  // We want to reset ticket state when the component is unmounted if isSuccess is true.
  //   useEffect(() => {
  //     return () => {
  //       if (isSuccess) {
  //         dispatch(reset());
  //       }
  //     };
  //     // eslint-disable-next-line
  //   }, [isSuccess]);

  // fetch user ticket when loading
  // We just fetch the ticket when the component first mounts.
  //   useEffect(() => {
  //     if (isError) {
  //       toast.error(message);
  //     }
  //     dispatch(getTicket(ticketId));

  //     // eslint-disable-next-line
  //   }, [isError, message, ticketId]);

  // 위 두개의 useEffect를 하나로 통합
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };

    // eslint-disable-next-line
  }, [isError, message, ticketId, isSuccess]);

  //   //   const onChange = (e) => {
  //   //     setFormData((prevState) => ({
  //   //       ...prevState,
  //   //       [e.target.name]: e.target.value,
  //   //     }));
  //   //   };

  //   //   const onSubmit = (e) => {
  //   //     e.preventDefault();

  //   //     dispatch(createTicket({ product, description }));
  //   //   };

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticket));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  // Delete ticket
  const onTicketDelete = () => {
    dispatch(deleteTicket(ticketId));
    toast.success('Ticket Deleted');
    navigate('/tickets');
  };

  // create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    // console.log('noteText, ticketId', noteText, ticketId);
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/Close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Display Notes
  // const onDisplayNotes = () => {
  //   dispatch(getNotes(ticketId));
  //   toast.success('Notes display');
  // };

  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <>
      <h1>Ticket</h1>

      <section>
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
      </section>
      <section>
        <div className="ticket-page">
          <header className="ticket-header">
            <BackButton url={'/tickets'} />
            <h2>
              Ticket ID: {ticket._id}{' '}
              <span className={`status status-${ticket.status}`}>
                {ticket.status}
              </span>
            </h2>
            <h3>Product: {ticket.product}</h3>
            <h3>
              Date Submitted:{' '}
              {new Date(ticket.createdAt).toLocaleString('ko-KR')}
            </h3>
            <hr />
            <div className="ticket-desc">
              <h3>Description of Issue</h3>
              <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
          </header>
        </div>
        {ticket.status !== 'closed' && (
          <button onClick={openModal} className="btn">
            <FaPlus />
            Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add Note"
        >
          {/* form  to add note */}
          <h2>Add Note</h2>
          <button className="btn-close" onClick={closeModal}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="enter Note text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className="btn btn-block btn-danger">
            Close Ticket
          </button>
        )}
        {
          <button onClick={onTicketDelete} className="btn btn-block btn-danger">
            Delete Ticket
          </button>
        }
        {/* {
          <button onClick={onDisplayNotes} className="btn btn-block btn-danger">
            Display Notes
          </button>
        } */}
      </section>
    </>
  );
}

export default Ticket;
