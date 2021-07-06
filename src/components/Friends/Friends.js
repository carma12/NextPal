import React from "react";
import {useSelector} from "react-redux";

import classes from './Friends.module.css';
import Friend from './Friend';

const Friends = () => {
        const allUsers = useSelector(state => state.friends.users);
        const myFriends = useSelector(state => state.friends.myFriends);
        const isMyFriendsListReady = useSelector(state => state.friends.friendsFromDBReady);

        const isFriend = (userId) => {
            for (const friend of myFriends) {
                if (friend.id === userId) {
                    return true
                }
            }
            return false;
        };

        const usersList = (isMyFriendsListReady) && (
            <div className={classes.Friends}>
                {allUsers.map(user => (
                    <Friend
                        key={user.id}
                        id={user.id}
                        first={user.first}
                        last={user.last}
                        email={user.email}
                        avatar={user.avatar}
                        isFriend={isFriend(user.id)}
                    />
                ))}
            </div>
        );
        const spinner = (!isMyFriendsListReady) && <div className="lds-hourglass"/>;

        return (
            <React.Fragment>
                {spinner}
                {usersList}
            </React.Fragment>
        );
    }
;

export default Friends;
