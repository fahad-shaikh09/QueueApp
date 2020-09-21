import React, { useState } from 'react'
// import { useSelector } from "react-redux"
import { firebase } from "./../components/LoginComponent"



const ShowAllCompanies = (props) => {

  // const companiesInStore = useSelector(state => state.companies)  //from Redux

  const [companiesInStore,setCompaniesInStore] = useState([])

  const addToken = (index) => {
    props.setShowForm(false)
    props.setShowSingleCompany(true)
    props.setIndex(index)
    props.setShowAllCompanies(false)
  }



  /////////// GETTING COMPANIES FROM FIREBASE ///////////////
  const db = firebase.firestore()

  db.collection("companies")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            setCompaniesInStore([doc.data()])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

  //////////////////////////////////////////////////////
// console.log("companiesInStore:", companiesInStore)

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
            <th>Add Tokens?</th>
          </tr>
        </thead>

        <tbody>
          {companiesInStore.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name.name} </td>
                <td> {item.date.date}</td>
                <td> {item.certificates.certificates} </td>
                <td> {item.timingsFrom.timingsFrom} </td>
                <td> {item.timingsTo.timingsTo} </td>
                <td> {item.address.address} </td>
                <td> <button onClick={() => addToken(index)}>Click here</button> </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShowAllCompanies
