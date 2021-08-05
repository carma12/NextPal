import PreAuth from "../components/Auth/PreAuth";

import classes from './StartingPage.module.css';
import startingPageImg from '../assets/images/joel-muniz-0QuIgOjLLXc-unsplash.jpg';

const StartingPage = () => {
    return (
        <div className={classes.StartingPage}>
            <div className={classes.ImageContainer}>
                <img src={startingPageImg} alt="a group of girlfriends"/>
            </div>
            <PreAuth />
        </div>
    );
}

export default StartingPage;
