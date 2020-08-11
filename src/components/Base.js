import React from "react";
import '../styles/App.css';
import RealmApp, { useRealmApp } from "../realm/RealmApp";
import RealmApolloProvider from "../realm/RealmApolloProvider";
import App from './App';
import { CircularProgress } from "@material-ui/core";

export default function Base(props) {
  return (
    <RealmApp>
      <RequireAuthentication />
    </RealmApp>
  );
};

function RequireAuthentication() {
  const app = useRealmApp();

  if (!app.user) {
    app.loginAnon();
  }
  
  return app.user ? 
    (<RealmApolloProvider>
      <App />
    </RealmApolloProvider>)
    : 
    (<div className="main-loading">
      <CircularProgress />
      <h1 style={{margin: '10px auto', color: 'white'}}>Logging in anonymously...</h1>
    </div>);
}