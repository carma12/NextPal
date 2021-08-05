import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

import classes from './PreAuth.module.css';

const PreAuth = () => {
    const history = useHistory();

    const toLogInButtonHandler = (event) => {
        event.preventDefault();
        history.push('/login');
    };

    return (
        <div className={classes.PreAuth}>
            <h1>Check out what is going up</h1>
            <h3>Join to NextPal</h3>
            <Button
                className={classes.LogInButton}
                variant="primary"
                onClick={toLogInButtonHandler}
            >
                Log In
            </Button>
        </div>
    );
};

export default PreAuth;
