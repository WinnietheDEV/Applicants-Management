import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import ApplyForm from "./ApplyForm";
import { useAppContext } from "../src/context/appContext";
import axios from "axios";
const Job = (prop) => {
  const {
    userRole,
    login,
    applyJobBegin,
    showApplyForm,
    userId,
    fetchJobBegin,
  } = useAppContext();
  const { _id: jobId, title, available, description, requirement } = prop;

  const applyToJob = async () => {
    try {
      const data = {
        userId,
        jobId,
      };

      const response = await axios.post(
        `http://localhost:3000/tofu/applicants`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <div>
          <h5>role: {title}</h5>

          <p>available: {available}</p>

          <p>description: {description}</p>

          <p>requirement: {requirement}</p>
        </div>

        {login === false ? (
          <>
            {userRole === "user" && (
              <Link to="/">
                <button type="button">apply</button>
              </Link>
            )}
          </>
        ) : (
          <>
            {userRole === "user" && (
              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  applyToJob();
                }}
              >
                apply
              </button>
            )}
          </>
        )}

        <div>{showApplyForm && <ApplyForm />}</div>
      </section>
    </>
  );
};

export default Job;
