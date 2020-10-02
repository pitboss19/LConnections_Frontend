import React, {useState} from "react"
import { gql, useMutation } from '@apollo/client';

import {Modal, IconButton, Typography, Grid, Switch} from "@material-ui/core"
import {ArrowBack} from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

import Cookie from "js-cookie"
import CleaningForm from "./CleaningForm"

const createCleaningMutation = gql`
    mutation createCleaning($customer: ID!, $type: String!, $date: DateTime!, $address: String!, $squareFootage: Float!) {
        createCleaning(customer: $customer, type: $type, date: $date, squareFootage: $squareFootage, address: $address) {
            id
        }
    }
`

// const loginMutationQuery = gql`
//     mutation login($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//             token
//         }
//     }
// `

const useStyles = makeStyles((theme) => ({
	modal: {
		position:'absolute',
		top:'10%',
		left:'10%',
		height:'100vh',
		display:'block'
	},
	authModal: {
		backgroundColor: "white"
	}
}));

const AuthModal = props => {
	const inHalfHour = 1/48
	const classes = useStyles();
	const [createCleaning, { loadingCleaning, errorCleaning }] = useMutation(createCleaningMutation, {
		onCompleted: (data) => {
			console.log("Cleaning Created")
			props.refetch()
			props.handleClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	// const [createAccount, { loadingSignup, errorSignup }] = useMutation(signupMutationQuery, {
	// 	onCompleted: (data) => {
	// 		Cookie.set("token", data.signup.token, {expires: inHalfHour})
	// 		props.handleClose()
	// 	},
	// 	onError: (err) => console.log("Error:", err)
	// })
	let form = ""

	const submitForm = (args) => {
		if(props.profileForm === "Cleaning") {
			createCleaning({variables: {...args}})
		} else {
			// payInvoice({variables: {...args}})
		}
	}

	return (
		<Modal
			className={classes.modal}
			open={props.open}
			onClose={props.handleClose}
		>
			<div className={classes.authModal}>
				<IconButton aria-label="delete" className={classes.margin} size="medium" onClick={props.handleClose}>
					<ArrowBack fontSize="inherit" />
				</IconButton>
				{props.profileForm === "Cleaning" ? <CleaningForm submitForm={submitForm} user={props.user} bookedDays={props.bookedDays} /> : <SignupForm submitForm={submitForm} />}
			</div>

		</Modal>
	)
}

export default AuthModal


















