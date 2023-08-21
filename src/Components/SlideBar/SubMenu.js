import { Box, Button, Collapse, List, ListItemText } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../component.css';
// import { Logo } from './logo';
// import { NavItem } from './nav-item';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDataLayerValue } from '../../DataLayer/DataLayer';
const SubLink = ({ item, index }) => {
    const history = useHistory();
    const [{ drawer }, dispatch] = useDataLayerValue()
    const active = window.location.pathname.includes(item.href);

    const { name, href } = item
    const handleClick = () => {
        history.push(`${href}`)
        dispatch({ type: "SET_DRAWER", data: false })
    }
    return (

        <Button
            onClick={handleClick}
            sx={{
                borderRadius: 1,
                color: active ? 'secondary.main' : 'neutral.300',
                fontWeight: active && 'fontWeightBold',
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                mb: 0.2,
                width: '100%',
                '& .MuiButton-startIcon': {
                    color: active ? 'secondary.main' : 'neutral.400'
                },
                '&:hover': {
                    backgroundColor: 'rgba(255,255,255, 0.08)'
                }
            }}
        >

            <Box sx={{ flexGrow: 1 }}>
                {name}
            </Box>
        </Button>

    )
}
const Submenu = (props) => {
    const [listOpen, setListOpen] = React.useState(false);
    const handleClick = () => {
        if (!listOpen || !active) { setListOpen(!listOpen); }
    };
    const active = window.location.pathname.includes(props.name.toLowerCase());
    const subList = props.list
    return (
        <List
            disableGutters
            sx={{
                mb: 0.5,
                py: 0,

            }}
        >
            <Button
                onClick={handleClick}
                startIcon={props.icon}

                sx={{
                    backgroundColor: active && 'rgba(255,255,255, 0.08)',
                    borderRadius: 1,
                    my: 0.4,
                    color: active ? 'secondary.main' : 'neutral.300',
                    fontWeight: active && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                        color: active ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255, 0.08)'
                    }
                }}
            >

                <Box sx={{ flexGrow: 1 }}>
                    {props.name}
                </Box>
                {listOpen ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={listOpen || active} timeout="auto" unmountOnExit>
                <List
                    // disableGutters
                    sx={{
                        // display: 'flex',
                        mb: 0.5,
                        py: 0,
                    }}
                >
                    {
                        subList.map((item, index) => {
                            return (
                                <SubLink item={item} key={index} index={index} />
                            )
                        })
                    }
                </List>
            </Collapse>
        </List>

    )
}
export default Submenu