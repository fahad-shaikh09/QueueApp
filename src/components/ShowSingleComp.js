import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { firebase } from "./../components/LoginComponent"


const ShowSingleComp = (props) => {
    let { index } = props  //destructuring
    // const [company,setCompany] = useState([])
    console.log("index:", index)
    const company = useSelector(state => state.companies[index])
    // console.log("company: ", company)

    /////////   Getting Single company from Firebase /////////////////////////////////////////
    const db = firebase.firestore()

    // db.collection("companies")
    //     .get()
    //     .then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             console.log(doc.id, " => ", doc.data());
    //             // setCompany([doc.data()])
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log("Error getting documents: ", error);
    //     });


    /////////////////////////////////////////////////////////////

    const { name: {name}, date: {date}, certificates: {certificates}, timingsFrom: {timingsFrom}, timingsTo: {timingsTo}, address: {address} } = company
    const [tokensCount, setTokensCount] = useState(0)
    const [estimatedTime, setEstimatedTime] = useState(0)

    console.log("name: ", name)
    console.log("date: ", date)
    console.log("certificates: ", certificates)
    console.log("timingsFrom: ", timingsFrom)
    console.log("timingsTo: ", timingsTo)
    console.log("address: ", address)
    console.log("tokensCount: ", tokensCount)
    console.log("estimatedTime: ", estimatedTime)

    // const dispatch = useDispatch();


    function postTokenToFirebase() {
        db.collection("companies").doc(name).set({
            name: {name},  //OLD DATA
            date: {date}, certificates: {certificates},  //OLD DATA
            timingsFrom: {timingsFrom},  //OLD DATA
            timingsTo: {timingsTo},  //OLD DATA
            address: {address},   //OLD DATA
            tokensCount: { tokensCount },  //adding Tokens
            estimatedTime: { estimatedTime },  //adding estimated time for this particular comp
        })
            .then(function () {
                console.log("Tokens are successfully added!");
            })
            .catch(function (error) {
                console.error("Error adding Tokens: ", error);
            });
    }

    const formSubmit = (event) => {    //ON FORM SUBMIT
        event.preventDefault();
        postTokenToFirebase()
        alert("Details have been saved")
        // dispatch({
        //     type: "SHOW_COMPANY",
        //     payload: {
        //         tokensCount: tokensCount,
        //         estimatedTime: estimatedTime,
        //         index: index,
        //     }
        // })
        props.setShowSingleCompany(false)
    }

    return (
        <div>
            <h1>Company: {name}</h1>
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
