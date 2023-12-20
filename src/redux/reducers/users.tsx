import {USERS_DATA_STATE_CHANGE, USERS_POST_STATE_CHANGE} from '../constants';

const initialState = {users: [], usersFollowingLoaded: 0};
export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [
          ...state.users,
          {
            ...action.user,
            uid: String(action.user.uid), // Convert to string explicitly
          },
        ],
      };
    case USERS_POST_STATE_CHANGE:
      console.log('User Post State Change', action);
      console.log('State before update:', state);

      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        users: state.users.map(user =>
          user.uid === action.uid ? {...user, posts: action.posts} : user,
        ),
      };

    default:
      return state;
  }
};