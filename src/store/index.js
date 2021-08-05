import {configureStore} from "@reduxjs/toolkit";

import friendsSlice from "./friends-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {
        friends: friendsSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;
