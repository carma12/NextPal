import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers, getMyFriends, storeMyFriends} from "./store/friends-actions";

import Header from "./components/Layout/Header";
import Friends from "./components/Friends/Friends";

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const myFriends = useSelector(state => state.friends.myFriends);

    // Get all users at when site loads the first time
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Update list of friends
    useEffect(() => {
        dispatch(getMyFriends());
    }, [dispatch]);


    useEffect(() => {
        // Preventing the list of Friends to be erased (in DB) when reload the page
        if (isInitial) {
            isInitial = false;
            return;
        }
        // console.log('isInitial = ' + isInitial);
        dispatch(storeMyFriends(myFriends));
    }, [dispatch, myFriends]);



    return (
        <div>
            <Header/>
            <Friends />
        </div>
    );
}

export default App;
