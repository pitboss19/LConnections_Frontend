import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	footer: {
		backgroundColor: "grey",
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 1}px`,
	}
});

function Footer(props) {
	const { classes } = props;

	return (
		<footer className={classes.footer}>
			<Typography variant="h5" component="h3">
				Local Connections
			</Typography>
			<Typography component="p">
				@2020 All rights reserved
			</Typography>
		</footer>
	);
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);