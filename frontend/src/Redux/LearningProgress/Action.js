import { BASE_URL } from "../../Config/api";
import {
  GET_PROGRESS_UPDATES,
  CREATE_PROGRESS_UPDATE,
  UPDATE_PROGRESS_UPDATE,
  DELETE_PROGRESS_UPDATE,
} from "./ActionType";

export const getProgressUpdates = (jwt) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/progress/user`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  const data = await res.json();
  dispatch({ type: GET_PROGRESS_UPDATES, payload: data });
};

export const createProgressUpdate = (jwt, updateData) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/progress/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  dispatch({ type: CREATE_PROGRESS_UPDATE, payload: data });
};

export const updateProgressUpdate = (jwt, id, updateData) => async (dispatch) => {
  const res = await fetch(`${BASE_URL}/api/progress/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  dispatch({ type: UPDATE_PROGRESS_UPDATE, payload: data });
};

export const deleteProgressUpdate = (jwt, id) => async (dispatch) => {
  await fetch(`${BASE_URL}/api/progress/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${jwt}` },
  });
  dispatch({ type: DELETE_PROGRESS_UPDATE, payload: id });
};
