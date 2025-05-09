import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './css/index.css'
import "./css/sign.css"

import Root from './Root.tsx'
import store from './store/store'
const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <StrictMode>
        <Root />
      </StrictMode>
    </Provider>
  </ApolloProvider>
)
