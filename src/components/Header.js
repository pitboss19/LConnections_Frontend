import React from "react"
import {Link} from "react-router-dom"
import clsx from 'clsx'
import {AppBar, Toolbar, IconButton, Typography, Button, Avatar, MenuItem, Menu, Hidden} from "@material-ui/core"
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Cookie from "js-cookie"

const drawerWidth = 240;

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
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
}));

const Header = props => {
	const classes = useStyles()
	const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
	const profileOpen = Boolean(profileAnchorEl);

	const handleDrawerOpen = () => {
		props.setDrawerOpen(true);
	};

	const handleProfileMenu = (event) => {
		setProfileAnchorEl(event.currentTarget);
	};
	const handleProfileClose = () => {
		setProfileAnchorEl(null);
	};
	const handleLogout = () => {
		Cookie.remove("token")
		setProfileAnchorEl(null);
	}

	return (
		<>
			<AppBar position="static" className={classes.root}>
				<Toolbar>
					<Hidden only={["sm","md","lg","xl"]}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton, props.drawerOpen && classes.hide)}
						>
							<MenuIcon style={{color: "black"}}/>
						</IconButton>
					</Hidden>
					<IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" component={Link} to={{pathname: "/"}}>
						<img src="/images/Icon.png" alt="Local Connections Icon" />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Local Connections
					</Typography>
					<Hidden only={["xs"]}>
						<Button component={Link} to={{pathname: "/"}}>Home</Button>
						<Button component={Link} to={{pathname: "/services"}}>Services</Button>
					</Hidden>
					{Cookie.get("token") ? <div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleProfileMenu}
							color="inherit"
						>
							<Avatar>H</Avatar>
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={profileAnchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={profileOpen}
							onClose={handleProfileClose}
						>
							<MenuItem component={Link} to={{pathname: "/profile"}} onClick={() => setProfileAnchorEl(null)}>Profile</MenuItem>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</div> : <Button className={classes.navButton} color="inherit" onClick={() => {
						props.handleOpen()
						props.setClickedButton("Login")
					}}>Login</Button>}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Header