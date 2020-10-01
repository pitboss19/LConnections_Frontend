// REACT IMPORTS
import React, {useState, useEffect} from "react"
import { Switch, Route, Redirect } from "react-router-dom"

// STRIPE IMPORTS
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// MATERIAL UI IMPORTS
import { Grid } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

// COMPONENT IMPORTS
import Home from "./components/Home"
import Header from "./components/Header"
import AuthModal from "./components/AuthModal"
import Profile from "./components/Profile"
import Footer from "./components/Footer"
import NavDrawer from "./components/NavDrawer"

const stripePromise = loadStripe('pk_test_51HVJxiD2h7qCY2j9FBsadSlhlKvMicTy09NcvzCJsBSJGs0CEbBkHdZretydnQqHUkADMEcfAf5HcMBA39Kh80na00jgRlB0gE');

const useStyles = makeStyles((theme) => ({
	header: {
		paddingBottom: "3px",
		background: "#0f2443",
	},
}));

const App = () => {
	const classes = useStyles()
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
		<Switch>
			<Elements stripe={stripePromise}>
				<Grid container>
					<Grid item xs={12} className={classes.header}>
						<Header handleOpen={handleOpen} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
					</Grid>
					<Grid item xs={12}>
						<NavDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
						<Route exact path="/" component={Home} />
						<Route path="/profile" component={Profile} />
						<AuthModal open={authShown} handleOpen={handleOpen} handleClose={handleClose} />
					</Grid>
					<Grid item xs={12}>
						<Footer />
					</Grid>
				</Grid>
			</Elements>
		</Switch>
	)
}

export default App
