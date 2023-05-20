import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  APPLY_JOB_BEGIN,
  FETCH_APPLICANTS,
  FETCH_APP_DETAIL,
  FETCH_JOBS,
  LOGOUT,
  POST_JOB_BEGIN,
  SET_USER,
} from "./actions";

const AppContext = React.createContext();
const initialState = {
  isLoading: false,
  userRole: "user",
  username: "",
  userEmail: "",
  userToken: "",
  userId: "",
  showPostJobForm: false,
  showApplyForm: false,
  login: false,
  isFetchJobs: false,
  isFetchApplicants: false,
  showAppDetail: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = ({ status, userId }) => {
    console.log(status);
    dispatch({ type: SET_USER, payload: { status, userId } });
  };

  const postJobBegin = () => {
    dispatch({ type: POST_JOB_BEGIN });
  };

  const applyJobBegin = () => {
    dispatch({ type: APPLY_JOB_BEGIN });
  };

  const fetchApplicantBegin = () => {
    dispatch({ type: FETCH_APPLICANTS });
  };

  const fetchJobBegin = () => {
    dispatch({ type: FETCH_JOBS });
  };

  const fetchAppDetail = () => {
    dispatch({ type: FETCH_APP_DETAIL });
  };

  const logOut = () => {
    dispatch({ type: LOGOUT });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        setUser,
        postJobBegin,
        applyJobBegin,
        fetchApplicantBegin,
        fetchJobBegin,
        fetchAppDetail,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
