import {inPraktikAPI} from '../../api/inPraktik-api';
import {getAssignedCasesTC, getPlayerByIdTC} from './player-reducer';

const SET_IS_LOGGED_IN = 'SET_IS_LOGGED_IN';

const initialState = {
  isLoggedIn: false,
  account_uid: '',
  display_name: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.is_logged_in,
        account_uid: action.payload.is_logged_in
          ? action.payload.account_uid
          : '',
        display_name: action.payload.is_logged_in
          ? action.payload.display_name
          : '',
      };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = payload => ({type: SET_IS_LOGGED_IN, payload});

// thunks

export const checkIsLogedInTC = () => async dispatch => {
  try {
    const response = await inPraktikAPI.checkLogin();
    dispatch(setIsLoggedInAC(response));
    if (response.is_logged_in) {
      dispatch(getPlayerByIdTC());
    }
  } catch (e) {
    console.log('checkIsLogedInTC error', e);
  }
};
