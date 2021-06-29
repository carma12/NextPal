import {useSelector} from "react-redux";

import classes from './Friends.module.css';
import Friend from './Friend';

const Friends = () => {
    const allUsers = useSelector(state => state.friends.users);
    // TODO: When retrieve users, check them with myFriends and disabled button when they're on list
    // const myFriends = useSelector(state => state.friends.myFriends);
    // const potentialFriends = allUsers.filter(userId => myFriends.map(friend => friend.id !== userId));
    // console.log(myFriends);
    // console.log(potentialFriends);

    return (
        <div className={classes.Friends}>
            {allUsers.map(user => (
                <Friend
                    key={user.id}
                    id={user.id}
                    first={user.first_name}
                    last={user.last_name}
                    email={user.email}
                    avatar={user.avatar}
                />
            ))}
        </div>
    );
};

export default Friends;
