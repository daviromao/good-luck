import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const fetchQuery = async (operation: any, variables: any) => {
  const token = localStorage.getItem('token');

  const graphqlPath = 'http://localhost:3333/graphql';

  const response = await fetch(graphqlPath, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
