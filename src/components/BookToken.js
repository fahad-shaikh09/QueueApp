import React, { useEffect, useState } from 'react'
import { firebase } from "./../components/LoginComponent"
import { useSelector, useDispatch } from "react-redux"



const BookToken = () => {

    // let receivedCompanies = props.companies;
    const dispatch = useDispatch()
    
    let receivedCompanies = useSelector(state => state.companies)
    
    const [index, setIndex] = useState()
    // const [date, setDate] = useState(receivedCompanies[index].date.date)
    // const [certificates, setCertificates] = useState(receivedCompanies[index].certificates.certificates)
    // const [timingsFrom, setTimingsFrom] = useState(receivedCompanies[index].timingsFrom.timingsFrom)
    // const [timingsTo, setTimingsTo] = useState(receivedCompanies[index].timingsTo.timingsTo)
    // const [address, setAddress] = useState(receivedCompanies[index].address.address)
    const [tokensCount, setTokensCount] = useState()
    // const [estimatedTime, setEstimatedTime] = useState(receivedCompanies[index].estimatedTime.estimatedTime)

    /////////// GETTING COMPANIES FROM FIREBASE ///////////////

    useEffect(() => getDataFromFirebase(), [])  // to get 1st company

    const db = firebase.firestore()

    function getDataFromFirebase() {

        db.collection("companies")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {

                    // console.log(doc.id, " => ", doc.data());
                    let obj = doc.data();

                    dispatch({
                        type: "SET_COMPANIES_IN_STORE",
                        payload: obj,
                    })
                });
            })

            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    // console.log("state in Booktoken from Redux:", receivedCompanies)


    const tokenBooked = (index) => {
        setIndex(index)
        let name = receivedCompanies[index].name.name;
        // console.log("1 token will be booked from Company: ", name )
        alert(`1 token will be booked from Company: ${name}`)

        --receivedCompanies[index].tokensCount.tokensCount
        // console.log("new token count:", receivedCompanies[index].tokensCount.tokensCount)
        
        let date = receivedCompanies[index].date.date
        let certificates = receivedCompanies[index].certificates.certificates
        let timingsFrom = receivedCompanies[index].timingsFrom.timingsFrom
        let timingsTo = receivedCompanies[index].timingsTo.timingsTo
        let address = receivedCompanies[index].address.address
        let tokensCount = receivedCompanies[index].tokensCount.tokensCount
        let estimatedTime = receivedCompanies[index].estimatedTime.estimatedTime
        
        setTokensCount(tokensCount)
        console.log("new token count:", tokensCount)

        //Posting uppdated token count to Firebase
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
                console.log("Token is subtracted in Firebase!");
            })
            .catch(function (error) {
                console.error("Error updating token in Firebase: ", error);
            });
        // props.addingNewComp(true)

    }



    return (
        <div>
            <table border='1' style={{
                textAlign: 'left',
                width: "50vw",
                alignItems: "center",
                margin: "0 auto",
            }}>
                <thead>
                    <tr>
                        <th>Company's Name</th>
                        <th>Date</th>
                        <th>Certificates</th>
                        <th>Timings (From)</th>
                        <th>Timings (To)</th>
                        <th>Address</th>
                        <th>Tokens left</th>
                        <th>Book a Token?</th>

                    </tr>
                </thead>

                <tbody>
                    {receivedCompanies.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name.name} </td>
                                <td> {item.date.date}</td>
                                <td> {item.certificates.certificates} </td>
                                <td> {item.timingsFrom.timingsFrom} </td>
                                <td> {item.timingsTo.timingsTo} </td>
                                <td> {item.address.address} </td>
                                <td> {item.tokensCount.tokensCount} </td>
                                <td> <button style={{ color: "white", backgroundColor: "green" }}
                                    onClick={() => tokenBooked(index)}>Yes!</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BookToken
