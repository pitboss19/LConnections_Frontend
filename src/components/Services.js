import React from "react"

// MATERIAL UI IMPORTS
import {Button, Grid, Hidden} from "@material-ui/core"
import {ShoppingBasket, Textsms, Loyalty} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"

// COMPONENTS IMPORTS
import HomeCarousel from "./HomeCarousel"
import MobileCarousel from "./MobileCarousel"
import ReviewCard from "./ReviewCard"
import Divider from "@material-ui/core/Divider"

const useStyles = makeStyles({
	content: {
		padding: "5vh 5vh",
	},
	authButton: {
		backgroundColor: "rgb(119, 24, 24)",
		color: "white",
		borderRadius: "0"
	}
})

const Home = props => {
	const classes = useStyles()

	return (
		<div className={classes.content}>
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Grid item xs={12} align="center">
							<MobileCarousel />
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<h1>Services</h1>
							<Divider />
						</Grid>
						<Grid item xs={12} sm={6} align="center">
							<div>
								<Loyalty/>
								<h5>Cleaning</h5>
								<p>We offer a variety of cleaning services for both residential and commercial</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} align="center">
							<div>
								<Textsms/>
								<h5>Garbage / Large Hauloff</h5>
								<p>Got a large of garbage? Just finished a home remodel? Call us and we will come and haul it all off.</p>
							</div>
						</Grid>
						<Grid item xs={12} align="center">
							<Divider />
						</Grid>
						<Grid item xs={12} sm={6} align="center">
							<div>
								<ShoppingBasket/>
								<h5>Packing / Unpacking</h5>
								<p>We come in and handle all the leg work, just kick back and grab a drink.</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} align="center">
							<div>
								<ShoppingBasket/>
								<h5>Grocery Service (Members Only)</h5>
								<p>Preparing for a party? We can do the shopping for you, and have it all put away while you focus on
									planning.</p>
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12} align="center">
							<Divider />
							<h3>Testimonials</h3>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<ReviewCard />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<ReviewCard />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<ReviewCard />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Home