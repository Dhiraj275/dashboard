import { Box, Button, Divider, Drawer, ListItem } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import './component.css';
import Submenu from './SlideBar/SubMenu';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PropTypes from 'prop-types';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
const items = [
    {
        href: '/',
        icon: (<ChartBarIcon />),
        title: 'Dashboard'
    },

    {
        href: '/review-videos',
        icon: (<VideocamIcon />),
        title: 'Submitted Content'
    },
    {
        href: '/feature-videos',
        icon: (<FeaturedVideoIcon />),
        title: 'Featured Videos'
    },
    {
        href: '/mails',
        icon: (<AttachEmailIcon />),
        title: 'Contact Mails'
    },
];
const productSubItems = [
    {
        href: "/videos/all",
        name: "All Vidoes",
    },
    {
        href: "/videos/categories",
        name: "Categories",
    },
]
const usersSubItems = [
    {
        href: "/users/all",
        name: "All Users",
    },
    {
        href: "/users/farmers",
        name: "Farmers",
    },
    {
        href: "/users/corporates",
        name: "Corporates",
    },
]

const NavItem = (props) => {
    const { href, icon, title, ...others } = props;
    const history = useHistory();
    const [{ drawer }, dispatch] = useDataLayerValue()
    const active = href ? (window.location.pathname === href) : false;
    const handleClick = () => {
        history.push(`${href}`)
        dispatch({ type: "SET_DRAWER", data: false })
    }
    return (
        <ListItem
            disableGutters
            sx={{
                display: 'flex',
                mb: 0.5,
                py: 0,
                // px: 2
            }}
            {...others}
        >

            <Button
                component="a"
                startIcon={icon}
                // disableRipple
                onClick={handleClick}
                fullWidth
                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    // px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: active ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)',
                        color: active ? 'secondary.main' : 'neutral.300',
                    }
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {title}
                </Box>
            </Button>

        </ListItem>
    );
};

NavItem.propTypes = {
    href: PropTypes.string,
    icon: PropTypes.node,
    title: PropTypes.string
};

function SlideMenu() {
    const [{ drawer }, dispatch] = useDataLayerValue()

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    px: 3
                }}
            >
                {/* <div>
                    <Box sx={{ p: 3 }}>
                        <Link
                            to="/"
                        // passHref
                        >
                            <a>
                                {/* <Logo
                                    sx={{
                                        height: 42,
                                        width: 42
                                    }}
                                /> 
                            </a>
                        </Link>
                    </Box>

                </div> */}
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                    <Submenu list={productSubItems} icon={<VideoLibraryIcon />} name="Videos" />
                    {/* <Submenu list={usersSubItems} icon={<UsersIcon />} name="Users" /> */}
                </Box>

            </Box>
        </>
    );
    return (
        <div className="slide-menu">
            <Drawer
                variant={window.innerWidth > 600 ? "permanent" : "temporary"}
                anchor="left"
                onClose={() => {
                    dispatch({
                        type: 'SET_DRAWER',
                        data: false
                    })
                }}
                open={drawer}
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        color: '#FFFFFF',
                        width: 280,
                        borderRightColor: "rgb(45, 55, 72)"
                    }
                }}
                // sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
            >
                {content}
            </Drawer>
        </div>
    )
}

export default SlideMenu
