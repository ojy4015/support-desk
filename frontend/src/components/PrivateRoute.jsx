import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  // only if checkingStatus is false, continue to run <Outlet />
  if (checkingStatus) {
    return <Spinner />;
  }

  //  Outlet allows us to render child routes or child element
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStatus } from '../hooks/useAuthStatus';
// import Spinner from './Spinner';

// const PrivateRoute = ({ children }) => {
//   const { loggedIn, checkingStatus } = useAuthStatus();

//   // only if checkingStatus is false, run
//   if (checkingStatus) {
//     return <Spinner />;
//   }
//   return loggedIn ? children : <Navigate to="/sign-in" />;
// };
// export default PrivateRoute;
