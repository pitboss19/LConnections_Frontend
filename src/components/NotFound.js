import React from "react"
import {Link} from "react-router-dom"

// MATERIAL UI IMPORTS
import {Button, Grid, Divider} from "@material-ui/core"

const NotFound = props => {

	return (
		<div>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12} align="center">
							<Divider />
							<h1>Uh Oh... This is not a page.</h1>
							<Divider />
						</Grid>
						<Grid item xs={12} align="center">
							<Button variant="contained" component={Link} to={{pathname: "/"}}>Go Home Adam</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default NotFound