import React, {useState} from "react"
import { gql, useMutation } from '@apollo/client';

import {Modal, IconButton, Typography, Grid, Switch} from "@material-ui/core"
import {ArrowBack} from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

import Cookie from "js-cookie"

const signupMutationQuery = gql`
  mutation signup($email: String!, $firstName: String!, $lastName: String!, $phoneNumber: String!, $birthday: Date!, $password: String!, $address: Address!) {
    signup(email: $email, firstName: $firstName, lastName: $lastName, phoneNumber: $phoneNumber, birthday: $birthday, password: $password, address: $address) {
        token
    }
  }
`

const loginMutationQuery = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    }
  }
`

const useStyles = makeStyles((theme) => ({
	modal: {
		width: "50vw",
		display: 'flex',
		margin: "0 auto",
		alignItems: 'center',
		justifyContent: 'center',
	},
	authModal: {
		backgroundColor: "white"
	}
}));

const AuthModal = props => {
	const inHalfHour = 1/48
	const classes = useStyles();
	const [formMethod, setFormMethod] = useState("Login")
	const [loginAccount, { loadingLogin, errorLogin }] = useMutation(loginMutationQuery, {
		onCompleted: (data) => {
			Cookie.set("token", data.login.token, {expires: inHalfHour})
			props.handleClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	const [createAccount, { loadingSignup, errorSignup }] = useMutation(signupMutationQuery, {
		onCompleted: (data) => {
			Cookie.set("token", data.signup.token, {expires: inHalfHour})
			props.handleClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	let form = ""

	const handleForm = () => {
		if(formMethod === "Login") {
			setFormMethod("Signup")
		} else {
			setFormMethod("Login")
		}
	}

	const submitForm = (args) => {
		if(formMethod === "Login") {
			loginAccount({variables: {...args}})
		} else {
			createAccount({variables: {...args}})
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
				<Grid component="label" container alignItems="center" spacing={1}>
					<Grid item>Login</Grid>
					<Grid item>
						<Switch checked={formMethod !== "Login"} onChange={() => setFormMethod(formMethod === "Login" ? "Signup" : "Login")} name="formMethod" />
					</Grid>
					<Grid item>Signup</Grid>
				</Grid>
				{formMethod === "Login" ? <LoginForm submitForm={submitForm} /> : <SignupForm submitForm={submitForm} />}
			</div>

		</Modal>
	)
}

export default AuthModal


















