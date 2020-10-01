import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {
	Paper,
	Button,
} from '@material-ui/core'

import "../style/MobileCarousel.scss"

function Project(props)
{
	return (
		<Paper
			className="Project"
			style={{
				backgroundColor: props.item.color,
			}}
			elevation={10}
		>
			<h2>{props.item.name}</h2>
			<p>{props.item.description}</p>

			<Button className="CheckButton">
				Check it out!
			</Button>
		</Paper>
	)
}

const items = [
	{
		name: "Cleaning Services",
		description: "Routine Cleaning, Deep Cleaning, Post Construction Cleaning",
		color: "#771818"
	},
	{
		name: "Garbage / Haul-Off",
		description: "We will come in and haul-off all that junk for you",
		color: "#771818"
	},
	{
		name: "Packing / Unpacking",
		description: "We can customize a packing solution to best meet your needs.",
		color: "#771818"
	}
]

class MobileCarousel extends React.Component
{
	constructor(props)
	{
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

	render()
	{
		return (
			<div>
				<Carousel
					className="SecondExample"
					autoPlay={this.state.autoPlay}
					timer={this.state.timer}
					animation={this.state.animation}
					indicators={this.state.indicators}
					timeout={this.state.timeout}
					navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
					navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}

				>
					{
						items.map( (item, index) => {
							return <Project item={item} key={index}/>
						})
					}
				</Carousel>
			</div>
		)
	}
}

export default MobileCarousel