import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const ShowSingleComp = (props) => {
    console.log("index in ShowSingleComp Comp:", props.index)
    const comp = useSelector(state => state.companies[props.index])
    console.log("comp:", comp)
    const [tokensCount, setTokensCount] = useState()
    const [estimatedTime,setEstimatedTime] = useState()

    const formSubmit = (event) => {
        event.preventDefault();

    }
    return (
        <div>
            <h1>Company: {comp.name}</h1>
            <h3>Total Tokens for Today: {tokensCount} Tokens</h3>
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
                <br></br>
            </form>
        </div>
    )
}

export default ShowSingleComp
