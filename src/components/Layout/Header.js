import classes from './Header.module.css';

const Header = () => {
    return(
        <div className={classes.Header}>
            <h1>NextPal</h1>
            <h3>Make pals around the world!</h3>
        </div>
    );
};

export default Header;
