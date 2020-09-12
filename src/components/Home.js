import React, { useState } from 'react'
import { useSelector } from "react-redux"
import * as firebase from "firebase"
import Form from "./../components/Form"


const Home = () => {

  const currentUser = useSelector(state => state.user)
  const [showform, setShowForm] = useState(false)

  const companiesInStore = useSelector(state => state.companies)
  console.log("companiesInStore: ", companiesInStore)

  const companyName = useSelector(state => state.companies.name)
  const companyDate = useSelector(state => state.companies.date)
  const companyCertificates = useSelector(state => state.companies.certificates)
  const companyTimingsFrom = useSelector(state => state.companies.timingsFrom)
  const companyTimingsTo = useSelector(state => state.companies.timingsTo)
  const companyAddress = useSelector(state => state.companies.address)

  console.log("companyName from redux Store:", companyName)
  console.log("companyDate from redux Store:", companyDate)
  console.log("companyCertificates from redux Store:", companyCertificates)
  console.log("companyTimingsFrom from redux Store:", companyTimingsFrom)
  console.log("companyTimingsTo from redux Store:", companyTimingsTo)
  console.log("companyAddress from redux Store:", companyAddress)

  return (
    <div>
      <h1>You are Logged in as {currentUser}</h1>
      <button onClick={() => firebase.auth().signOut()}>Click to Logout</button><br />
      <hr></hr>
      <br></br>
      <br></br>


      <button onClick={() => setShowForm(true)}>Are you a Company?</button> <br></br>
      <br></br>

      <button>Are you a Person, waiting for Token?</button>
      <br></br><br></br>

      {showform && <Form setShowForm={setShowForm} />}


      <table border='1' style={{
            textAlign: 'left',
            width: "50vw",
            alignItems: "center",
            margin: "0 auto",
        }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Certificates</th>
            <th>Timings (From)</th>
            <th>Timings (To)</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {companiesInStore.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name} </td>
                <td> {item.date}</td>
                <td> {item.certificates} </td>
                <td> {item.timingsFrom} </td>
                <td> {item.timingsTo} </td>
                <td> {item.address} </td>
              </tr>
            )
          })}
        </tbody>

      </table>

    </div>
  )
}

export default Home
