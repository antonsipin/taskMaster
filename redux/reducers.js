
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


export const reducers = (state = { isAuth: null }, action) => {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, isAuth: action.payload.login };

    case GROUPS_MAIN:
      return { ...state, groups: action.payload.groups };

    case GET_GROUP_NAME:
      return { ...state, groupName: action.payload.groupName };

    case SIGN_UP:
      return { ...state, isAuth: action.payload.login };

    case ADD_TASKS:
      return { ...state, tasks: action.payload.tasks };

    case ADD_POSTS:
      return { ...state, posts: action.payload.posts };

    case ADD_EMPTY_POSTS:
      return { ...state, posts: '' };

    case ADD_ALL_TASKS:
      return {...state, allTasks: action.payload.allTasks};
    
    case ADD_BOARD:
      console.log('>>>>>', action.payload)
      return {...state, chart: action.payload.chart};

    default:
      return state;
  }
};
