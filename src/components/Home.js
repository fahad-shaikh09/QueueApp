import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
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
  const [showAllCompanies, setShowAllCompanies] = useState(false)
  const [addNewComp, setAddNewComp] = useState(false)

  const [companies,setCompanies] = useState()

  function getCompFromShow(companies){
    setCompanies(companies)
  }

console.log("companies in Home", companies)

  // var companiesInStore = useSelector(state => state.companies)
  const [index, setIndex] = useState()
  // console.log("companiesInStore: ", companiesInStore)


  const ShowForm = () => {
    setShowForm(!showform)
  }

  const dispatch = useDispatch();
  
  const bookToken = () => {
    setShowForm(showform)
    setShowSingleCompany(showSingleCompany)
    setShowBookToken(!showBookToken)
  }
  
  const displayCompanies = () => {
    // companiesInStore = []
    dispatch({
      type: "EMPTY_COMPANIES_IN_STORE"
    })
    setShowAllCompanies(!showAllCompanies)

  }

  const addingNewComp = () => {
    setAddNewComp(!addNewComp)
  }

  return (
    <div>
      <h1>You are Logged in as {currentUser}</h1>
      <button onClick={() => firebase.auth().signOut()}>Click to Logout</button><br />
      <hr></hr>
      <br></br>
      <br></br>
      {/* ///////////////////////////////////////////////////////////////////////////////////// */}

      <button onClick={() => ShowForm()}>Do you want to Add a Company?</button> <br></br>
      <br></br>

      <button onClick={() => bookToken()}>Are you a Person, waiting for Token?</button>
      <br></br><br></br>
      <p>---------------------------------------------------------------------------</p>


      <button onClick={() => displayCompanies()}>Do you want to see List of Companies?</button>
      <br></br><br></br>

      {/* TO RENDER ALL COMPANIES  */}
      {showAllCompanies && <ShowAllCompanies getCompFromShow={getCompFromShow} addingNewComp={addingNewComp} setShowForm={setShowForm} setShowSingleCompany={setShowSingleCompany} setIndex={setIndex} setShowAllCompanies={setShowAllCompanies} />}


      {/* TO ADD NEW COMPANY  */}
      {showform && <Form setShowForm={setShowForm} addingNewComp={addingNewComp} />}


      <br></br><br></br> 
      {/* TO GIVE ADD TOKEN OPTION  */}
      {showSingleCompany && <ShowSingleComp index={index} setShowSingleCompany={setShowSingleCompany} />}


      {/* TO BOOK TOKEN OF ANY COMPANY  */}
      {showBookToken && <BookToken index={index} companies={companies} />}




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
