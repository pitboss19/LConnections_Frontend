import React from 'react';
import Carousel from "react-material-ui-carousel"
import autoBind from "auto-bind"
import { Link } from 'react-router-dom'
import '../style/HomeCarousel.scss';

import {
	Card,
	CardContent,
	CardMedia,
	Typography,
	Grid,
	Button,
} from '@material-ui/core';

function Banner(props) {
	if (props.newProp) console.log(props.newProp)
	const contentPosition = props.contentPosition ? props.contentPosition : "left"
	const totalItems = props.length ? props.length : 3;
	const mediaLength = totalItems - 1;

	let items = [];
	const content = (
		<Grid item xs={12 / totalItems} key="content">
			<CardContent className="Content">
				<Typography className="Title">
					{props.item.Name}
				</Typography>

				<Typography className="Caption">
					{props.item.Caption}
				</Typography>

				<Button component={Link} to={props.item.redirect} variant="outlined" className="ViewButton">
					View Now
				</Button>
			</CardContent>
		</Grid>
	)


	for (let i = 0; i < mediaLength; i++) {
		const item = props.item.Items[i];

		const media = (
			<Grid item xs={12 / totalItems} key={item.Name}>
				<CardMedia
					className="Media"
					image={item.Image}
					title={item.Name}
				>
					<Typography className="MediaCaption">
						{item.Name}
					</Typography>
				</CardMedia>

			</Grid>
		)

		items.push(media);
	}

	if (contentPosition === "left") {
		items.unshift(content);
	} else if (contentPosition === "right") {
		items.push(content);
	} else if (contentPosition === "middle") {
		items.splice(items.length / 2, 0, content);
	}

	return (
		<Card raised className="Banner">
			<Grid container spacing={0} className="BannerGrid">
				{items}
			</Grid>
		</Card>
	)
}

const items = [
	{
		Name: "Cleaning Services",
		Caption: "Routine Cleaning, Deep Cleaning, Post Construction Cleaning",
		contentPosition: "left",
		redirect: "/services/cleaning",
		Items: [
			{
				Name: "Routine Cleaning",
				Image: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.0-9/120048974_117042363482823_1699706550847099108_o.jpg?_nc_cat=103&_nc_sid=8bfeb9&_nc_ohc=hetDfrvaxvwAX8QgrPD&_nc_ht=scontent-atl3-2.xx&oh=543ef5f51adcc556e905158dbf32d68a&oe=5F9BC631"
			},
			{
				Name: "Deep Cleaning",
				Image: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.0-9/119938059_117042463482813_2631915090387403250_o.jpg?_nc_cat=106&_nc_sid=8bfeb9&_nc_ohc=IZsMdQou8twAX9Xo1K6&_nc_ht=scontent-atl3-2.xx&oh=1235e5ea2f31132f72fa8ae1eda88385&oe=5F9913C6"
			}
		]
	},
	{
		Name: "Garbage / Haul-Off",
		Caption: "We will come in and haul-off all that junk for you",
		contentPosition: "middle",
		redirect: "/services/hauloff",
		Items: [
			{
				Name: "Garbage",
				Image: "https://i.pinimg.com/originals/49/3d/30/493d30d47af8a46bcdcf1dee292f9603.jpg"
			},
			{
				Name: "Large Haul-Off",
				Image: "https://static.wixstatic.com/media/65acdc_37a7f65212634252b20a7aa15fbafd1f~mv2_d_1600_1201_s_2.jpg/v1/fill/w_640,h_432,al_c,q_80,usm_0.66_1.00_0.01/65acdc_37a7f65212634252b20a7aa15fbafd1f~mv2_d_1600_1201_s_2.webp"
			}
		]
	},
	{
		Name: "Packing / Unpacking",
		Caption: "We can customize a packing solution to best meet your needs.",
		contentPosition: "right",
		redirect: "/services/packing",
		Items: [
			{
				Name: "Packing",
				Image: "https://s3-us-west-2.amazonaws.com/chriskeleher.com/wp-content/uploads/2018/08/16210113/iStock-818705122_resized.jpg"
			},
			{
				Name: "Unpacking",
				Image: "https://www.longislandmaids.com/wp-content/uploads/2018/02/Moving-House-672x372.jpg"
			}
		]
	}
]

class HomeCarousel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			autoPlay: true,
			timer: 500,
			animation: "fade",
			indicators: true,
			timeout: 500,
			navButtonsAlwaysVisible: false,
			navButtonsAlwaysInvisible: false
		}

		autoBind(this);
	}

	render() {
		return (
			<div>
				<Carousel
					className="Example"
					autoPlay={this.state.autoPlay}
					timer={this.state.timer}
					animation={this.state.animation}
					indicators={this.state.indicators}
					timeout={this.state.timeout}
					navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
					navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
				>
					{
						items.map((item, index) => {
							return <Banner item={item} key={index} contentPosition={item.contentPosition}/>
						})
					}
				</Carousel>
			</div>

		)
	}
}

export default HomeCarousel;