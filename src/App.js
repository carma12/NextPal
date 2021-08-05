import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';

import {fetchAllUsers, getMyFriends, storeMyFriends} from "./store/friends-actions";
import authSlice from "./store/auth-slice";
import Layout from "./components/Layout/Layout";
import StartingPage from "./pages/StartingPage";
import AuthForm from "./pages/AuthForm";
import Friends from "./pages/Friends";

let isInitial = true;

function App() {
    const dispatch = useDispatch();
    const myFriends = useSelector(state => state.friends.myFriends);
    const isLogin = useSelector(state => state.auth.isLogin);

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

    // Allow persisting user authentication status (the user won't lose their session when reloading the page)
    useEffect(() => {
        dispatch(authSlice.actions.checkUserStatus());
    }, [dispatch]);



    return (
        <Layout>
            <Switch>
                {!isLogin && (
                    <Route path='/login'>
                        <AuthForm/>
                    </Route>
                )}
                {!isLogin && (
                    <Route path='/' exact>
                        <StartingPage/>
                    </Route>
                )}
                {isLogin && (
                    <Route path='/logout'>
                        <Redirect to='/'/>
                    </Route>
                )}
                {isLogin && (
                    <Route path='/friends'>
                        <Friends/>
                    </Route>
                )}
                <Route path='*'>
                    {isLogin && (
                        <Redirect to='/friends'/>
                    )}
                    {!isLogin && (
                        <Redirect to='/login'/> // before was '/'
                    )}
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
