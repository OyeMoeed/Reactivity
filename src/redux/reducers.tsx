import {combineReducers} from 'redux';
import {userSlice} from './userSlice';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
