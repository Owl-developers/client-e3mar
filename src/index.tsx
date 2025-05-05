import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './css/index.css'

import Root from './Root.tsx'

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <StrictMode>
      <Root />
    </StrictMode>
  </ApolloProvider>
)
