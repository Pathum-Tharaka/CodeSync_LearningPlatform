
import { CREATE_REEL_FAILURE, CREATE_REEL_REQUEST, CREATE_REEL_SUCCESS, DELETE_REEL_FAILURE, DELETE_REEL_REQUEST, DELETE_REEL_SUCCESS, GET_ALL_REELS_FAILURE, GET_ALL_REELS_REQUEST, GET_ALL_REELS_SUCCESS } from './ActionType';
  
  const initialState = {
    reels: [],
    createdReel:null,
    deletedReel:null,
    loading: false,
    error: null,
  };
  
  const reelReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REEL_REQUEST:
      case DELETE_REEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_REEL_SUCCESS:
        return {
          ...state,
          reels: [...state.reels, action.payload],
          loading: false,
        };
      case DELETE_REEL_SUCCESS:
        return {
          ...state,
          reels: state.reels.filter((reel) => reel.id !== action.payload.id),
          loading: false,
        };
      case CREATE_REEL_FAILURE:
      case DELETE_REEL_FAILURE:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
        case GET_ALL_REELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_REELS_SUCCESS:
      return {
        ...state,
        reels: action.payload,
        loading: false,
      };
    case GET_ALL_REELS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
      default:
        return state;
    }
  };
  
  export default reelReducer;
  