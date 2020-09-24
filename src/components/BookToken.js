import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
// import { firebase } from "./../components/LoginComponent"



const BookToken = (props) => {
    // const { index } = props // destructuring

    // const dispatch = useDispatch();
    console.log("props in BookToken:", props)
    
    let receivedCompanies = props.companies;

    // let reveivedCompanies = props.getCompFromShow()

//     const [companies,setCompanies] = useState([])
//     let newList = useSelector(state => state.companies)
//     if(newList != ""){
//     setCompanies([newList])
// }

    console.log("companies in Book Token:", receivedCompanies)

    /////////// GETTING COMPANIES FROM FIREBASE ///////////////

// function getDataFromFirebase() {
//   const db = firebase.firestore()

//   db.collection("companies")
//     .get()
//     .then(function (querySnapshot) {
//       querySnapshot.forEach(function (doc) {

//         // console.log(doc.id, " => ", doc.data());
//         let obj = doc.data();
       
//         dispatch({
//           type: "SHOW_COMPANY",
//           payload: obj,
//         })
//       });
//     })

//     .catch(function (error) {
//       console.log("Error getting documents: ", error);
//     });
// }
///////////////////////////////////////////////////////////////////////

    const tokenBooked = () => {
        console.log("1 token will be booked")
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
                                <td> {20} </td>
                                <td> <button style={{color:"white",backgroundColor:"green"}} onClick={() => tokenBooked()}>Yes!</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BookToken
