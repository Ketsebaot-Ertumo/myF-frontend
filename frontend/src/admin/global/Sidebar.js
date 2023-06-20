import React, { useEffect } from "react";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import Person3Icon from '@mui/icons-material/Person3';
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import {userLogoutAction, userProfileAction} from '../../redux/actions/userAction';
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';



const SidebarAdm = () => {
    const {userInfo} = useSelector(state => state.signIn);
    const dispatch = useDispatch();
    const navigate= useNavigate();

    useEffect(() => {
        dispatch(userProfileAction());
    }, []);

    //log out
    const logOut = () => {
        dispatch(userLogoutAction());
        window.location.reload(true);
        setTimeout(() => {
            navigate('/');
        }, 500)
    }

    return(
        <>
            <Sidebar backgroundColor="white" style={{boarderRightStyle: "none"}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height:'40px'}}>
                    <Box sx={{pt:4}}>
                        <Menu 
                            menuItemStyles={{
                                button: {
                                    [`&.${menuClasses.button}`]: {
                                        color: "e000",
                                    },
                                    [`&.${menuClasses.disabled}`]: {
                                        color: "green",
                                    },
                                    '&:hover': {
                                        backgroundColor: "afafafa",
                                        color: "e1976d2",
                                    },
                                },
                                icon: {
                                    [`&.${menuClasses.icon}`]: {
                                        color: "e1976d2",
                                    }
                                },
                            }}>
                                {
                                    userInfo && userInfo.role === 'admin' ?
                                    <>
                                        <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon /> }>Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/admin/post/create" />} icon={<PostAddIcon />}>Create Post</MenuItem>
                                    </>:
                                    <>
                                    <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}>Dashboard</MenuItem>
                                    </>
                            }

                        </Menu>
                    </Box>
                            <Box sx={{pb:2}}>
                                <Menu
                                    menuItemStyles={{
                                        button:{
                                            [`&.${menuClasses.button}`]:{
                                                color: 'e000',
                                            },
                                            '&:hover': {
                                                background: 'afafafa',
                                                color: "e1976d2",
                                            },
                                        },
                                        icon:{
                                            [`&.${menuClasses.icon}`]:{
                                                color: 'e1976d2',
                                            }
                                        },
                                    }}>
                                        <MenuItem onClick={logOut} icon={<LoginIcon />}>Log out</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                </Sidebar>
            </>
    )
}

export default SidebarAdm