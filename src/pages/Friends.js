import {Fragment} from "react";
import {Spinner} from 'react-bootstrap';
import {useSelector} from "react-redux";

import classes from './Friends.module.css';
import Friend from '../components/Friends/Friend';
import Header from "../components/Layout/Header";

const Friends = () => {
        // TODO: Retrieve specific friends of that specific user. Store friends in DB.
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
        const spinner = (!isMyFriendsListReady) && <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
        />;

        return (
            <Fragment>
                <Header/>
                {spinner}
                {usersList}
            </Fragment>
        );
    }
;

export default Friends;
