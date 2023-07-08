import React from 'react';
import './header.scss';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import { auth } from '../../firebase';

export const AppHeader = () => {
  const email = useSelector((state) => state.user.email);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.log('Logout error:', error);
      });
  };

  return (
    <div className="AppHeader">
       Hello {email}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
