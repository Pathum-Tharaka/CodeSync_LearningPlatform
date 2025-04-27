import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";


const rootReducers = combineReducers({
    auth: authReducer, // Combine the auth reducer into the root reducer
    // Add other reducers here as needed
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));