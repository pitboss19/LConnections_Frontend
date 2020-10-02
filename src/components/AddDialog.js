import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
	CardNumberElement,
	CardElement,
	useElements,
} from '@stripe/react-stripe-js';

const useStyles = makeStyles({
	cardElement: {
		padding: "1vw",
		border: "0.5px solid grey"
	},
});

const createOptions = () => {
	return {
		style: {
			base: {
				fontSize: '16px',
				color: '#424770',
				letterSpacing: '0.025em',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#c23d4b',
			},
		},
	};
};

function AddDialog(props) {
	const classes = useStyles();
	const elements = useElements()
	const [cardHolderName, setCardHolderName] = useState("")
	const [cardNumber, setCardNumber] = useState("")
	const [cardExpiryMonth, setCardExpiryMonth] = useState(0)
	const [cardExpiryYear, setCardExpiryYear] = useState(0)
	const [cardCVC, setCardCVC] = useState(0)
	const [cardPostalCode, setCardPostalCode] = useState(0)

	return (
			<Dialog open={props.isAddDialogOpen} onClose={props.handleAddDialogClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add Credit Card</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Credit card information is safely encoded before being sent to stripe. We never see your card information or store it.
					</DialogContentText>
					<CardElement className={classes.cardElement} />
					<TextField
						margin="dense"
						id="cardHolderName"
						label="Cardholder Name"
						type="text"
						onChange={(e) => setCardHolderName(e.target.value)}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleAddDialogClose} color="primary">
						Cancel
					</Button>
					<Button onClick={() => props.handleAddCard({cardHolderName, cardPostalCode, cardElement: elements.getElement(CardElement)})} color="primary">
						Add
					</Button>
				</DialogActions>
			</Dialog>
	);
}

export default AddDialog