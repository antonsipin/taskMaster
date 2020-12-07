import {
  IS_AUTH,
  GROUPS_MAIN,
  SIGN_UP,
  ADD_TASKS,
  GET_GROUP_NAME,
  ADD_POSTS,
  ADD_EMPTY_POSTS,
  ADD_ALL_TASKS,
  ADD_BOARD,
} from './types';

export const addAllTasks = (allTasks) => ({ type: ADD_ALL_TASKS, payload: {allTasks} });
export const isAuthAC = (login) => ({ type: IS_AUTH, payload: { login } });
export const signUp = (login, pass) => ({
  type: SIGN_UP,
  payload: { login, pass },
});
export const addGroupsMainAC = (groups) => ({
  type: GROUPS_MAIN,
  payload: { groups },
});
export const addTasks = (tasks) => ({ type: ADD_TASKS, payload: { tasks } });
export const getGroupNameAC = (groupName) => ({
  type: GET_GROUP_NAME,
  payload: { groupName },
});
export const addPostsAC = (posts) => ({ type: ADD_POSTS, payload: { posts } });
export const addEmptyPostAC = () => ({ type: ADD_EMPTY_POSTS });
export const addBoard = (chart) => ({ type: ADD_BOARD, payload: {chart} });

