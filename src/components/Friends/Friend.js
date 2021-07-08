import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import classes from './Friend.module.css';
import Button from 'react-bootstrap/Button';
import {friendsActions} from "../../store/friends-slice";

const Friend = (props) => {
    const dispatch = useDispatch();
    const [buttonTitle, setButtonTitle] = useState('Add Pal');
    const [emailShown, setEmailShown] = useState('');

    useEffect(() => {
        if (props.isFriend) {
            setButtonTitle('Delete Pal');
            setEmailShown(props.email);
        }
    }, [props.isFriend, props.email]);

    const addFriend = () => {
        dispatch(friendsActions.addNewFriend({
            id: props.id,
            first: props.first,
            last: props.last,
            email: props.email,
            avatar: props.avatar,
            isFriend: props.isFriend
        }));
        setButtonTitle('Delete Pal');
        setEmailShown(props.email);
    };

    const removeFriend = () => {
        dispatch(friendsActions.deleteFriend({
            friendId: props.id
        }));
        setButtonTitle('Add Pal');
        setEmailShown('');
    };

    return <div className={classes.Friend}>
        <img src={props.avatar} alt="A potential friend to add in your friend's list"/>
        <p>{props.first} {props.last}</p>
        <p><i>{emailShown}</i></p>
        <Button
            className={!props.isFriend ? classes.Button : classes.ButtonRemove}
            variant={!props.isFriend ? "primary" : "danger"}
            onClick={!props.isFriend ? addFriend : removeFriend}
        >{buttonTitle}</Button>
    </div>;
};

export default Friend;
