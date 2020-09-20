import React, { useState } from 'react'
import { useSelector } from "react-redux"
import * as firebase from "firebase"
import Form from "./../components/Form"
import MyMapComponent from "./../components/Map/index"
import ShowSingleComp from "./ShowSingleComp"
import BookToken from "./BookToken"
import ShowAllCompanies from "./ShowAllCompanies"

const Home = () => {

  const currentUser = useSelector(state => state.user)
  const [showform, setShowForm] = useState(false)
  const [showSingleCompany, setShowSingleCompany] = useState(false);
  const [showBookToken, setShowBookToken] = useState(false)
  const [showAllCompanies,setShowAllCompanies] = useState(false)

  // const companiesInStore = useSelector(state => state.companies)
  const [index, setIndex] = useState()
  // console.log("companiesInStore: ", companiesInStore)

  
  const ShowForm = () => {
    setShowForm(!showform)
  }

  const bookToken = () => {
    setShowForm(showform)
    setShowSingleCompany(showSingleCompany)
    setShowBookToken(!showBookToken)

  }

  const displayCompanies = () => {
    setShowAllCompanies(!showAllCompanies)
  }

  return (
    <div>
      <h1>You are Logged in as {currentUser}</h1>
      <button onClick={() => firebase.auth().signOut()}>Click to Logout</button><br />
      <hr></hr>
      <br></br>
      <br></br>
      {/* ///////////////////////////////////////////////////////////////////////////////////// */}

      <button onClick={() => ShowForm()}>Are you a Company?</button> <br></br>
      <br></br>

      <button onClick={() => bookToken()}>Are you a Person, waiting for Token?</button>
      <br></br><br></br>
      <p>---------------------------------------------------------------------------</p>

      
      <button onClick={() => displayCompanies()}>Do you want to see List of Companies?</button>
      <br></br><br></br>
      {showAllCompanies && <ShowAllCompanies setShowForm={setShowForm} setShowSingleCompany={setShowSingleCompany} setIndex={setIndex} setShowAllCompanies={setShowAllCompanies}/>}

      {showform && <Form setShowForm={setShowForm} />}


      <br></br><br></br>
      {showSingleCompany && <ShowSingleComp index={index} setShowSingleCompany={setShowSingleCompany} />}

      {showBookToken && <BookToken index={index} />}




      <br></br>      <br></br>      <br></br>      <br></br>      <br></br>
      <MyMapComponent
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

    </div>
  )
}

export default Home
