import {createSlice} from "@reduxjs/toolkit";

const initialFriendsState = {
    users: [],
    myFriends: []
};

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialFriendsState,
    reducers: {
        setUsers(state, action) {
            // TODO: here, try to set a variable 'isFriend' to disable button and prevent from adding them again
            state.users = action.payload.users;
        },
        addNewFriend(state, action) {
            const newFriend = action.payload;
            // TODO: If friend can be added, it means is not in myFriends array (no duplications)
            const existingFriend = state.myFriends.find(friend => friend.id === newFriend.id);

            console.log(newFriend);

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
        setMyFriendsList(state, action) {
            state.myFriends = action.payload.myFriends;
        },
        // isUserMyFriend(state, action) {
        //     const userId = action.payload.userId;
        //     if (state.myFriends.map(friend => friend.id === userId)) {
        //         return true;
        //     }
        //     return false;
        // }
    }
});

export const friendsActions = friendsSlice.actions;
export default friendsSlice;
