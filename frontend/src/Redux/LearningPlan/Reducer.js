import {
  CREATE_LEARNING_PLAN,
  GET_LEARNING_PLANS_REQUEST,
  GET_LEARNING_PLANS_SUCCESS,
  GET_LEARNING_PLANS_FAILURE,
  UPDATE_LEARNING_PLAN,
  DELETE_LEARNING_PLAN,
  ADD_TOPIC,
  UPDATE_TOPIC,
  DELETE_TOPIC,
  ADD_RESOURCE,
  UPDATE_RESOURCE,
  DELETE_RESOURCE
} from "./ActionType";

const initialState = {
  plans: [],
  loading: false,
  error: null,
};

export const learningPlanReducer = (store = initialState, { type, payload }) => {
  switch (type) {
    case GET_LEARNING_PLANS_REQUEST:
      return { ...store, loading: true, error: null };

    case GET_LEARNING_PLANS_SUCCESS:
      return { ...store, loading: false, plans: payload || [], error: null };

    case GET_LEARNING_PLANS_FAILURE:
      return { ...store, loading: false, error: payload };

    case CREATE_LEARNING_PLAN:
      return { 
        ...store, 
        plans: [...store.plans, payload],
        loading: false,
        error: null
      };

    case UPDATE_LEARNING_PLAN:
      return {
        ...store,
        plans: store.plans.map(plan =>
          plan.id === payload.id ? { ...payload, topics: plan.topics } : plan
        ),
        loading: false,
        error: null
      };

    case DELETE_LEARNING_PLAN:
      return {
        ...store,
        plans: store.plans.filter(plan => plan.id !== payload),
        loading: false,
        error: null
      };

    case ADD_TOPIC:
      return {
        ...store,
        plans: store.plans.map(plan =>
          plan.id === payload.planId
            ? { 
                ...plan, 
                topics: [...(plan.topics || []), payload.topic],
                updatedAt: new Date().toISOString()
              }
            : plan
        ),
        loading: false,
        error: null
      };

    case UPDATE_TOPIC:
      return {
        ...store,
        plans: store.plans.map(plan => ({
          ...plan,
          topics: (plan.topics || []).map(topic =>
            topic.id === payload.id ? payload : topic
          ),
          updatedAt: new Date().toISOString()
        })),
        loading: false,
        error: null
      };

    case DELETE_TOPIC:
      return {
        ...store,
        plans: store.plans.map(plan => ({
          ...plan,
          topics: (plan.topics || []).filter(topic => topic.id !== payload),
          updatedAt: new Date().toISOString()
        })),
        loading: false,
        error: null
      };

    case ADD_RESOURCE:
      return {
        ...store,
        plans: store.plans.map(plan => ({
          ...plan,
          topics: (plan.topics || []).map(topic =>
            topic.id === payload.topicId
              ? { 
                  ...topic, 
                  resources: [...(topic.resources || []), payload.resource],
                  updatedAt: new Date().toISOString()
                }
              : topic
          ),
          updatedAt: new Date().toISOString()
        })),
        loading: false,
        error: null
      };

    case UPDATE_RESOURCE:
      return {
        ...store,
        plans: store.plans.map(plan => ({
          ...plan,
          topics: (plan.topics || []).map(topic => ({
            ...topic,
            resources: (topic.resources || []).map(resource =>
              resource.id === payload.id ? payload : resource
            ),
            updatedAt: new Date().toISOString()
          })),
          updatedAt: new Date().toISOString()
        })),
        loading: false,
        error: null
      };

    case DELETE_RESOURCE:
      return {
        ...store,
        plans: store.plans.map(plan => ({
          ...plan,
          topics: (plan.topics || []).map(topic => ({
            ...topic,
            resources: (topic.resources || []).filter(resource => resource.id !== payload),
            updatedAt: new Date().toISOString()
          })),
          updatedAt: new Date().toISOString()
        })),
        loading: false,
        error: null
      };

    default:
      return store;
  }
};