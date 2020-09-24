import React, {  useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { firebase } from "./../components/LoginComponent"



const ShowAllCompanies = (props) => {

  const dispatch = useDispatch();

  const companiesInStore = useSelector(state => state.companies)  //from Redux
  // console.log("companies in Show All companies Comp:", companiesInStore)
  // const [companiesInStore, setCompaniesInStore] = useState([])

  const addToken = (index) => {
    props.setShowForm(false)
    props.setShowSingleCompany(true)
    props.setIndex(index)
    props.setShowAllCompanies(false)
  }



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
    
    
    function sendCompaniesToHome(companiesInStore){
      props.getCompFromShow(companiesInStore)
      
    }
    
    //////////////////////////////////////////////////////
    if(companiesInStore){
      sendCompaniesToHome(companiesInStore)
  return (
    <div>
      <table border='1' style={{
        textAlign: 'left',
        width: "80vw",
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
            <th>Tokens</th>
            <th>Expected Time </th>
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
                <td> {item.tokensCount.tokensCount} </td>      
                <td> {item.estimatedTime.estimatedTime} </td>
                <td> <button onClick={() => addToken(index)}>Click here</button> </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )}
}

export default ShowAllCompanies


// item.tokensCount.tokensCount
//item.estimatedTime.estimatedTime