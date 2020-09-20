import React from 'react'
import { useSelector } from "react-redux"

const ShowAllCompanies = (props) => {

  const companiesInStore = useSelector(state => state.companies)

  const displayCompany = (index) => {
    props.setShowForm(false)
    props.setShowSingleCompany(true)
    props.setIndex(index)
    props.setShowAllCompanies(false)
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
            <th>Add Tokens?</th>
          </tr>
        </thead>

        <tbody>
          {companiesInStore.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name} </td>
                <td> {item.date}</td>
                <td> {item.certificates} </td>
                <td> {item.timingsFrom} </td>
                <td> {item.timingsTo} </td>
                <td> {item.address} </td>
                <td> <button onClick={() => displayCompany(index)}>Click here</button> </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShowAllCompanies
