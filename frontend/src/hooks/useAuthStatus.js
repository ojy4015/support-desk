import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// export const useAuthStatus = () => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   //loading
//   const [checkingStatus, setCheckingStatus] = useState(true);

//   const { user, isError, isLoading, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (user) {
//       setLoggedIn(true);
//     } else {
//       setLoggedIn(false);
//     }
//     setCheckingStatus(false);
//   }, [user]);

//   return { loggedIn, checkingStatus };
// };

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  //loading
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(isLoading);
  }, [user]);

  return { loggedIn, checkingStatus };
};

// Protected routes in v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks
