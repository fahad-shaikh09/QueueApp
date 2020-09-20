import React from 'react'
import { useSelector } from "react-redux"



const BookToken = (props) => {
    const companies = useSelector(state => state.companies)
    const { index } = props // destructuring
    // console.log("Companies from Store in BookToken", companies)
    console.log("Index from Store in BookToken", index)

    const bookToken = () => {
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
                    {companies.map((item, index) => {
                        console.log("companies array: ",companies)
                        return (
                            <tr key={index}>
                                <td>{item.name} </td>
                                <td> {item.date}</td>
                                <td> {item.certificates} </td>
                                <td> {item.timingsFrom} </td>
                                <td> {item.timingsTo} </td>
                                <td> {item.address} </td>
                                <td> {20} </td>
                                <td> <button style={{color:"white",backgroundColor:"green"}} onClick={() => bookToken()}>Yes!</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BookToken
