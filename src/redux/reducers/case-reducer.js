import {inPraktikAPI} from '../../api/inPraktik-api';

const SET_ASSIGNED_CASES = 'SET_ASSIGNED_CASES';

const initialState = {
  cases: [],
};

export const caseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSIGNED_CASES:
      return {
        ...state,
        cases: action.payload.cases,
      };
    default:
      return state;
  }
};

// actions

export const setAssignedCasesAC = payload => ({
  type: SET_ASSIGNED_CASES,
  payload: {
    cases: payload.cases,
  },
});

// thunks

export const getAssignedCasesTC = () => async dispatch => {
  try {
    const response = await inPraktikAPI.getAssignedCases(); // program & is_practice=false for waitroom
    dispatch(setAssignedCasesAC(response));
  } catch (e) {
    console.log('getAssignedCasesTC e', e);
  }
};
