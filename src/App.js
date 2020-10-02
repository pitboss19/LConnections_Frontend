// REACT IMPORTS
import React, {useState, useEffect} from "react"
import { Switch, Route, Redirect } from "react-router-dom"

// STRIPE IMPORTS
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// MATERIAL UI IMPORTS
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

// MATERIAL PICKERS IMPORTS
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// COMPONENT IMPORTS
import Home from "./components/Home"
import Header from "./components/Header"
import AuthModal from "./components/AuthModal"
import Profile from "./components/Profile"
import Footer from "./components/Footer"
import NavDrawer from "./components/NavDrawer"
import Services from "./components/Services"
import NotFound from "./components/NotFound"

const stripePromise = loadStripe('pk_test_51HVJxiD2h7qCY2j9FBsadSlhlKvMicTy09NcvzCJsBSJGs0CEbBkHdZretydnQqHUkADMEcfAf5HcMBA39Kh80na00jgRlB0gE');

const useStyles = makeStyles((theme) => ({
	header: {
		paddingBottom: "3px",
		background: "#0f2443",
	},
	mainContent: {
		minHeight: "80vh"
	}
}));

const App = () => {
	const classes = useStyles()
	const [clickedButton, setClickedButton] = useState("")
	const [authShown, setAuthShown] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		console.log(authShown)
	}, [authShown])

	const handleOpen = () => {
		setAuthShown(true);
	};

	const handleClose = () => {
		setAuthShown(false);
	};

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Elements stripe={stripePromise}>
				<Grid container>
					<Grid item xs={12} className={classes.header}>
						<Header handleOpen={handleOpen} setClickedButton={setClickedButton} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
					</Grid>
					<Grid item xs={12} className={classes.mainContent}>
						<NavDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
						<Switch>
							<Route exact path="/" render={(props) => <Home {...props} handleOpen={handleOpen} setClickedButton={setClickedButton}/>} />
							<Route path="/profile" component={Profile} />
							<Route path="/services" component={Services} />
							<Route path="*" component={NotFound} />
						</Switch>
						<AuthModal open={authShown} clickedButton={clickedButton} setClickedButton={setClickedButton} handleOpen={handleOpen} handleClose={handleClose} />
					</Grid>
				</Grid>
			</Elements>
		</MuiPickersUtilsProvider>
	)
}

export default App
