import React, {useState} from "react"

import {Grid, Box, Typography, Tabs, Tab, AppBar, Toolbar} from "@material-ui/core"
import {Help} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"

const lightColor = 'rgba(255, 255, 255, 0.7)';

const useStyles = makeStyles((theme) => ({
	secondaryBar: {
		zIndex: 0,
	},
	menuButton: {
		marginLeft: -theme.spacing(1),
	},
	iconButtonAvatar: {
		padding: 4,
	},
	link: {
		textDecoration: 'none',
		color: lightColor,
		'&:hover': {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
	},
}))

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

queryUserCleanings = gql`
    query user($id: ID!) {
        user(id: $id) {
            id: ID!
            firstName: String!
            lastName: String!
            phoneNumber: String!
            email: String!
            password: String!
            birthday: Date!
            stripeId: ID
            isNotified: Boolean!
            isEmployee: Boolean!
            inactive: Boolean!
            cleanings: [Cleaning!]!
            invoices: [Invoice!]!
            cards: [cardPaymentMethod!]!
            banks: [bankPaymentMethod!]!
        }
    }
`

const Profile = () => {
	const [cleanings, setCleanings] = useState([])
	const [tab, setTab] = useState(0)
	const classes = useStyles()

	return (
		<div className={classes.content}>
			<Grid
				container
				direction="row"
			>
				<Grid item xs={12}>
					<AppBar
						component="div"
						className={classes.secondaryBar}
						color="primary"
						position="static"
						elevation={0}
					>
						<Toolbar>
							<Grid container alignItems="center">
								<Grid item>
									<Tabs value={tab} textColor="inherit">
										<Tab textColor="inherit" label="Cleanings" onClick={() => setTab(0)} />
										<Tab textColor="inherit" label="Invoices" onClick={() => setTab(1)} />
										<Tab textColor="inherit" label="Payments" onClick={() => setTab(2)} />
										<Tab textColor="inherit" label="Billing" onClick={() => setTab(3)} />
									</Tabs>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item xs={12}>
					<TabPanel value={tab} index={0}>
						Cleanings
					</TabPanel>
					<TabPanel value={tab} index={1}>
						Invoices
					</TabPanel>
					<TabPanel value={tab} index={2}>
						Payments
					</TabPanel>
					<TabPanel value={tab} index={3}>
						Billing
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	)
}

export default Profile