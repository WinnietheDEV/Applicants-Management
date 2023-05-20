import {
  APPLY_JOB_BEGIN,
  FETCH_APPLICANTS,
  FETCH_APP_DETAIL,
  FETCH_JOBS,
  LOGOUT,
  POST_JOB_BEGIN,
  POST_JOB_SUCCESS,
  SET_USER,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_USER) {
    return {
      ...state,
      userRole: action.payload.status,
      login: true,
      userId: action.payload.userId,
    };
  }

  if (action.type === POST_JOB_BEGIN) {
    return { ...state, showPostJobForm: !state.showPostJobForm };
  }

  if (action.type === POST_JOB_SUCCESS) {
    return { ...state, showPostJobForm: false };
  }

  if (action.type === APPLY_JOB_BEGIN) {
    return { ...state, showApplyForm: true };
  }

  if (action.type === FETCH_APPLICANTS) {
    return { ...state, isFetchApplicants: !state.isFetchApplicants };
  }

  if (action.type === FETCH_JOBS) {
    return { ...state, isFetchJobs: !state.isFetchJobs };
  }

  if (action.type === FETCH_APP_DETAIL) {
    return { ...state, showAppDetail: !state.showAppDetail };
  }

  if (action.type === LOGOUT) {
    return { ...state, login: false, userRole: "user" };
  }
};

export default reducer;
