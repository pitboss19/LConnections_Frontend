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
	},
	birthdayInput: {
		padding: "0"
	}
}));

const SignupForm = props => {
	const classes = useStyles()
	const [address_line1, setAddress_Line1] = useState("")
	const [address_line2, setAddress_Line2] = useState("")
	const [address_city, setAddress_City] = useState("")
	const [address_state, setAddress_State] = useState("")
	const [address_zip, setAddress_Zip] = useState("")
	const [email, setEmail] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [birthday, setBirthday] = useState("")
	const [password, setPassword] = useState("")

	const handleForm = () => {
		const variables = {
		address: {address_line1, address_line2, address_city, address_state, address_zip},
		email: email,
		firstName: firstName,
		lastName: lastName,
		phoneNumber: phoneNumber,
		birthday: birthday,
		password: password
		}
		props.submitForm(variables)
	}

	return (
		<div className={classes.form}>
			<Grid
				container
				direction="row"
				spacing={2}
				>
				<Grid item xs={12}>
					<h2>Signup</h2>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Grid
						container
						spacing={2}
						direction="row"
					>
						<Grid item xs={12}>
							<TextField
								id="address_line1"
								label="Address"
								type="text"
								placeholder="123 Main Street"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_Line1(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address_line2"
								label="Address Line 2"
								type="text"
								placeholder="Optional (PO Box, Etc..)"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_Line2(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address_city"
								label="City"
								type="text"
								placeholder="City"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_City(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address_state"
								label="State"
								type="text"
								placeholder="State"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_State(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address_zip"
								label="ZipCode"
								type="text"
								placeholder="35055"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_Zip(e.target.value)}
							/>
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Grid
						container
						spacing={2}
						direction="row"
					>
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
								autoComplete="password"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="firstName"
								label="First Name"
								type="text"
								placeholder="Jane"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="lastName"
								label="Last Name"
								type="text"
								placeholder="Doe"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="phoneNumber"
								label="Phone Number"
								type="tel"
								placeholder="1112223333"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="date"
								label="Birthday"
								type="date"
								placeholder="Birthday"
								InputLabelProps={{
									shrink: true,
								}}
								className={classes.birthdayInput}
								variant="outlined"
								onChange={(e) => setBirthday(e.target.value)}
								onEnter={handleForm}
							/>
						</Grid>

					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={handleForm}>Submit</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default SignupForm
