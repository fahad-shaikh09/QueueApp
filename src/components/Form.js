import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Form = (props) => {
    const [name, setName] = useState()
    const [date, setDate] = useState()
    const [certificates, setCertificates] = useState()
    const [timingsFrom, setTimingsFrom] = useState()
    const [timingsTo, setTimingsTo] = useState()
    const [address, setAddress] = useState()

    const dispatch = useDispatch();

    const formSubmit = event => {
        event.preventDefault();

        // console.log("name", name)
        // console.log("date", date)
        // console.log("certificates", certificates)
        // console.log("timingsFrom", timingsFrom)
        // console.log("timingsTo", timingsTo)
        // console.log("address", address)

        props.setShowForm(false)

        dispatch({
            type: "SET_COMPANY",
            payload: {
                name: name,
                date: date,
                certificates: certificates,
                timingsFrom: timingsFrom,
                timingsTo: timingsTo,
                address: address,
            }
        })
    }

    const companyName = useSelector(state => state.name)
    const companyDate = useSelector(state => state.date)
    const companyCertificates = useSelector(state => state.certificates)
    const companyTimingsFrom = useSelector(state => state.timingsFrom)
    const companyTimingsTo = useSelector(state => state.timingsTo)
    const companyAddress = useSelector(state => state.address)

    console.log("companyName from redux Store", companyName)
    console.log("companyDate from redux Store", companyDate)
    console.log("companyCertificates from redux Store", companyCertificates)
    console.log("companyTimingsFrom from redux Store", companyTimingsFrom)
    console.log("companyTimingsTo from redux Store", companyTimingsTo)
    console.log("companyAddress from redux Store", companyAddress)

    return (
        <div>
            <form onSubmit={(event) => formSubmit(event)}>
                Enter Name of Company <input type="text" onChange={e => setName(e.target.value)} />
                <br></br>  <br></br>

            Date since company is established <input type="date" onChange={e => setDate(e.target.value)} />
                <br></br>  <br></br>

            Certificates <input type="text" onChange={e => setCertificates(e.target.value)} />
                <br></br>  <br></br>

            Timings (From) <input type="date" onChange={e => setTimingsFrom(e.target.value)} />
                <br></br>  <br></br>

            Timings (To) <input type="date" onChange={e => setTimingsTo(e.target.value)} />
                <br></br>  <br></br>

            Address <input type="text" onChange={e => setAddress(e.target.value)} />
                <br></br>  <br></br>

                <input type="submit" value="Submit" />
                <br></br>  <br></br>

            </form>
        </div>
    )
}

export default Form
