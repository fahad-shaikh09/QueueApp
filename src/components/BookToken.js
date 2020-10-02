import React, { useEffect } from 'react'
import { firebase } from "./../components/LoginComponent"
import { useSelector, useDispatch } from "react-redux"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


////////////////// MAIN FUNCTION ///////////////////////////////////////////////////
const BookToken = () => {
    const classes = useStyles();
    // let receivedCompanies = props.companies;
    const dispatch = useDispatch()

    let receivedCompanies = useSelector(state => state.companies)


    /////////// GETTING COMPANIES FROM FIREBASE ///////////////
    // eslint-disable-next-line
    useEffect(() => getDataFromFirebase(), [])  // to get 1st company

    const db = firebase.firestore()

    function getDataFromFirebase() {

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

    // console.log("state in Booktoken from Redux:", receivedCompanies)


    const tokenBooked = (index) => {
        // setIndex(index)
        let name = receivedCompanies[index].name.name;
        // console.log("1 token will be booked from Company: ", name )
        alert(`1 token will be booked from Company: ${name}`)

        --receivedCompanies[index].tokensCount.tokensCount
        // console.log("new token count:", receivedCompanies[index].tokensCount.tokensCount)

        let date = receivedCompanies[index].date.date
        let certificates = receivedCompanies[index].certificates.certificates
        let timingsFrom = receivedCompanies[index].timingsFrom.timingsFrom
        let timingsTo = receivedCompanies[index].timingsTo.timingsTo
        let address = receivedCompanies[index].address.address
        let tokensCount = receivedCompanies[index].tokensCount.tokensCount
        let estimatedTime = receivedCompanies[index].estimatedTime.estimatedTime

        // setTokensCount(tokensCount)
        // console.log("new token count:", tokensCount)

        //Posting uppdated token count to Firebase
        db.collection("companies").doc(name).set({
            name: { name },
            date: { date },
            certificates: { certificates },
            timingsFrom: { timingsFrom },
            timingsTo: { timingsTo },
            address: { address },
            tokensCount: { tokensCount },
            estimatedTime: { estimatedTime }
        })
            .then(function () {
                console.log("Token is subtracted in Firebase!");
            })
            .catch(function (error) {
                console.error("Error updating token in Firebase: ", error);
            });
        // props.addingNewComp(true)

    }
    return (
        <div>
            <hr></hr>
            <h2>Tokens details!</h2>

            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company's Name</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                                <StyledTableCell align="right">Certificates</StyledTableCell>
                                <StyledTableCell align="right">Timings (From)</StyledTableCell>
                                <StyledTableCell align="right">Timings (To)</StyledTableCell>
                                <StyledTableCell align="right">Address</StyledTableCell>
                                <StyledTableCell align="right"> Tokens left</StyledTableCell>
                                <StyledTableCell align="right"> Book a Token?</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {receivedCompanies.map((item, index) => (
                                <StyledTableRow key={item.name}>
                                    <StyledTableCell align="right">{item.name.name}</StyledTableCell>
                                    <StyledTableCell align="right">{item.date.date}</StyledTableCell>
                                    <StyledTableCell align="right">{item.certificates.certificates}</StyledTableCell>
                                    <StyledTableCell align="right"> {item.timingsFrom.timingsFrom} </StyledTableCell>
                                    <StyledTableCell align="right"> {item.timingsTo.timingsTo} </StyledTableCell>
                                    <StyledTableCell align="right"> {item.address.address} </StyledTableCell>
                                    <StyledTableCell component="th" scope="row"> {item.tokensCount.tokensCount} </StyledTableCell>
                                    <StyledTableCell> <button style={{ color: "white", backgroundColor: "green" }}
                                        onClick={() => tokenBooked(index)}>Yes!</button> </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    )
}

export default BookToken
