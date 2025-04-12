// Initial state of the authentication slice of the Redux store
const initialState = {
    user: null,       // Holds user profile data after successful login/profile fetch
    loading: false,   // Indicates whether a request (login/register/profile) is in progress
    error: null,      // Stores any error messages from failed API calls
    jwt: null,        // Holds the JWT token received after login/register
  };
  
  // The reducer function that updates the state based on dispatched actions
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
  
      // These three actions indicate the start of an API request (login/register/profile fetch)
      case LOGIN_USER_REQUEST:
      case REGISTER_USER_REQUEST:
      case GET_USER_PROFILE_REQUEST:
        return {
          ...state,         // Keep previous state properties
          loading: true,    // Show loading spinner or disable buttons
          error: null,      // Clear any previous error
        };
  
      // These two indicate successful login or registration
      case LOGIN_USER_SUCCESS:
      case REGISTER_USER_SUCCESS:
        return {
          ...state,            // Keep other state values
          loading: false,      // Request is done
          error: null,         // Clear error
          jwt: action.payload, // Save the JWT token in state
        };
  
      // When user profile is successfully fetched
      case GET_USER_PROFILE_SUCCESS:
        return {
          ...state,            // Keep existing state
          loading: false,      // Request is done
          error: null,         // Clear error
          user: action.payload // Save the user profile object
        };
  
      // These handle any failure during login/register/profile fetch
      case LOGIN_USER_FAILURE:
      case REGISTER_USER_FAILURE:
      case GET_USER_PROFILE_FAILURE:
        return {
          ...state,             // Keep previous state
          loading: false,       // Request has ended
          error: action.payload // Store the error message
        };
  
      // Return the current state if no action type matches
      default:
        return state;
    }
  };
  