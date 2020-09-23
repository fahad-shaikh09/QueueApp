import React, { useState } from 'react'
import {  useDispatch } from 'react-redux'
import { firebase } from "./../components/LoginComponent"


const ShowSingleComp = (props) => {
    let { index } = props  //destructuring
    const [company,setCompany] = useState([])
console.log("index:",index)
    // const comp = useSelector(state => state.companies[index])

/////////   Getting Single company from Firebase /////////////////////////////////////////
const db = firebase.firestore()

  db.collection("companies")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // console.log(doc.id, " => ", doc.data());
            setCompany([doc.data()])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


    /////////////////////////////////////////////////////////////
    console.log("company[index]:", company[index])

    const {name:{name},date:{date},certificates:{certificates},timingsFrom:{timingsFrom},timingsTo:{timingsTo},address:{address}} = company
    const [tokensCount, setTokensCount] = useState()
    const [estimatedTime, setEstimatedTime] = useState()

    const dispatch = useDispatch();


function postTokenToFirebase() {
    db.collection("companies").doc(company.name).set({
        name,date,certificates,timingsFrom,timingsTo,address,   //OLD DATA
        tokensCount: { tokensCount },  //adding Tokens
        estimatedTime: { estimatedTime },  //adding estimated time for this particular comp
    })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

const formSubmit = (event) => {    //ON FORM SUBMIT
    event.preventDefault();
    alert("Details have been saved")
    dispatch({
        type: "SHOW_COMPANY",
        payload: {
            tokensCount: tokensCount,
            estimatedTime: estimatedTime,
            index: index,
        }
    })
    props.setShowSingleCompany(false)
    postTokenToFirebase()
}
return (
    <div>
        <h1>Company: {company.name}</h1>
        <h3>Total Tokens available for Today: {tokensCount} Tokens</h3>
        <h3>Estimated Time for each turn: {estimatedTime} mins</h3>

        <form onSubmit={(event) => formSubmit(event)}>

            Enter # of tokens for today:
                <input type="number" name="tokens" onChange={(e) => setTokensCount(e.target.value)} />
            <br></br>
            <br></br>
                Enter Estimated Time for each turn:
                <input type="number" name="estimatedTime" onChange={(e) => setEstimatedTime(e.target.value)} />
            <br></br>
            <br></br>

            <input type="submit" value="Update Details" />
            <br></br>
        </form>
    </div>
)
}

export default ShowSingleComp
