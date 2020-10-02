import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function DeleteDialog(props) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
			<Dialog
				fullScreen={fullScreen}
				open={props.isDeleteDialogOpen}
				onClose={props.handleDeleteDialogClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Delete Credit Card?"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Deleting a credit card will permanently remove it from your account.
					</DialogContentText>
					<DialogContentText>
						Selected Card: {props.card.brand} {props.card.last4} ({props.card.name})
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={props.handleDeleteDialogClose} color="primary">
						No, Keep Card
					</Button>
					<Button onClick={props.handleDeleteCard} color="primary" autoFocus>
						Yes, Delete Card
					</Button>
				</DialogActions>
			</Dialog>
	);
}

export default DeleteDialog