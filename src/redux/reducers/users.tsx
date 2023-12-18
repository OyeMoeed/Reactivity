import {USERS_DATA_STATE_CHANGE, USERS_POST_STATE_CHANGE} from '../constants';

const initialState = {users: [], usersLoaded: 0};
// console.log('initialState', initialState);
export const users = (state = initialState, action) => {
  //  console.log('Action:', action);
  // console.log('Current state:', state);
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      console.log('Handling USERS_DATA_STATE_CHANGE action');

      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POST_STATE_CHANGE:
      console.log('Handling USERS_DATA_POST_STATE ACTION');
      return {
        ...state,
        usersLoaded: state.usersLoaded + 1,
        users: state.users.map(user =>
          user.uid === action.uid ? {...users, posts: action.posts} : user,
        ),
      };

    default:
      return state;
  }
};
