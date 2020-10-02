import React, {useState} from "react"
import {Grid, TextField, Button, InputLabel, Select, FormControl} from "@material-ui/core"
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import {} from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	form: {
		textAlign: 'center',
		backgroundColor: "white",
		borderRadius: "5px",
		padding: "5vh 5vw"
	}
}));

const CleaningForm = props => {
	const classes = useStyles()
	const [address_line1, setAddress_Line1] = useState("")
	const [type, setType] = useState("")
	const [squareFootage, setSquareFootage] = useState(0)
	const [date, setDate] = useState(moment().toISOString())

	function disableWeekendsAndBookedDays(disableDate) {
		// Weekdays should be 1-5
		// Weekends should be 0 or 6
		disableDate = new Date(disableDate)
		let today = new Date()
		let currentMonth = new Date().getMonth()

		// Disable Weekends
		if (disableDate.getDay() === 0 || disableDate.getDay() === 6) {
			return true
		// Allow only this month
		} else if(disableDate.getMonth() !== currentMonth) {
			return true
		// Disable Today
		} else if(disableDate.getDate() === today.getDate()) {
			return true
		} else {
			for(let i = 0; i < props.bookedDays.length; i++){
				let bookedDay = new Date(props.bookedDays[i]._id).getDate()
				if (disableDate.getDate() === bookedDay) return true
			}
		}
	}


	const handleForm = () => {
		const variables = {
		customer: props.user._id,
		address: address_line1,
		type: type,
		squareFootage: Number(squareFootage),
		date: date,
		}
		props.submitForm(variables)
	}

	return (
		<div className={classes.form}>
			<Grid
				container
				direction="row"
				>
				<Grid item xs={12}>
					<Grid
						container
						spacing={3}
						direction="row"
					>
						<Grid item xs={12}>
							<h2>Schedule a Cleaning</h2>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address_line1"
								label="Address"
								type="text"
								fullWidth={true}
								placeholder="Address, City, Zip"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								onChange={(e) => setAddress_Line1(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="squareFootage"
								label="Square Footage"
								type="number"
								placeholder="1200"
								InputLabelProps={{
									shrink: true,
								}}
								variant="outlined"
								fullWidth={true}
								onChange={(e) => setSquareFootage(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<FormControl variant="outlined">
								<InputLabel htmlFor="outlined-type-native-simple">Cleaning Type</InputLabel>
								<Select
									native
									value={type}
									onChange={(e) => setType(e.target.value)}
									label="Cleaning Type"
									inputProps={{
										name: 'type',
										id: 'outlined-type-native-simple',
									}}
								>
									<option aria-label="None" value="" />
									<option value={"Routine"}>Routine</option>
									<option value={"Deep"}>Deep</option>
									<option value={"Post Construction"}>Post Construction</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} sm={6}>
							<KeyboardDateTimePicker
								id="date"
								label="Cleaning Date"
								value={date}
								onChange={(date) => setDate(date.toISOString())}
								shouldDisableDate={(disableDate) => disableWeekendsAndBookedDays(disableDate)}
								format="MM/DD/YYYY h A"
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" onClick={handleForm}>Schedule</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default CleaningForm
