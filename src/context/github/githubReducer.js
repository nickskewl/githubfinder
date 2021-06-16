import {
  CLEAR_USERS,
  SEARCH_USERS,
  SET_LOADING,
  GET_USER,
  GET_REPOS,
  NO_USER_FOUND,
} from "../types";

const githubReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        searchResult: true,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case NO_USER_FOUND:
      return {
        ...state,
        searchResult: false,
        loading: false,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
