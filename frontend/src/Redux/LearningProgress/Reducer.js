import {
    GET_PROGRESS_UPDATES,
    CREATE_PROGRESS_UPDATE,
    UPDATE_PROGRESS_UPDATE,
    DELETE_PROGRESS_UPDATE
  } from "./ActionType";
  
  const initialState = {
    updates: []
  };
  
  export const progressReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case GET_PROGRESS_UPDATES:
        return { ...state, updates: payload };
      case CREATE_PROGRESS_UPDATE:
        return { ...state, updates: [...state.updates, payload] };
      case UPDATE_PROGRESS_UPDATE:
        return {
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
  