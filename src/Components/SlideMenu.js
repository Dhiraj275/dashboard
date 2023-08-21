import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import SellIcon from '@mui/icons-material/Sell';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Box, Button, Divider, Drawer, ListItem } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDataLayerValue } from '../DataLayer/DataLayer';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import Submenu from './SlideBar/SubMenu';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import './component.css';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const items = [
    {
        href: '/',
        icon: (<ChartBarIcon />),
        title: 'Dashboard'
    },

    {
        href: '/orders',
        icon: (<SellIcon />),
        title: 'Orders'
    },
    {
        href: '/to-do',
        icon: (<PlaylistAddCheckIcon />),
        title: 'To Do'
    },
    {
        href: '/mails',
        icon: (<AttachEmailIcon />),
        title: 'Contact Mails'
    },
];
const productSubItems = [
    {
        href: "/products/all",
        name: "All Products",
    },
    {
        href: "/products/categories",
        name: "Categories",
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
                    <Submenu list={productSubItems} icon={<ShoppingBagIcon />} name="Products" />
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
