import React, {useState, useEffect} from "react";
import {Avatar, Container, Paper, Grid, Typography, Button} from "@material-ui/core";
import useStyles from "./styles.js";
import LockOutLinedIcon from "@material-ui/icons/LockOutlined";
import {GoogleLogin} from "react-google-login";
import { gapi } from 'gapi-script';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signup, signin} from "../../../actions/auth.js";
import Input from "./Input.js";
import Icon from "./Icon.js";

export const Auth = ()=>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleShowPassword = ()=> setShowPassword(!showPassword);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            console.log(formData);
            dispatch(signup({formData}));
        }
        else{
            dispatch(signin({formData}));
        }
    };
    
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () =>{
        setisSignup(!isSignup);
        setShowPassword(false);
    }

    useEffect(() => {
        function start() {
        gapi.client.init({
        clientId:"943893538932-f8f79ne6u72h8sqpd8q7i0o9sb96rpqr.apps.googleusercontent.com",
        scope: 'email',
          });
           }
        gapi.load('client:auth2', start);
           }, []);
        const googleSuccess = async(res) =>{
            const result = res?.profileObj;
            const token = res?.tokenId;
            try{
                dispatch({type: 'AUTH', data: {result, token}});
                navigate('/');
            }catch(error){
                console.log(error);
            }
        }
        const googleError = (res) => {
            console.log('FAILED', res);
        }

    return(
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}><LockOutLinedIcon /></Avatar>
                <Typography variant="h5">{isSignup? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>{
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }

                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin clientId="943893538932-f8f79ne6u72h8sqpd8q7i0o9sb96rpqr.apps.googleusercontent.com"
                    render={(renderProps) => (
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                    </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                            { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}