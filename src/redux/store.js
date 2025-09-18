import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./slices/auth/authApi";
import { usersApi } from "./slices/users/usersApi";
import { cvApi } from "./slices/cv/cvApi";

import authReducer from "./slices/auth/authSlice";
import usersReducer from "./slices/users/usersSlice";
import CvReducer from "./slices/cv/cvSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        cv: CvReducer,
        [authApi.reducerPath]: authApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [cvApi.reducerPath]: cvApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false,}).concat(
            authApi.middleware,
            usersApi.middleware,
            cvApi.middleware,
        ),
});

export default store;
