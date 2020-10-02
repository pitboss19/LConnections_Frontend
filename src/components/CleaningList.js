import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function BasicTable(props) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell align="right">Address</TableCell>
						<TableCell align="right">Type</TableCell>
						<TableCell align="right">Square Footage</TableCell>
						<TableCell align="right">Paid</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.cleanings.map((cleaning) => (
						<TableRow key={cleaning.id}>
							<TableCell component="th" scope="row">
								{new Date(cleaning.date).toLocaleString()}
							</TableCell>
							<TableCell align="right">{cleaning.address}</TableCell>
							<TableCell align="right">{cleaning.type}</TableCell>
							<TableCell align="right">{cleaning.squareFootage}</TableCell>
							<TableCell align="right">{cleaning.depositPaid ? "Paid" : "Unpaid"}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}