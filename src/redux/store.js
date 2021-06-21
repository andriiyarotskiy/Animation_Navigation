import {applyMiddleware, combineReducers, createStore} from 'redux';
import {authReducer} from './reducers/auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {playerReducer} from './reducers/player-reducer';
import {caseReducer} from './reducers/case-reducer';
import {sectionReducer} from './reducers/section-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  case: caseReducer,
  section: sectionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
