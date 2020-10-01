import React from "react"

// MATERIAL UI IMPORTS
import {Grid, Hidden} from "@material-ui/core"
import {ShoppingBasket, Textsms, Loyalty} from "@material-ui/icons"
import {makeStyles} from "@material-ui/core/styles"

// COMPONENTS IMPORTS
import HomeCarousel from "./HomeCarousel"
import MobileCarousel from "./MobileCarousel"
import ReviewCard from "./ReviewCard"

const useStyles = makeStyles({
	content: {
		padding: "5vh 5vh",
	},
})

const Home = props => {
	const classes = useStyles()

	return (
		<div className={classes.content}>
			<Grid container spacing={4}>
				<Grid item xs={12} align="center">
					<Hidden only={['xs', 'sm']}>
						<HomeCarousel />
					</Hidden>
					<Hidden only={["md", "lg", "xl"]}>
						<MobileCarousel />
					</Hidden>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} xl={3}>
							<div>
								<Loyalty/>
								<h5>Membership</h5>
								<p>Members receive 10% off all LC services and receive access to exclusive services.</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} xl={3}>
							<div>
								<Textsms/>
								<h5>Text Reminders</h5>
								<p>When you book a cleaning, we will send you up to date alerts on upcoming cleanings.</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} xl={3}>
							<div>
								<ShoppingBasket/>
								<h5>Online Billing</h5>
								<p>We provide you with organized, digital receipts of all your invoices with us. Keep track of all your
									invoices right through our customer panel!</p>
							</div>
						</Grid>
						<Grid item xs={12} sm={6} xl={3}>
							<div>
								<ShoppingBasket/>
								<h5>Grocery Service</h5>
								<p>Preparing for a party? We can do the shopping for you, and have it all put away while you focus on
									planning.</p>
							</div>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item xs={12} align="center">
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