import React, { useState } from 'react'
import { useSelector } from "react-redux"
import * as firebase from "firebase"
import Form from "./../components/Form"


const Home = () => {

  const currentUser = useSelector(state => state.user)
  const [showform,setShowForm] = useState(false)

  const companyName = useSelector(state => state.name)
    const companyDate = useSelector(state => state.date)
    const companyCertificates = useSelector(state => state.certificates)
    const companyTimingsFrom = useSelector(state => state.timingsFrom)
    const companyTimingsTo = useSelector(state => state.timingsTo)
    const companyAddress = useSelector(state => state.address)

    console.log("companyName from redux Store:", companyName)
    console.log("companyDate from redux Store:", companyDate)
    console.log("companyCertificates from redux Store:", companyCertificates)
    console.log("companyTimingsFrom from redux Store:", companyTimingsFrom)
    console.log("companyTimingsTo from redux Store:", companyTimingsTo)
    console.log("companyAddress from redux Store:", companyAddress)

  return (
    <div>
      <h1>You are Logged in as {currentUser}</h1> <br />
      <button onClick={()=> setShowForm(true)}>Are you a Company?</button> <br></br>
      <button>Are you a Person, waiting for Token?</button>
      <br></br><br></br>

      {showform && <Form setShowForm={setShowForm}/>}

      <button onClick={()=>firebase.auth().signOut()}>Click to Logout</button>
    </div>
  )
}

export default Home
