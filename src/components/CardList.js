import React, {useState} from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Paper from '@material-ui/core/Paper';
import DeleteDialog from "./DeleteDialog"
import EditDialog from "./EditDialog"
import {gql, useMutation} from "@apollo/client"
import AddDialog from "./AddDialog"
import {AddCircle} from "@material-ui/icons"
import {Button} from "@material-ui/core"
import {
	useElements,
	useStripe
} from "@stripe/react-stripe-js"

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	button: {
		margin: `2vh 0`
	},
});

const addCardMutation = gql`
    mutation addCard($customerId: ID!, $paymentToken: String!) {
        createCardPaymentMethod(customerId: $customerId, paymentToken: $paymentToken) {
            id
		        object
        }
    }
`

const editCardMutation = gql`
    mutation editCard($customerId: ID!, $paymentId: ID!, $name: String, $exp_month: Int, $exp_year: Int) {
        updateCardPaymentMethod(customerId: $customerId, paymentId: $paymentId, name: $name, exp_month: $exp_month, exp_year: $exp_year) {
            exp_month
            exp_year
            name
        }
    }
`

const deleteCardMutation = gql`
    mutation deleteCard($customerId: ID!, $paymentId: ID!) {
        deleteCardPaymentMethod(customerId: $customerId, paymentId: $paymentId) {
            deleted
        }
    }
`

function CardList(props) {
	const stripe = useStripe()
	const elements = useElements()
	const [addCard, { loadingAddCard, errorAddCard }] = useMutation(addCardMutation, {
		onCompleted: (data) => {
			props.refetch()
			handleAddDialogClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	const [editCard, { loadingEditCard, errorEditCard }] = useMutation(editCardMutation, {
		onCompleted: (data) => {
			props.refetch()
			handleEditDialogClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	const [deleteCard, { loadingDeleteCard, errorDeleteCard }] = useMutation(deleteCardMutation, {
		onCompleted: (data) => {
			props.refetch()
			handleDeleteDialogClose()
		},
		onError: (err) => console.log("Error:", err)
	})
	const [actionableCard, setActionableCard] = useState({})
	const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
	const classes = useStyles();

	const handleAddDialogClose = () => {
		setIsAddDialogOpen(false)
	}

	const handleAddCard = async (args) => {
		const tokenObject = await stripe.createToken(
			args.cardElement, {
			name: args.cardHolderName
		})
		addCard({variables: {customerId: props.userData.stripeId, paymentToken: tokenObject.token.id}})
	}

	const handleEditDialogClose = () => {
		setIsEditDialogOpen(false)
	}

	const handleEditCard = (args) => {
		editCard({variables: {customerId: props.userData.stripeId, paymentId: actionableCard.id, ...args}})
	}

	const handleDeleteDialogClose = () => {
		setIsDeleteDialogOpen(false)
	}

	const handleDeleteCard = (args) => {
		deleteCard({variables: {customerId: props.userData.stripeId, paymentId: actionableCard.id}})
	}


	return (
		<>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				startIcon={<AddCircle/>}
				onClick={() => setIsAddDialogOpen(true)}
			>
				Add Credit Card
			</Button>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Brand</TableCell>
							<TableCell align="right">Last 4</TableCell>
							<TableCell align="right">Card Owner</TableCell>
							<TableCell align="right">Expiration</TableCell>
							<TableCell align="right">Options</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.cards.map((card) => (
							<TableRow key={card.id}>
								<TableCell component="th" scope="row">
									{card.brand}
								</TableCell>
								<TableCell align="right">{card.last4}</TableCell>
								<TableCell align="right">{card.name}</TableCell>
								<TableCell align="right">{card.exp_month + "/" + card.exp_year}</TableCell>
								<TableCell align="right">
									<IconButton aria-label="update">
										<EditIcon onClick={async () => {
											setActionableCard(card)
											setIsEditDialogOpen(true)
										}}/>
									</IconButton>
									<IconButton aria-label="delete">
										<DeleteIcon onClick={() => {
											setActionableCard(card)
											setIsDeleteDialogOpen(true)
										}} />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<AddDialog isAddDialogOpen={isAddDialogOpen} handleAddCard={handleAddCard} handleAddDialogClose={handleAddDialogClose} />
				<EditDialog card={actionableCard} isEditDialogOpen={isEditDialogOpen} handleEditCard={handleEditCard} handleEditDialogClose={handleEditDialogClose} />
				<DeleteDialog card={actionableCard} isDeleteDialogOpen={isDeleteDialogOpen} handleDeleteCard={handleDeleteCard} handleDeleteDialogClose={handleDeleteDialogClose} />
			</TableContainer>
		</>
	);
}

export default CardList