import {inPraktikAPI} from '../../api/inPraktik-api';

const SET_SECTIONS = 'SET_SECTIONS';

const initialState = {
  sections: [],
};

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      };
    default:
      return state;
  }
};

// actions

export const setSectionsAC = payload => ({
  type: SET_SECTIONS,
  payload,
});

// thunks

export const getSectionsTC = caseId => async dispatch => {
  try {
    const response = await inPraktikAPI.getCaseById(caseId);
    const sections = response.sections;
    dispatch(setSectionsAC(sections));
  } catch (e) {
    console.log('getAssignedCasesTC e', e);
  }
};
