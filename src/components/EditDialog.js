import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeleteDialog(props) {
	const [name, setName] = useState("")
	const [exp_month, setExp_Month] = useState(0)
	const [exp_year, setExp_Year] = useState(0)

	useEffect(() => {
		setName(props.card.name)
		setExp_Month(props.card.exp_month)
		setExp_Year(props.card.exp_year)
	}, [props.card.name, props.card.exp_month, props.card.exp_year])

	return (
		<Dialog open={props.isEditDialogOpen} onClose={props.handleEditDialogClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Edit Credit Card Info</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Edit Cardholder Name or Expiration Date (To edit address, delete card and re-add.)
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Cardholder Name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="expirationMonth"
					label="Expiration Month"
					type="number"
					value={exp_month}
					onChange={(e) => setExp_Month(Number(e.target.value))}
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					id="expirationYear"
					label="Expiration Year"
					value={exp_year}
					onChange={(e) => setExp_Year(Number(e.target.value))}
					type="number"
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleEditDialogClose} color="primary">
					Cancel
				</Button>
				<Button onClick={() => {
					props.handleEditCard({name: name, exp_month: exp_month, exp_year: exp_year})
				}} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default DeleteDialog