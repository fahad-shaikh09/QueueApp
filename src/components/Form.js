import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { firebase } from "./../components/LoginComponent"
import MyMapComponent from "./../components/Map/index"

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));


const Form = (props) => {
    const classes = useStyles();

    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [certificates, setCertificates] = useState()
    const [timingsFrom, setTimingsFrom] = useState()
    const [timingsTo, setTimingsTo] = useState()
    const [address, setAddress] = useState()
    let tokensCount = 0;
    let estimatedTime = 0;

    console.log("name:", name)
    console.log("date:", date)
    console.log("certificates:", certificates)
    console.log("timingsFrom:", timingsFrom)
    console.log("timingsTo:", timingsTo)
    console.log("address:", address)

    function getAddress(value) {
        setAddress(value)
    }

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
            tokensCount: { tokensCount },
            estimatedTime: { estimatedTime }
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
        <div
        // style={{
        //     textAlign: 'left',
        //     width: "50vw",
        //     alignItems: "center",
        //     margin: "0 auto",
        // }}
        >
            <hr />
            <h2>Enter details of new company to be added:</h2>
            <form onSubmit={(event) => formSubmit(event)}>

                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Enter Name of Company"
                    variant="outlined"
                    type="text" onChange={e => setName(e.target.value)}
                />
                {/* Enter Name of Company <input type="text" onChange={e => setName(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                <TextField
                    required
                    id="date"
                    label="Date Since Company is established"
                    type="date"
                    // defaultValue="2020-09-27"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setDate(e.target.value)}
                />
                {/* Date since company is established <input required type="date" onChange={e => setDate(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Certificates"
                    variant="outlined"
                    type="text" onChange={e => setCertificates(e.target.value)}
                />
                {/* Certificates <input required type="text" onChange={e => setCertificates(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                <TextField
                    required
                    id="datetime-local"
                    label="Timings From"
                    type="datetime-local"
                    // defaultValue="2020-09-27"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setTimingsFrom(e.target.value)}
                />
                {/* Timings (From) <input required type="date" onChange={e => setTimingsFrom(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                <TextField
                    required
                    id="datetime-local"
                    label="Timings To"
                    type="datetime-local"
                    // defaultValue="2020-09-27"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => setTimingsTo(e.target.value)}
                />
                {/* Timings (To) <input required type="date" onChange={e => setTimingsTo(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                {/* <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Address"
                    variant="outlined"
                    type="text"
                    onChange={e => setAddress(e.target.value)}
                /> */}
                {/* Address <input required type="text" onChange={e => setAddress(e.target.value)} /> */}
                <br></br>  <br></br>
                <br></br>


                <MyMapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    // onChange={e => setAddress(e.target.value)}
                    getAddress={getAddress}
                />
                
                <br></br>  <br></br>
                <br></br>
                <Fab type="submit" color="primary" aria-label="add">
                    <AddIcon />
                </Fab>

                {/* <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button> */}

                {/* <input type="submit" value="Submit" /> */}
                <br></br>  <br></br>

            </form>

            {/* //////////////////////////////////////////////////////////////////////////////////// */}


        </div>
    )
}

export default Form
