import React, {useState, useEffect} from "react"
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
		position:'absolute',
		top:'10%',
		left:'10%',
		overflow:'scroll',
		height:'100vh',
		display:'block'
	},
	authModal: {
		backgroundColor: "white"
	}
}));

const AuthModal = props => {
	const inHalfADay = 0.5;
	const classes = useStyles();
	const [formMethod, setFormMethod] = useState("Login")
	const [loginAccount, { loadingLogin, errorLogin }] = useMutation(loginMutationQuery, {
		onCompleted: (data) => {
			Cookie.set("token", data.login.token, {expires: inHalfADay})
			props.handleClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	const [createAccount, { loadingSignup, errorSignup }] = useMutation(signupMutationQuery, {
		onCompleted: (data) => {
			Cookie.set("token", data.signup.token, {expires: inHalfADay})
			props.handleClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	let form = ""

	const handleForm = () => {
		if(formMethod === "Login") {
			setFormMethod("Signup")
			props.setClickedButton("Login")
		} else {
			setFormMethod("Login")
			props.setClickedButton("Signup")
		}
	}

	const submitForm = (args) => {
		if(formMethod === "Login") {
			loginAccount({variables: {...args}})
		} else {
			createAccount({variables: {...args}})
		}
	}

	useEffect(() => {
		setFormMethod(props.clickedButton)
	}, [props.clickedButton])

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
				<Grid component="label" container alignItems="center">
					<Grid item xs={12} align="center">
						Login <Switch checked={formMethod !== "Login"} onChange={() => setFormMethod(formMethod === "Login" ? "Signup" : "Login")} name="formMethod" /> Signup
					</Grid>
				</Grid>
				{formMethod === "Login" ? <LoginForm submitForm={submitForm} /> : <SignupForm submitForm={submitForm} />}
			</div>

		</Modal>
	)
}

export default AuthModal


















