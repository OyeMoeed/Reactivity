import {
  USERS_DATA_STATE_CHANGE,
  USERS_POST_STATE_CHANGE,
  USERS_DATA_LIKE_CHANGE,
} from '../constants';

const initialState = {users: [], usersLoaded: 0, feed: []};
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
        usersLoaded: state.usersLoaded + 1,
        feed: [...state.feed, ...action.posts],
      };

    case USERS_DATA_LIKE_CHANGE:
      return {
        ...state,
        feed: state.feed.map(post =>
          post.id == action.postId
            ? {
                ...post,
                currentUserLike: action.currentUserLike,
              }
            : post,
        ),
      };

    default:
      return state;
  }
};
