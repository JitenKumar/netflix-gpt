import React from "react";
import { useState, useRef } from "react";
import Header from "./Header";
import { validateLoginFormData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const userFullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleFormSubmit = (e) => {
    const validationMessage = validateLoginFormData(
      email.current.value,
      password.current.value
    );
    if (validationMessage != null || validationMessage !== undefined) {
      setErrorMessage(validationMessage);
      return;
    }

    // Handle Login to Firebase
    if (!isSignInForm) {
      //SignUp user
      console.log("Creating usr on firebase...");
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          console.log("user is created...");
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userFullName.current.value,
            photoURL: null,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(login({ uid, email, displayName }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.code + "-" + error.message);
              // ...
            });
          console.log(user);

          // ...
        })
        .catch((error) => {
          console.log(errorMessage);
        });
    } else {
      //Login user
      console.log("Login the user");
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          console.log("user is logged...");
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    /**Elese login in/signUP user */
  };
  const handleSignInToggle = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black bg-opacity-80 absolute w-3/12 my-36 mx-auto left-0 right-0 text-white rounded-lg"
      >
        <h1 className="my-2 font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={userFullName}
            className="p-4 my-2 w-full bg-gray-900"
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className="p-4 my-2 w-full bg-gray-900"
          type="text"
          placeholder="Email Address"
        />
        <input
          ref={password}
          className="p-4 my-2 w-full bg-gray-900"
          type="password"
          placeholder="Password"
        />
        <button
          onClick={handleFormSubmit}
          className="p-4 my-6 w-full bg-red-700 rounded-lg"
          type="submit"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-red-600">{errorMessage}</p>
        <p className="cursor-pointer" onClick={handleSignInToggle}>
          {isSignInForm
            ? "New to Netflix? Sign Up"
            : "Already Registered, Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
