import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
});

const ReviewCard = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					John Doe
				</Typography>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					2 Months ago
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					<Rating name="read-only" value={5} readOnly />
				</Typography>
				<Typography variant="body2" component="p">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default ReviewCard