import axios from "axios";
import React, { useReducer } from "react";
import {
  CLEAR_USERS,
  SEARCH_USERS,
  SET_LOADING,
  GET_USER,
  GET_REPOS,
  NO_USER_FOUND,
} from "../types";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

let GithubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
let GithubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = (props) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
    searchResult: true,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (text) => {
    setLoading();
    const res =
      await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${GithubClientId}
    &client_secret=${GithubClientSecret}`);

    if (res.data.items.length === 0) {
      dispatch({
        type: NO_USER_FOUND,
      });
    } else {
      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items,
      });
    }
  };

  //Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  //set Loading/spinner
  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  //Get user
  const getUser = async (username) => {
    setLoading();

    const res =
      await axios.get(`https://api.github.com/users/${username}?client_id=${GithubClientId}
      &client_secret=${GithubClientSecret}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //Get repos
  const getUserRepos = async (username) => {
    setLoading();

    const res =
      await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${GithubClientId}
    &client_secret=${GithubClientSecret}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchResult: state.searchResult,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
