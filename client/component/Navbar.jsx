import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useAppContext } from "../src/context/appContext";
const Navbar = () => {
  const { logOut } = useAppContext();
  return (
    <>
      <Link to="/">
        <Button type={"button"} name={"log in/register"} />
      </Link>
      <Link to="/jobs">
        <Button type={"button"} name={"jobs"} />
      </Link>
      <Link to="/applicants">
        <Button type={"button"} name={"applicants"} />
      </Link>
      <Link to="/">
        <button
          type="button"
          onClick={(e) => {
            logOut();
          }}
        >
          log out
        </button>
      </Link>
    </>
  );
};

export default Navbar;
