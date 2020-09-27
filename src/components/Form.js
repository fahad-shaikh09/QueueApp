import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { firebase } from "./../components/LoginComponent"

const Form = (props) => {
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [certificates, setCertificates] = useState()
    const [timingsFrom, setTimingsFrom] = useState()
    const [timingsTo, setTimingsTo] = useState()
    const [address, setAddress] = useState()
    let tokensCount = 0;
    let estimatedTime =  0;


    const dispatch = useDispatch();
    const db = firebase.firestore()

    function postDataToFirebase() {
        // Add a new document in collection "companies"
        db.collection("companies").doc(name).set({
            name: { name },
            date: { date },
            certificates: { certificates },
            timingsFrom: { timingsFrom },
            timingsTo: { timingsTo },
            address: { address },
            tokensCount: {tokensCount},
            estimatedTime: {estimatedTime}
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        props.addingNewComp(true)    
    }



    const formSubmit = event => {
        event.preventDefault();
        alert("Company has been added!")
        props.setShowForm(false)

        dispatch({
            type: "ADD_COMPANY",
            payload: {
                name: name,
                date: date,
                certificates: certificates,
                timingsFrom: timingsFrom,
                timingsTo: timingsTo,
                address: address,
                tokensCount: 0,
                estimatedTime: 0,
            }
        })
        postDataToFirebase()
    }


    return (
        <div style={{
            textAlign: 'left',
            width: "50vw",
            alignItems: "center",
            margin: "0 auto",
        }}>
            <hr/>
            <form onSubmit={(event) => formSubmit(event)}>
                Enter Name of Company <input type="text" onChange={e => setName(e.target.value)} />
                <br></br>  <br></br>

            Date since company is established <input required type="date" onChange={e => setDate(e.target.value)} />
                <br></br>  <br></br>

            Certificates <input required type="text" onChange={e => setCertificates(e.target.value)} />
                <br></br>  <br></br>

            Timings (From) <input required type="date" onChange={e => setTimingsFrom(e.target.value)} />
                <br></br>  <br></br>

            Timings (To) <input required type="date" onChange={e => setTimingsTo(e.target.value)} />
                <br></br>  <br></br>

            Address <input required type="text" onChange={e => setAddress(e.target.value)} />
                <br></br>  <br></br>

                <input type="submit" value="Submit" />
                <br></br>  <br></br>

            </form>
        </div>
    )
}

export default Form
