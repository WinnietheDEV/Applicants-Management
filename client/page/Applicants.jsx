import React, { useEffect, useState } from "react";
import Applicant from "../component/Applicant";
import axios from "axios";
import { CSVLink } from "react-csv";
import { useAppContext } from "../src/context/appContext";
const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const { isFetchApplicants, userRole } = useAppContext();
  const fetchApplicants = async () => {
    try {
      const response = await axios(`http://localhost:3000/tofu/applicants`);
      const fetchedUsers = await response.data.users;
      const fetchedJobs = await response.data.jobs;
      const fetchedApplication = await response.data.applicants;

      const applicants = [];
      let obj;
      let dataObj = {};
      let tempDataObj;
      const dataArray = [];
      for (let i = 0; i < fetchedApplication.length; i++) {
        obj = {
          user: fetchedUsers.filter(
            (person) => person._id === fetchedApplication[i].userId
          ),
          job: fetchedJobs.filter(
            (job) => job._id === fetchedApplication[i].jobId
          ),
          applicant: fetchedApplication[i],
        };
        applicants.push(obj);

        tempDataObj = Object.assign({}, dataObj);
        tempDataObj.number = i + 1;
        tempDataObj.name = obj.user[0].name + obj.user[0].surname;
        tempDataObj.email = obj.user[0].email;
        tempDataObj.role = obj.job[0].title;
        tempDataObj.status = "pending";
        dataArray.push(tempDataObj);
      }
      console.log(dataArray);
      setApplicants(applicants);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchApplicants();
  }, [isFetchApplicants]);

  const headers = [
    { label: "No.", key: "number" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
  ];

  const data = [
    {
      number: "1",
      name: "Nawin Sundaraketu",
      email: "win@gmail.com",
      role: "full stack",
      status: "pending",
    },
    {
      number: "1",
      name: "user number2",
      email: "user2@tofu.com",
      role: "back end",
      status: "pending",
    },
  ];

  const csvReport = {
    data: data,
    headers: headers,
    filename: "tofu_applicants.csv",
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicants.length > 0 &&
            applicants.map((app, index) => {
              return (
                <Applicant key={app.applicant._id} {...app} index={index} />
              );
            })}
        </tbody>
      </table>
      {userRole === "admin" && (
        <div className="App">
          <CSVLink {...csvReport}>Export to CSV</CSVLink>
        </div>
      )}
    </>
  );
};

export default Applicants;
