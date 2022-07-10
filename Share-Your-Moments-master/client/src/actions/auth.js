import {AUTH} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const signup = (formData)=> async(dispatch)=> {
    
    try{
        console.log(formData);
        const { data } = await api.signUp(formData);
        console.log(data);
        dispatch({ type:AUTH, data});
    }catch(error){
        console.log(error);
    }
}

export const signin = (formData)=> async(dispatch)=> {
    try{
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH, data});      
    }catch(error){
        console.log(error.response.data);
    }
}