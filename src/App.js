import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

function App({ user, signOut, signInWithGoogle }) {
  console.log("user", user && user.photoURL);

  async function callApi() {
    await axios.get("http://localhost:8000/api/auth");
  }

  React.useEffect(() => {
    if (user) {
      user
        .getIdToken()
        .then(idToken => {
          console.log("idToken", idToken);
          axios.defaults.headers.common["Authorization"] = idToken;
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={user ? user.photoURL : logo}
          className="App-logo"
          alt="logo"
        />
        {user ? <p>Salut, {user.displayName}</p> : <p>Login stp</p>}

        {user ? (
          <>
            <button onClick={signOut}>Déconnexion</button>
            <button onClick={() => callApi(user)}>ping Serveur</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Se login avec Google</button>
        )}
      </header>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
