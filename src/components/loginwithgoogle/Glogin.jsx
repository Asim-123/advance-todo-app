import React, { useEffect } from "react";
import "./Glogin.scss";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../redux/slices/userslice"; // Import the action creator
import { auth, provider } from "../../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const Glogin = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const email = user.email;
        dispatch(setUserEmail(email)); // Dispatch the action with the email payload
        console.log(email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        dispatch(setUserEmail(email)); // Dispatch the action with the email payload
      }
    });
  });

  return (
    <div className="login-card">
              <h1>Please Login</h1>
      <div className="container">
        <Button className="google-button" onClick={handleClick}>
          Login With Google
        </Button>
      </div>
    </div>
  );
};

export default Glogin;
