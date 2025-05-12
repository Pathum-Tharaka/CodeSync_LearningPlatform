import { BASE_URL } from "../../Config/api";
import {
  GET_PROGRESS_UPDATES,
  CREATE_PROGRESS_UPDATE,
  UPDATE_PROGRESS_UPDATE,
  DELETE_PROGRESS_UPDATE,
} from "./ActionType";

// This action file is responsible for managing the learning progress updates

// Action to fetch all progress updates for the logged-in user
export const getProgressUpdates = (jwt) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/progress/user`, {
    headers: { Authorization: `Bearer ${jwt}` }, // Attach JWT token in header
  });
  const data = await res.json(); // Parse response
  dispatch({ type: GET_PROGRESS_UPDATES, payload: data }); // Dispatch action to Redux store
};

// Action to create a new progress update
export const createProgressUpdate = (jwt, updateData) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/progress/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set request content type
      Authorization: `Bearer ${jwt}`, // Attach JWT token in header
    },
    body: JSON.stringify(updateData), // Convert update data to JSON string
  });
  const data = await res.json(); // Parse response
  dispatch({ type: CREATE_PROGRESS_UPDATE, payload: data }); // Dispatch action to Redux store
};

// Action to update an existing progress update
export const updateProgressUpdate =
  (jwt, id, updateData) => async (dispatch) => {
    const res = await fetch(`${BASE_URL}/api/progress/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set request content type
        Authorization: `Bearer ${jwt}`, // Attach JWT token in header
      },
      body: JSON.stringify(updateData), // Convert updated data to JSON string
    });
    const data = await res.json(); // Parse response
    dispatch({ type: UPDATE_PROGRESS_UPDATE, payload: data }); // Dispatch action to Redux store
  };

// Action to delete a specific progress update by ID
export const deleteProgressUpdate = (jwt, id) => async (dispatch) => {
  await fetch(`${BASE_URL}/api/progress/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` }, // Attach JWT token in header
  });
  dispatch({ type: DELETE_PROGRESS_UPDATE, payload: id }); // Dispatch action to remove update from store
};
