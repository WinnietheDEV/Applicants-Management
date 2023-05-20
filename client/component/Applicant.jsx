import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useAppContext } from "../../client/src/context/appContext";
const Applicant = (props) => {
  const { userRole, fetchApplicantBegin, showAppDetail, fetchAppDetail } =
    useAppContext();

  const name = props.user[0].name;
  const surname = props.user[0].surname;
  const status = props.applicant.status;
  // const role = props.job[0]._id;
  const applicantId = props.applicant._id;
  const title = props.job[0].title;
  const email = props.user[0].email;
  const [detail, setDetail] = useState();
  const { index } = props;
  if (userRole === "admin") {
    return (
      <>
        <tr>
          <td>{index + 1}</td>
          <td>{name + " " + surname + ""}</td>
          <td>{email}</td>
          <td>{title}</td>
          <td>{status}</td>
          <td>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fetchAppDetail();
              }}
            >
              detail
            </button>
            <button type="button">edit</button>
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const response = await axios.delete(
                    `http://localhost:3000/tofu/applicants/${applicantId}`
                  );
                  fetchApplicantBegin();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              delete
            </button>
          </td>
        </tr>
        {showAppDetail && (
          <div>
            <p>testtt</p>
          </div>
        )}
      </>
    );
  }
};

export default Applicant;
