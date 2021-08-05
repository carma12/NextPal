import {Form, Button, ButtonGroup} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useForm} from "react-hook-form";

import classes from './AuthForm.module.css';
import {logIn, signUp} from "../store/auth-actions";
import {useHistory} from "react-router-dom";


// TODO: When user logs in, retrieve its user data from Firebase DB
// TODO: When user registers the first time, ask for extra data (username, name)

const AuthForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // const errorStatus = useSelector(state => state.auth.error);

    const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [logInMode, setLogInMode] = useState(true);

    const {register, handleSubmit, /*watch,*/ formState: {errors}} = useForm();

    // console.log(watch()); // watch input value by passing the name of it

    const logInUser = (data) => {
        const userData = {
            email: data.email,
            password: data.password
        };

        dispatch(logIn(userData));
    }

    const registerUser = (data) => {
        const userData = {
            email: data.email,
            password: data.password
        };

        dispatch(signUp(userData));
        history.push('/login');
    }

    const switchAuthModeHandler = () => {
        setLogInMode((prevState) => !prevState);
    }


    return (
        <section className={classes.AuthForm}>
            <h1>{logInMode ? 'Sign in to NextPal' : 'Sign up to NextPal'}</h1>
            <Form className={classes.MainForm} onSubmit={handleSubmit(logInMode ? logInUser : registerUser)}>
                <Form.Control
                    className={classes.Input}
                    type="email"
                    placeholder="name@example.com"
                    id="email"
                    name="email"
                    {...register('email', {
                            required: 'Email is required',
                            maxLength: 45,
                            pattern: {
                                value: emailRe,
                                message: 'Enter a valid email'
                            }
                        }
                    )}
                />
                {errors.email && <div className={classes.Error}>{errors.email.message}</div>}

                <Form.Control
                    className={classes.Input}
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters'
                        }
                    })}
                />
                {errors.password && <div className={classes.Error}>{errors.password.message}</div>}

                <ButtonGroup vertical>
                    <Button
                        className={classes.LogButton}
                        variant="primary"
                        type="submit"
                    >
                        {logInMode ? 'Log In' : 'Sign up'}
                    </Button>
                    <Button
                        className={classes.SwitchMode}
                        variant="link"
                        onClick={switchAuthModeHandler}
                    >
                        {logInMode ? 'Create new account' : 'Login with existing account'}
                    </Button>
                </ButtonGroup>
                <div className={classes.TestCredentials}>
                    <p>Test me</p>
                    <p>Try to register yourself!</p>
                </div>

            </Form>
        </section>
    );
};

export default AuthForm;
