import React from "react";
import RealmApp, { useRealmApp } from "../realm/RealmApp";
import RealmApolloProvider from "../realm/RealmApolloProvider";
import App from './App';

export default function Base(props) {
  return (
    <RealmApp>
      <RequireAuthentication />
    </RealmApp>
  );
};

function RequireAuthentication() {
  const app = useRealmApp();

  console.log(app);

  if (!app.user) {
    app.loginAnon();
  } 
  return app.user ? 
    (<RealmApolloProvider>
      <App />
    </RealmApolloProvider>)
    : 
    (<div>Loading</div>);
}