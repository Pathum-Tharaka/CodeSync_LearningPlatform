import { BASE_URL } from "../../Config/api";
import {
  CREATE_NEW_POST,
  DELETE_POST,
  EDIT_POST,
  GET_SINGLE_POST,
  GET_USER_POST,
  LIKE_POST,
  REQ_USER_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
  GET_ALL_POSTS,
} from "./ActionType";

export const createPost = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
      body: JSON.stringify({
        caption: data.data.caption,
        mediaUrls: data.data.mediaUrls,
        location: data.data.location
      }),
    });

    const resData = await res.json();
    dispatch({ type: CREATE_NEW_POST, payload: resData });
  } catch (error) {
    console.log("error - ", error);
  }
};

export const findUserPost = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `${BASE_URL}/api/posts/following/${data.userIds}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("find user post",resData);

  dispatch({ type: GET_USER_POST, payload: resData });
  } catch (error) {
    console.log("catch error ---- ",error)
  }

};


export const reqUserPostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `${BASE_URL}/api/posts/following/${data.userId}`,
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("find user post",resData);

  dispatch({ type: REQ_USER_POST, payload: resData });
  } catch (error) {
    console.log("catch error ---- ",error)
  }

};


export const likePostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `${BASE_URL}/api/posts/like/${data.postId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  // console.log("like post action", resData);

  dispatch({ type: LIKE_POST, payload: resData });

  } catch (error) {
    console.log("error - ",error)
  }

};

export const unLikePostAction = (data) => async (dispatch) => {
  // console.log("data --------- ",data)

  try {
    
  const res = await fetch(
    `${BASE_URL}/api/posts/unlike/${data.postId}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },

      body: JSON.stringify(data.data),
    }
  );

  const resData = await res.json();

  console.log("unlike post action", resData);

  dispatch({ type: UNLIKE_POST, payload: resData });

  } catch (error) {
    console.log("error - ",error)
  }

};


export const savePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`${BASE_URL}/api/posts/save_post/${data.postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const savedPost = await res.json();

  console.log("saved post", savedPost);
  dispatch({ type: SAVE_POST, payload: savedPost });
  } catch (error) {
    console.log("catch error ", error)
  }
  
};


export const unSavePostAction = (data) => async (dispatch) => {

  try {
    const res = await fetch(`${BASE_URL}/api/posts/unsave_post/${data.postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + data.jwt,
    },
  });
  const unSavedPost = await res.json();

  console.log("un saved post", unSavedPost);

  dispatch({ type: UNSAVE_POST, payload: unSavedPost });
  } catch (error) {
    console.log("catch error ", error)
  }
  
};

export const findPostByIdAction=(data)=>async(dispatch)=>{
  try {
    const res=await fetch(`${BASE_URL}/api/posts/${data.postId}`,{
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      Authorization:"Bearer "+data.jwt,
    },
  })
  const post=await res.json();
  dispatch({type:GET_SINGLE_POST,payload:post});
  } catch (error) {
    console.log("catch error ",error)
  }
  
}

export const editPOst = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/api/posts/edit/${data.data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
            body: JSON.stringify({
                caption: data.data.caption,
                location: data.data.location,
                mediaUrls: data.data.mediaUrls
            }),
        });

        if (!res.ok) {
            throw new Error('Failed to update post');
        }

        const updatedPost = await res.json();
        console.log("Post updated successfully:", updatedPost);
        dispatch({ type: EDIT_POST, payload: updatedPost });
        
        // Optionally refresh the posts after edit
        dispatch(getAllPostsAction({ jwt: data.jwt }));
    } catch (error) {
        console.error("Error updating post:", error);
    }
};

export const getAllPostsAction = (data) => async (dispatch) => {
  try {
    console.log("Fetching all posts...");
    const res = await fetch(`${BASE_URL}/api/posts/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + data.jwt,
      },
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const posts = await res.json();
    console.log("Received posts:", posts);
    dispatch({ type: GET_ALL_POSTS, payload: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    dispatch({ type: GET_ALL_POSTS, payload: [] }); // Dispatch empty array on error
  }
};

export const deletePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/api/posts/delete/${data.postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data.jwt,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to delete post');
        }

        const deletedPost = await res.json();
        console.log("Post deleted successfully:", deletedPost);
        dispatch({ type: DELETE_POST, payload: deletedPost });
        
        // Refresh posts after deletion
        dispatch(getAllPostsAction({ jwt: data.jwt }));
    } catch (error) {
        console.error("Error deleting post:", error);
    }
};



