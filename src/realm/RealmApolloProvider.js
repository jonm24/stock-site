import * as React from "react";
import { useRealmApp } from "./RealmApp";

// Apollo
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "apollo-link-context";

export default function RealmApolloProvider({ children }) {
  const { id, user } = useRealmApp();
  const [client, setClient] = React.useState(
    createApolloClient(id, user)
  );
  React.useEffect(() => {
    setClient(createApolloClient(id, user));
  }, [id, user]);

  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
};

// TODO: Implement createApolloClient()
function createApolloClient(realmAppId, user) {
  const graphql_url = `https://stitch.mongodb.com/api/client/v2.0/app/${realmAppId}/graphql`;
  const httpLink = new HttpLink({ uri: graphql_url });
  const authorizationHeaderLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${user.accessToken}`,
    },
  }));

  return new ApolloClient({
    link: authorizationHeaderLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}