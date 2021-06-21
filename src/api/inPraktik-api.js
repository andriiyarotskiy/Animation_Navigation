import axios from 'axios';
import {getFromAsyncStorage} from '../helpers/helpersFunctions';
import {
  asignedCases,
  getAssignedCaseById,
  getAssignedCaseById_2,
} from './fakeData';

// const settings = {
//   headers: {
//     cookie: getFromAsyncStorage('cookie'),
//   },
// };

const instance = axios.create({
  baseURL: 'https://hemd.hudatascience.nl/test/api/v1/',
  // ...settings,
});

export const inPraktikAPI = {
  checkLogin() {
    return instance
      .post('check_login', {
        app: 'inpraktijk_game',
      })
      .then(res => res.data);
  },
  getProgrammes() {
    return instance.get('programmes');
  },

  /** Dashboard **/
  getPlayerById(id) {
    return instance.get(`players/${id}`).then(res => res.data);
  },
  getExperienceLevels() {
    return instance.get('experience_levels');
  },

  /** WaitRoom **/ // specifically ?is_practice=false for WaitRoom
  getAssignedCases(program, is_practice) {
    // return instance.get(
    //   `assigned_cases?programme=${program}&is_practice=${is_practice}`,
    // );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(asignedCases)));
      }, 2000);
    });
  },

  /** Casus start **/
  getAllCases(program) {
    return instance.get(`cases?programme=${program}`);
  },
  getCaseById(caseId, program) {
    // return instance.get(`cases/${caseId}?programme=${program}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (caseId === 'VF53fANm') {
          resolve(JSON.parse(JSON.stringify(getAssignedCaseById)));
        } else if (caseId === 'aiD8Cmk2') {
          resolve(JSON.parse(JSON.stringify(getAssignedCaseById_2)));
        }
      }, 2000);
    });
  },

  /** VakAnamnese & PsychoSoc **/
  getInterviewSectionsById(id) {
    return instance.get(`interview_sections/${id}`);
  },
  getRelevanceLevels() {
    return instance.get('interview_relevance_levels');
  },

  /** Standaardonderzoek **/
  getFirstScanSectionsById(sectionId) {
    return instance.get(`first_scan_sections/${sectionId}`);
  },

  /** Differentiaal diagnose 1 **/ // Differentiaal diagnose 2 : (endpoints === Differentiaal diagnose 1)
  getDiagnosesSectionsById(id) {
    return instance.get(`diagnosis_sections/${id}`);
  },
  getLikeHoodLevels(id) {
    return instance.get('diagnosis_likelihood_levels');
  },

  /** Aanvullend Onderzoek **/
  getFollowScanSectionsById(id) {
    return instance.get(`followup_scan_sections/${id}`);
  },
  getScanNecessityLvl() {
    return instance.get('scan_necessity_levels');
  },
  getScanResultsById(id) {
    return instance.get(`scan_results/${id}`);
  },
};
