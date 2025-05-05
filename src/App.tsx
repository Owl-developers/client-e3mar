import { useState } from 'react'
import { useQuery, gql } from '@apollo/client';

import './App.css'

const schema = gql `
  query login {
    login(
      username: "ebrahimallawi", 
      password: "ebrahimallawi",
      email: "ebrahimallawi4@gmail.com"
    ) {
      username,isSuperAdmin,_id
  }
}
`

function App() {
  const { loading, error, data } = useQuery(schema);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data.login.isSuperAdmin)
  const a = String(data.login.isSuperAdmin)
  return (
    <>
      <h1>Hello World</h1>
      {a}
      
    </>
  )
}

export default App
