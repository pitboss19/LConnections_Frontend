import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import Input from "@material-ui/core/Input"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

function PayDialog(props) {
	const classes = useStyles();
	const [paymentMethod, setPaymentMethod] = useState(0)

	console.log(props.invoice)

	let cardOptions = props.cards.map((card, index) => {
		return <option value={index}>{card.brand} {card.last4}</option>
	})

	return (
		<Dialog open={props.isPayDialogOpen} onClose={props.handlePayDialogClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Pay Invoice #{props.invoice.number}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please choose a payment method to pay ${props.invoice.amount} for Invoice #{props.invoice.number}.
				</DialogContentText>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="demo-dialog-native">Credit Card</InputLabel>
					<Select
						native
						value={paymentMethod}
						onChange={(e) => setPaymentMethod(e.target.value)}
						input={<Input id="paymentMethod" />}
					>
						<option aria-label="None" value="" />
						{cardOptions}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handlePayDialogClose} color="primary">
					Cancel Payment
				</Button>
				<Button onClick={() => {
					props.handlePayInvoice({invoiceId: props.invoice.stripeId, paymentMethod: props.cards[paymentMethod].id})
				}} color="primary">
					Pay Invoice
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default PayDialog