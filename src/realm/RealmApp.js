import * as React from 'react';
import * as RealmWeb from "realm-web";

const REALM_APP_ID = "test-realm-fxkhq"
const app = new RealmWeb.app({id: REALM_APP_ID});

const RealmAppContext = React.createContext(null);

export default function RealmApp({children}) {
  const appRef = React.useRef(app);
  const [user, setUser] = React.useState(app.currentUser);
  React.useEffect(() => {
    setUser(app.currentUser);
  }, [appRef.current.currentUser]);

  // create an anonymous credential
  async function loginAnon() {
    const credentials = RealmWeb.Credentials.anonymous();
    try {
      // authenticate the user
      const user = await app.logIn(credentials);
      // `app.currentUser` updates to match the logged in user
      console.log("Successfully logged in!", user);
      setUser(app.currentUser);
    } catch(err) {
      console.error("Failed to log in", err);
    }
  }

  const context = {
    id: REALM_APP_ID,
    user: user,
    loginAnon
  };

  return (
    <RealmAppContext.Provider value={context}>
      {children}
    </RealmAppContext.Provider>
  );
};

export const useRealmApp = () => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error("You must call useRealmApp() inside of a <RealmApp />.");
  }
  return app;
};