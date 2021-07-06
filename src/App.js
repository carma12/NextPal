import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers, getMyFriends, storeMyFriends} from "./store/friends-actions";

import Header from "./components/Layout/Header";
import Friends from "./components/Friends/Friends";

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const myFriends = useSelector(state => state.friends.myFriends);

    // Update myFriends array from the ones in the DB
    useEffect(() => {
        // Preventing the list of Friends to be erased (in DB) when reload the page
        if (isInitial) {
            isInitial = false;
            return;
        }
        dispatch(storeMyFriends(myFriends));
    }, [dispatch, myFriends]);

    // Update list of friends
    useEffect(() => {
        dispatch(getMyFriends());
    }, [dispatch]);

    // Get all users at when site loads the first time
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <div>
            <Header/>
            <Friends/>
        </div>
    );
}

export default App;
