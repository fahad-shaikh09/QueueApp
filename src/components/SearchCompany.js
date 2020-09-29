import React, { useState } from 'react'
import * as firebase from "firebase"



const SearchCompany = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [certificates, setCertificates] = useState('')
    const [timingsFrom, setTimingsFrom] = useState('')
    const [timingsTo, setTimingsTo] = useState('')
    const [tokensCount, setTokensCount] = useState('')

    // useEffect(() => getSearchedCompany(), [])  // to get 1st company

    const db = firebase.firestore()

    function getSearchedCompany() {
        console.log("getSearchedCompany is running")

        var comp = db.collection('companies').where('name.name', '==', searchTerm);
        comp.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                setName(doc.data().name.name)
                setAddress(doc.data().address.address)
                setDate(doc.data().date.date)
                setCertificates(doc.data().certificates.certificates)
                setTimingsFrom(doc.data().timingsFrom.timingsFrom)
                setTimingsTo(doc.data().timingsTo.timingsTo)
                setTokensCount(doc.data().tokensCount.tokensCount)
            });
        })
    }

    return (
        <div>
            <h3>Enter name of company to be searched:</h3>
            <input type="text"
                placeholder="Search Company"
                onChange={e => setSearchTerm(e.target.value)} />

            <button onClick={() => getSearchedCompany()} >Search!</button>
            
            <br></br>
            <p>-------------------------------------------------------------</p>
            <h3> Searched Company's Details are as follows:</h3>
            <table border='1' style={{
                textAlign: 'left',
                width: "80vw",
                alignItems: "center",
                margin: "0 auto",
            }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Date</th>
                        <th>Certificates</th>
                        <th>TimingsFrom</th>
                        <th>TimingsTo</th>
                        <th>Tokens Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{address}</td>
                        <td>{date}</td>
                        <td>{certificates}</td>
                        <td>{timingsFrom}</td>
                        <td>{timingsTo}</td>
                        <td>{tokensCount}</td>
                    </tr>
                </tbody>
            </table>



        </div>
    )
}

export default SearchCompany
