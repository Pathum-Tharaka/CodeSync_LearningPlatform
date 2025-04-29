import {
    GET_PROGRESS_UPDATES,
    CREATE_PROGRESS_UPDATE,
    UPDATE_PROGRESS_UPDATE,
    DELETE_PROGRESS_UPDATE
  } from "./ActionType";
  // This reducer manages the state of learning progress updates in the application
  const initialState = {
    updates: []
  };
  // This reducer manages the state of learning progress updates in the application
  export const progressReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_PROGRESS_UPDATES:
        return { ...state, updates: payload };
      case CREATE_PROGRESS_UPDATE:
        return { ...state, updates: [...state.updates, payload] };
      case UPDATE_PROGRESS_UPDATE:
        return {// This reducer manages the state of learning progress updates in the application
          ...state,
          updates: state.updates.map(u => u.id === payload.id ? payload : u)
        };
      case DELETE_PROGRESS_UPDATE:
        return {
          ...state,
          updates: state.updates.filter(u => u.id !== payload)
        };
      default:
        return state;
    }
  };
  