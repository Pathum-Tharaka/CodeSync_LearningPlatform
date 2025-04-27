import { FETCH_USER_STORY, CREATE_STORY } from "./ActionType"

const initialState={
    stories: [],
    createdStory: null,
}
export const StoryReducer=(store=initialState,{type,payload})=>{

    if(type===FETCH_USER_STORY){
        return({...store,stories:payload})
    }
    else if (type === CREATE_STORY) {
        return { ...store, createdStory: payload };
    }

    return store;

}