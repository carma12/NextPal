import {friendsActions} from "./friends-slice";

//HTTP Request - Main list of users (https://reqres.in/)
export const fetchAllUsers = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response1 = await fetch('https://reqres.in/api/users?page=1');
            const response2 = await fetch('https://reqres.in/api/users?page=2');

            if (!response1.ok || !response2.ok) {
                throw new Error('Could not fetch list of users');
            }

            const data1 = await response1.json();
            const data2 = await response2.json();

            return data1.data.concat(data2.data);
        }

        try {
            const usersData = await fetchData();
            //console.log(usersData);
            dispatch(friendsActions.setUsers({
                users: usersData
            }));
        } catch (error) {
            console.log('ERROR (fetchAllUsers) -> ' + error);
        }
    }
};

// HTTP Request - Store my list of friends in my database
export const storeMyFriends = (myFriendsList) => {
    //console.log(myFriendsList);
    return async dispatch => {
        const sendRequest = async () => {
            const response = await fetch('https://nextpal-5e69e-default-rtdb.firebaseio.com/myFriends.json',
                {
                    method: 'PUT',
                    body: JSON.stringify(myFriendsList)
                });
            if (!response.ok) {
                throw new Error('Friend cannot be added');
            }
        };

        try {
            await sendRequest();
            dispatch(friendsActions.setMyFriendsList({ // setMyFriends
                myFriends: myFriendsList
            }));
        } catch (error) {
            console.log('ERROR (storeMyFriends) -> ' + error);
        }
    }
};

// HTTP Request - Get my Friends in my database

export const getMyFriends = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://nextpal-5e69e-default-rtdb.firebaseio.com/myFriends.json');
            if (!response.ok) {
                throw new Error('Could not fetch list of friends');
            }

            const data = await response.json();
            //console.log(data);

            //return data.data;
            return data;
        }

        try {
            const friendsData = await fetchData();
            //console.log(usersData);
            dispatch(friendsActions.setMyFriendsList({
                myFriends: !friendsData ? [] : friendsData
            }));
        } catch (error) {
            console.log('ERROR (getMyFriends) -> ' + error);
        }
    }
};
