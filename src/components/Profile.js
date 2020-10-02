import React, {useState, useEffect} from "react"

import {gql, useQuery} from "@apollo/client"

import jwtDecode from "jwt-decode"

import {Grid, Box, Typography, Tabs, Tab, AppBar, Toolbar, Button} from "@material-ui/core"
import {AddCircle} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"
import {Redirect} from "react-router-dom"

import Cookie from "js-cookie"
import CleaningList from "./CleaningList"
import InvoiceList from "./InvoiceList"
import CardList from "./CardList"
import AuthModal from "./AuthModal"
import ProfileModal from "./ProfileModal"

const lightColor = "rgba(255, 255, 255, 0.7)"

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
		textDecoration: "none",
		color: lightColor,
		"&:hover": {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
		margin: `2vh 0`
	},
}))

function TabPanel(props) {
	const {children, value, index, ...other} = props

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
	)
}

const queryUser = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            phoneNumber
            email
            birthday
            stripeId
            isNotified
            isEmployee
		        blockedDates {
				        _id
				        count
		        }
            cleanings {
                id
                date
                address
		            type
                squareFootage
                depositPaid
            }
            invoices {
                id
		            stripeId
		            number
                cleaning {
                    id
                }
                dueDate
                amount
                invoicePdf
                status
            }
            cards {
                id
                address_line1
                address_line2
                address_city
                address_state
                address_zip
                brand
                cvc_check
                last4
                exp_month
                exp_year
                name
            }
            banks {
                id
                account_holder_name
                account_holder_type
                bank_name
                routing_number
                status
            }
        }
    }
`

const Profile = () => {
	const [userData, setUserData] = useState({
		cleanings: [],
		invoices: [],
		cards: [],
		banks: [],
	})
	const [tab, setTab] = useState(0)
	const [currentForm, setCurrentForm] = useState("Cleaning")
	const token = Cookie.get("token") || ""
	const classes = useStyles()
	let decoded = ""
	if (token) {
		decoded = jwtDecode(token)
	}
	const {
		data,
		loading,
		error,
		refetch
	} = useQuery(queryUser, {variables: {id: decoded._id}})

	const [modalShown, setModalShown] = useState(false);

	useEffect(() => {
		console.log(modalShown)
	}, [modalShown])

	const handleOpen = () => {
		setModalShown(true);
	};

	const handleClose = () => {
		setModalShown(false);
	};

	useEffect(() => {
		if (data) {
			setUserData(data.user)
			console.log(data.user)
		} else {
			console.log("Loading")
		}
	}, [data])

	return (
		<div className={classes.content}>
			{token === "" ? <Redirect to="/"/> : ""}
			<ProfileModal open={modalShown} handleOpen={handleOpen} handleClose={handleClose} refetch={refetch} user={decoded} profileForm={currentForm} bookedDays={userData.blockedDates} />
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
										<Tab textColor="inherit" label="Cleanings" onClick={() => {
											setTab(0)
											setCurrentForm("Cleaning")
										}}/>
										<Tab textColor="inherit" label="Invoices" onClick={() => {
											setTab(1)
											setCurrentForm("Invoice")
										}}/>
										{/*<Tab textColor="inherit" label="Payments" onClick={() => setTab(2)}/>*/}
										<Tab textColor="inherit" label="Billing" onClick={() => {
											setTab(2)
											setCurrentForm("Card")
										}}/>
									</Tabs>
								</Grid>
							</Grid>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item xs={12}>
					<TabPanel value={tab} index={0}>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<AddCircle/>}
							onClick={handleOpen}
						>
							Schedule Cleaning
						</Button>
						<CleaningList cleanings={userData.cleanings}/>
					</TabPanel>
					<TabPanel value={tab} index={1}>
						<InvoiceList invoices={userData.invoices} cards={userData.cards} refetch={refetch}/>
					</TabPanel>
					<TabPanel value={tab} index={3}>
						Payments
					</TabPanel>
					<TabPanel value={tab} index={2}>
						<CardList cards={userData.cards} userData={userData} refetch={refetch} />
					</TabPanel>
				</Grid>
			</Grid>
		</div>
	)
}

export default Profile