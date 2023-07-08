import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/dashboard';
import { setUserEmail } from './redux/slices/userslice';
import { onAuthStateChanged } from 'firebase/auth';
import Details from './pages/details/details';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        dispatch(setUserEmail(email));
      } else {
        dispatch(setUserEmail(''));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
