import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_ALL_COMMENT, GET_POST_COMMENT, LIKE_COMMENT } from "./ActionType"

const initialState={
    createdComment:null,
    postComments:null,
    likedComment:null,
    updatedComment:null,
    deletedComment:null,
    comments:null,
}

export const commentReducer=(store=initialState,{type,payload})=>{
    if(type===CREATE_COMMENT){
        return {...store, createdComment:payload}
    }
    else if(type===GET_POST_COMMENT){
        return {...store, postComments:payload}
    }
    else if(type===LIKE_COMMENT){
        return {...store, likedComment:payload}
    }
    else if(type===EDIT_COMMENT){
        return {...store, updatedComment:payload}
    }
    else if(type===DELETE_COMMENT){
        return{...store,deletedComment:payload}
    }
    else if(type===GET_ALL_COMMENT){
        return{...store,comments:payload}
    }
    return store;
}