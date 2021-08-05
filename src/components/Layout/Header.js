// import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import classes from './Header.module.css';
import {authActions} from "../../store/auth-slice";

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutTimer = useSelector(state => state.auth.logoutTimer);

    const logoutHandler = (event) => {
        event.preventDefault();
        dispatch(authActions.setToken(null));
        dispatch(authActions.setIsLoginState(false));
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        clearTimeout(logoutTimer);
        history.push('/');
    };

    return(
        <div className={classes.Header}>
            <div className={classes.HeaderText}>
                <h1>NextPal</h1>
                <h3>Make pals around the world!</h3>
            </div>
            <nav>
                <ul className={classes.LogoutListElement}>
                    <li>
                        <Button
                            className={classes.LogoutButton}
                            variant="link"
                            type="submit"
                            onClick={logoutHandler}
                        >
                            Log Out
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
