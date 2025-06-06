import {CREATE_NEW_POST, DELETE_POST, EDIT_POST, GET_ALL_POSTS, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, UNSAVE_POST} from "./ActionType";

const initialState = {
  createdPost:null,
  userPost:[],
  reqUserPost:[],
  unsavePost:[],
  singlePost:null,
  deletedPost:null,
  updatedPost:null,
  posts:[],
};

export const postReducer=(store=initialState, {type,payload})=>{
    if(type===CREATE_NEW_POST){
        return {...store, createdPost:payload};
    }
    else if(type===GET_USER_POST){
        return {...store, userPost:payload};
    }
    else if(type===LIKE_POST){
        return {...store, likePost:payload};
    }
    else if(type===REQ_USER_POST){
        return {...store, reqUserPost:payload};
    }
    else if(type===UNSAVE_POST){
        return {...store, unsavePost:payload};
    }
    else if(type===GET_SINGLE_POST){
        return{...store, singlePost:payload}
    }
    else if(type===DELETE_POST){
        return{...store, deletedPost:payload}
    }
    else if(type===EDIT_POST){
        const updatedPosts = store.posts.map(post => 
            post.id === payload.id ? payload : post
        );
        return{
            ...store,
            updatedPost: payload,
            posts: updatedPosts
        }
    }
    else if(type===GET_ALL_POSTS){
        return{...store,posts:payload}
    }
    return store;
}