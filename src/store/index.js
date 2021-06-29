import {configureStore} from "@reduxjs/toolkit";

import friendsSlice from "./friends-slice";

const store = configureStore({
    reducer: {
        friends: friendsSlice.reducer
    }
});

export default store;
