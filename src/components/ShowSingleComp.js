import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const ShowSingleComp = (props) => {
    let { index } = props  //destructuring
    // console.log("index in ShowSingleComp Comp:", index)

    const comp = useSelector(state => state.companies[index])
    // console.log("comp:", comp)

    const [tokensCount, setTokensCount] = useState()
    const [estimatedTime, setEstimatedTime] = useState()

    const dispatch = useDispatch();

    const formSubmit = (event) => {    //ON FORM SUBMIT
        event.preventDefault();
        alert("Details have been saved")
        dispatch({
            type: "SHOW_COMPANY",
            payload: {
                tokensCount: tokensCount,
                estimatedTime: estimatedTime,
                index: index,
            }
        })
        props.setShowSingleCompany(false)

    }

    return (
        <div>
            <h1>Company: {comp.name}</h1>
            <h3>Total Tokens available for Today: {tokensCount} Tokens</h3>
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

                <input type="submit" value="Update Details" />
                <br></br>
            </form>
        </div>
    )
}

export default ShowSingleComp
