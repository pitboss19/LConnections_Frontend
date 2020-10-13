import React from "react"
import clsx from "clsx"
import { Link } from "react-router-dom"
import {AppBar, Toolbar, IconButton, Typography, Button, Avatar, MenuItem, Menu, Hidden} from "@material-ui/core"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import RoomServiceIcon from "@material-ui/icons/MoveToInbox"
import LoyaltyIcon from "@material-ui/icons/Mail"
import {makeStyles, useTheme} from "@material-ui/core/styles"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "white",
		flexGrow: 1,
	},
	icon: {
		"& img": {
			height: "5vh"
		},
		marginRight: theme.spacing(2),
	},
	title: {
		fontWeight: "bold",
		color: "#444444",
		flexGrow: 1,
	},
	navButton: {
		fontWeight: "bold",
		color: "#444444"
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}))

const NavDrawer = props => {
	const classes = useStyles()
	const theme = useTheme()

	const handleDrawerClose = () => {
		props.setDrawerOpen(false);
	};

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={props.drawerOpen}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "ltr" ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
				</IconButton>
			</div>
			<Divider/>
			<List>
				<ListItem button key="Home" component={Link} to={{pathname: "/"}}>
					<ListItemText primary="Home"/>
				</ListItem>
				<ListItem button key="Services" component={Link} to={{pathname: "/services"}}>
					<ListItemText primary="Services"/>
				</ListItem>
			</List>
		</Drawer>
	)
}

export default NavDrawer