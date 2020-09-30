import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import * as firebase from "firebase"
import Form from "./../components/Form"
import ShowSingleComp from "./ShowSingleComp"
import BookToken from "./BookToken"
import ShowAllCompanies from "./ShowAllCompanies"
import SearchCompany from "./SearchCompany"
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Home = () => {

  const classes = useStyles();

  const currentUser = useSelector(state => state.user)
  const [showform, setShowForm] = useState(false)
  const [showSingleCompany, setShowSingleCompany] = useState(false);
  const [showBookToken, setShowBookToken] = useState(false)
  const [showAllCompanies, setShowAllCompanies] = useState(false)
  const [addNewComp, setAddNewComp] = useState(false)
  const [searchCompany, setSearchCompany] = useState(false);

  

  // var companiesInStore = useSelector(state => state.companies)
  const [index, setIndex] = useState()
  // console.log("companiesInStore in HOME: ", companiesInStore)


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

  const showSearchCompany = () => {
    setShowAllCompanies(showAllCompanies)
    setSearchCompany(!searchCompany)
  }



return (
  <div>
    <h1>You are Logged in as {currentUser}</h1>
    <button onClick={() => firebase.auth().signOut()}>Click to Logout</button><br />
    <hr></hr>
    <br></br>
    <br></br>
    {/* ///////////////////////////////////////////////////////////////////////////////////// */}

    <Button className={classes.button} variant="contained" color="primary" onClick={() => ShowForm()}>
      Do you want to Add a Company?</Button> <br></br>
    <br></br>

    <Button className={classes.button} variant="contained" onClick={() => bookToken()}>
      Are you a Person, waiting for Token?</Button>
    <br></br><br></br>
    <p>---------------------------------------------------------------------------</p>


    <Button variant="contained" color="secondary" onClick={() => displayCompanies()}>
      Do you want to see List of Companies?</Button>
    <br></br><br></br>

    <Button variant="contained" color="green" onClick={() => showSearchCompany()}>
      Do you want to search any company?</Button>
    <br></br><br></br>

    {/* TO RENDER ALL COMPANIES  */}
    {showAllCompanies && <ShowAllCompanies addingNewComp={addingNewComp} setShowForm={setShowForm} setShowSingleCompany={setShowSingleCompany} setIndex={setIndex} setShowAllCompanies={setShowAllCompanies} />}


    {/* TO ADD NEW COMPANY  */}
    {showform && <Form setShowForm={setShowForm} addingNewComp={addingNewComp} />}


    <br></br><br></br>
    {/* TO GIVE ADD TOKEN OPTION  */}
    {showSingleCompany && <ShowSingleComp index={index} setShowSingleCompany={setShowSingleCompany} />}


    {/* TO BOOK TOKEN OF ANY COMPANY  */}
    {showBookToken && <BookToken index={index} />}


    {/* TO SEARCH  COMPANY  */}
    {searchCompany && <SearchCompany />}

    <br></br>      <br></br>      <br></br>      <br></br>      <br></br>
   

  </div>
)
}

export default Home
