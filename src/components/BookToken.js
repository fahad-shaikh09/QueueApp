import React, { useEffect, useState } from 'react'
import { firebase } from "./../components/LoginComponent"
import { useSelector, useDispatch } from "react-redux"



const BookToken = () => {

    // let receivedCompanies = props.companies;
    const [index,setIndex] = useState()
    const dispatch = useDispatch()
    // const [tokensLeft,setTokensLeft] = useState();

   /////////// GETTING COMPANIES FROM FIREBASE ///////////////

   useEffect(()=> getDataFromFirebase(),[])  // to get 1st company

  
   function getDataFromFirebase() {
     const db = firebase.firestore()
 
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
     
    let receivedCompanies = useSelector(state => state.companies)
    // console.log("state in Booktoken from Redux:", receivedCompanies)


    const tokenBooked = (index) => {
        setIndex(index)
        let compName = receivedCompanies[index].name.name;
        // console.log("1 token will be booked from Company: ", compName )
        alert(`1 token will be booked from Company: ${compName}`)
        
        --receivedCompanies[index].tokensCount.tokensCount
        // setTokensLeft(--tokens)
        console.log("new token count:", receivedCompanies[index].tokensCount.tokensCount)
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
                                <td> <button style={{color:"white",backgroundColor:"green"}} onClick={() => tokenBooked(index)}>Yes!</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BookToken
