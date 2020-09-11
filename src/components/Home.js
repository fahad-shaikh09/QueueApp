import React from 'react'
import { useSelector } from "react-redux"

const Home = () => {

  const currentUser = useSelector(state => state.user)
  return (
    <div>
      <h1>You are Logged in as {currentUser}</h1> <br />
      <button>Are you a Company?</button> <br></br>
      <button>Are you a Person, waiting for Token?</button>
      <br></br><br></br>
    </div>
  )
}

export default Home
