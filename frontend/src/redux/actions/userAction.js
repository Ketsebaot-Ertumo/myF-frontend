import { toast } from "react-toastify";
import { USER_LOAD_FAIL, USER_LOAD_REQUEST, USER_LOAD_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, 
    USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants"
import axios from 'axios';


//sign up action
export const userSignUpAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNUP_REQUEST});
    try{
        const {data} = await  axios.post('/api/signup', user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully");
    }catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//sign in action
export const userSignInAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const {data} = await  axios.post('/api/signin', user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Log In Successfully");
    }catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//user logout action
export const userLogoutAction = (user) => async(dispatch) =>{
    dispatch({type: USER_LOGOUT_REQUEST});
    try{
        const {data} = await  axios.get('/api/logout');
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log Out Successfully");
    }catch(error){
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//user profile action
export const userProfileAction =() => async(dispatch) =>{
    dispatch({type: USER_LOAD_REQUEST});
    try{
        const {data} = await  axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });
    }catch(error){
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}