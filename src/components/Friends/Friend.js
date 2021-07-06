import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import classes from './Friend.module.css';
import Button from 'react-bootstrap/Button';
import {friendsActions} from "../../store/friends-slice";

const Friend = (props) => {
    const dispatch = useDispatch();
    const [buttonDisabled, setButtonDisabled] = useState('');
    const [buttonTitle, setButtonTitle] = useState('Add Pal');
    const [emailShown, setEmailShown] = useState('');

    useEffect(() => {
        if (props.isFriend) {
            console.log(props.first + ' ' + props.last + ' is friend!');
            setButtonDisabled('disabled');
            setButtonTitle('Is your Pal');
            setEmailShown(props.email);
        }
    }, []);

    const addFriend = () => {
        dispatch(friendsActions.addNewFriend({
            id: props.id,
            first: props.first,
            last: props.last,
            email: props.email,
            avatar: props.avatar,
            isFriend: props.isFriend
        }));
        setButtonDisabled('disabled');
        setButtonTitle('Is your Pal');
        setEmailShown(props.email);
    };

    return (
        <div className={classes.Friend}>
            <img src={props.avatar} alt="A potential friend to add in your friend's list"/>
            <p>{props.first} {props.last}</p>
            <p><i>{emailShown}</i></p>
            <Button className={classes.Button} variant="primary" onClick={addFriend}
                    disabled={buttonDisabled}>{buttonTitle}</Button>
        </div>
    );
};

export default Friend;
