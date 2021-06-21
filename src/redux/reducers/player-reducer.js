import {inPraktikAPI} from '../../api/inPraktik-api';

const SET_PLAYER_DATA = 'SET_PLAYER_DATA';

const initialState = {
  xp_earned: null,
  groups: [],
};

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_DATA:
      return {
        ...state,
        xp_earned: action.payload.xp_earned,
      };
    default:
      return state;
  }
};

// actions
export const setPlayerDataAC = payload => ({
  type: SET_PLAYER_DATA,
  payload: {
    xp_earned: payload.xp_earned,
  },
});

// thunks

export const getPlayerByIdTC = () => async (dispatch, getState) => {
  try {
    const {account_uid} = getState().auth;
    const response = await inPraktikAPI.getPlayerById(account_uid);
    dispatch(setPlayerDataAC(response));
    // dispatch(setIsLoggedInAC(response.data.is_logged_in));
  } catch (e) {
    console.log('getPlayerByIdTC error', e);
  }
};
