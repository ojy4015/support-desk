import { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

// useSelector : select anything in the global state(ex:user). useDispath : dispatch actions(ex:register)
import { useSelector, useDispatch } from 'react-redux';
// import actions
import {
  createTicket,
  getTickets,
  reset,
} from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const { user } = useSelector((state) => state.auth);
  const { tickets, ticket, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.tickets);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  //   //   const [product, setProduct] = useState('iPhone');
  //   //   const [description, setDescription] = useState('');

  //   //   const [formData, setFormData] = useState({
  //   //     product: '',
  //   //     description: '',
  //   //   });

  //   //   const { product, description } = formData;
  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  // we do want to clear the state on unmount(왜냐하면 return을 썼기때문)
  // We want to reset ticket state when the component is unmounted if isSuccess is true.
  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       dispatch(reset());
  //     }
  //   };
  // }, [isSuccess, dispatch]);

  // fetch user tickets when loading
  // We just fetch the tickets when the component first mounts.
  // useEffect(() => {
  //   dispatch(getTickets());
  // }, [dispatch]);

  // 위 두개의 useEffect를 하나로 통합
  useEffect(() => {
    dispatch(getTickets());
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={'/'} />

      <h1>Tickets</h1>

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
        <div className="tickets">
          <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Tickets;
