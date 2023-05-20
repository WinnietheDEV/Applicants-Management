import React, { useState } from "react";
import Joblist from "../component/Joblist";
import { useAppContext } from "../src/context/appContext";
import FormPostJob from "../component/FormPostJob";
import Button from "../component/Button";
const Jobs = () => {
  const { userRole, showPostJobForm, postJobBegin } = useAppContext();
  const [jobs, setJobs] = useState(1);
  if (jobs) {
    return (
      <>
        <Joblist />
        <div>
          {userRole === "admin" ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                postJobBegin();
              }}
            >
              post new job
            </button>
          ) : null}
        </div>
        <div>{showPostJobForm ? <FormPostJob /> : null}</div>
      </>
    );
  }
};

export default Jobs;
