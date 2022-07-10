import React, {useEffect, useState} from "react";
import {Typography, AppBar, Toolbar, Avatar, Button} from "@material-ui/core";
import {Link, useNavigate, useLocation} from "react-router-dom";
import useStyles from "./styles.js";
import memories from '../../images/memories.png';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

export const Navbar = ()=>{
    const classes=useStyles();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();

    const[user, setUser] =useState(JSON.parse(localStorage.getItem('profile')));
    
    const logout = () => {
        dispatch({type:'LOGOUT'});
        navigate('/');
        setUser(null);
    }
      
    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

   

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Moments</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.result?.imageUrl} alt={user.resul?.name}>{user.result?.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result?.name}</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )
            }
            </Toolbar>
        </AppBar>
    )
}

