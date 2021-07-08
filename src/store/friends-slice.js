import {createSlice} from "@reduxjs/toolkit";

const initialFriendsState = {
    users: [],
    myFriends: [],
    friendsFromDBReady: false
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialFriendsState,
    reducers: {
        setMyFriendsList(state, action) {
            state.myFriends = action.payload.myFriends;
            state.friendsFromDBReady = true;
        },
        setUsers(state, action) {
            const usersRetrieved = action.payload.users;

            for (const user of usersRetrieved) {
                // Push users without isFriend variable (add this later)
                state.users.push({
                    id: user.id,
                    first: user.first_name,
                    last: user.last_name,
                    email: user.email,
                    avatar: user.avatar
                });
            }
        },
        addNewFriend(state, action) {
            const newFriend = action.payload;
            const existingFriend = state.myFriends.find(friend => friend.id === newFriend.id);

            if (!existingFriend) {
                state.myFriends.push({
                    id: newFriend.id,
                    first: newFriend.first,
                    last: newFriend.last,
                    email: newFriend.email,
                    avatar: newFriend.avatar
                });
            }
        },
        deleteFriend(state, action) {
            const friendId = action.payload.friendId;
            const updatedArray = state.myFriends.filter(friend => friend.id !== friendId);

            if (updatedArray) {
                state.myFriends = updatedArray;
            }
        }
    }
});

export const friendsActions = friendsSlice.actions;
export default friendsSlice;
