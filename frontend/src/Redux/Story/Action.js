import { BASE_URL } from "../../Config/api";
import { FETCH_FOLLOWING_USER_STORY, FETCH_USER_STORY, CREATE_STORY } from "./ActionType";

export const findFollowingUserStory = (data) => async (dispatch) => {
  const res = await fetch(
    `${BASE_URL}/api/stories/f/${data.userIds}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    }
  );

  const stories = await res.json();
  dispatch({ type: FETCH_FOLLOWING_USER_STORY, payload: stories });
};

export const findStoryByUserId = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/stories/${data.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const stories = await res.json();
    console.log("stories :- ", stories);
    dispatch({ type: FETCH_USER_STORY, payload: stories });
  } catch (error) {
    console.error("Error fetching stories:", error);
    dispatch({ type: FETCH_USER_STORY, payload: [] });
  }
};

export const createStory = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/stories/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.jwt,
        },
        body: JSON.stringify(data.story),
      }
    );
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const createdStory = await res.json();
    dispatch({ type: CREATE_STORY, payload: createdStory });
  } catch (error) {
    console.error("Error creating story:", error);
  }
};
