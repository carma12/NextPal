import {useState} from 'react';
import {useDispatch} from "react-redux";
import classes from './Friend.module.css';
import Button from 'react-bootstrap/Button';
import {friendsActions} from "../../store/friends-slice";

const Friend = (props) => {
    const dispatch = useDispatch();
    // const myFriends = useSelector(state => state.friends.myFriends);
    const [buttonDisabled, setButtonDisabled] = useState('');
    const [buttonTitle, setButtonTitle] = useState('Add Pal');


    const addFriend = () => {
        dispatch(friendsActions.addNewFriend({
            id: props.id,
            first: props.first,
            last: props.last,
            email: props.email,
            avatar: props.avatar
        }));
        setButtonDisabled('disabled');
        setButtonTitle('Is your Pal');
    };

    return(
        <div className={classes.Friend}>
            <img src={props.avatar} alt="A potential friend to add in your friend's list"/>
            <p>{props.first} {props.last}</p>
            <Button className={classes.Button} variant="primary" onClick={addFriend} disabled={buttonDisabled}>{buttonTitle}</Button>
        </div>
    );
};

export default Friend;
