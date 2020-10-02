import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import Button from "@material-ui/core/Button"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import SaveIcon from "@material-ui/icons/Save"
import ReceiptIcon from '@material-ui/icons/Receipt';
import {gql, useMutation} from "@apollo/client"
import PayDialog from "./PayDialog"
const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
})

const payInvoiceMutation = gql`
    mutation payInvoice($invoiceId: ID!, $paymentMethod: ID!) {
        payInvoice(invoiceId: $invoiceId, paymentMethod: $paymentMethod) {
            status
        }
    }
`

export default function BasicTable(props) {
	const classes = useStyles()
	const [isPayDialogOpen, setIsPayDialogOpen] = React.useState(false);
	const [payInvoice, { loadingPayInvoice, errorPayInvoice }] = useMutation(payInvoiceMutation, {
		onCompleted: (data) => {
			props.refetch()
			handlePayDialogClose()
		},
		onError: (err) => console.log("Error:", err)
	})

	const handlePayDialogClose = () => {
		setIsPayDialogOpen(false)
	}

	const handlePayInvoice = (args) => {
		console.log(args.paymentMethod, args.invoiceId)
		payInvoice({variables: {paymentMethod: args.paymentMethod, invoiceId: args.invoiceId}})
	}

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Invoice #</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Due Date</TableCell>
						<TableCell align="right">Amount</TableCell>
						<TableCell align="right">Options</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.invoices.map((invoice) => (
						<TableRow key={invoice.id}>
							<TableCell component="th" scope="row">
								{invoice.number}
							</TableCell>
							<TableCell align="right">{invoice.status}</TableCell>
							<TableCell align="right">{new Date(invoice.dueDate).toLocaleString()}</TableCell>
							<TableCell align="right">${invoice.amount}</TableCell>
							<TableCell align="right">
								<Button
									variant="contained"
									color="primary"
									size="small"
									className={classes.button}
									startIcon={<ReceiptIcon/>}
									target="_blank"
									href={invoice.invoicePdf}
								>
									View
								</Button>
								<Button
									variant="contained"
									color="primary"
									size="small"
									className={classes.button}
									startIcon={<ReceiptIcon/>}
									onClick={() => setIsPayDialogOpen(true)}
								>
									Pay
								</Button>
							</TableCell>
						<PayDialog invoice={invoice} cards={props.cards} isPayDialogOpen={isPayDialogOpen} handlePayDialogClose={handlePayDialogClose} handlePayInvoice={handlePayInvoice} />
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}