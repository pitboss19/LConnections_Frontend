import React, {useState} from "react"
import {Grid, TextField, Button} from "@material-ui/core"
import {} from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	form: {
		textAlign: 'center',
		backgroundColor: "white",
		borderRadius: "5px",
		padding: "5vh 5vw"
	}
}));

const LoginForm = props => {
	const classes = useStyles()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleForm = () => {
		const variables = {
			email: email,
			password: password
		}
		props.submitForm(variables)
	}

	return (
		<div className={classes.form}>
			<Grid
				container
				spacing={2}
				direction="row"
			>
				<Grid item xs={12}>
					<h2>Login</h2>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="email"
						label="Email"
						type="email"
						placeholder="hello@world.com"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="password"
						label="Password"
						type="password"
						placeholder="password"
						autoComplete="password"
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						onChange={(e) => setPassword(e.target.value)}
						onEnter={handleForm}
					/>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={handleForm}>Submit</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default LoginForm