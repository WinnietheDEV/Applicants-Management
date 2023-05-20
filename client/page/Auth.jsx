import React, { useState } from "react";
import Button from "../component/Button";
import axios from "axios";
import { useAppContext } from "../src/context/appContext";
const Auth = () => {
  const initialState = {
    isMember: false,
    username: "",
    email: "",
    password: "",
    register: false,
    surname: "",
  };

  const { setUser, login } = useAppContext();
  const [values, setValues] = useState(initialState);
  const toggleLogin = () => {
    setValues({ ...values, register: !values.register });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const urlLogin = "http://localhost:3000/tofu/auth/login";
  const urlRegister = "http://localhost:3000/tofu/auth/register";

  const postLogIn = () => {
    const data = {
      email: values.email,
      password: values.password,
    };
    axios
      .post(urlLogin, data)
      .then((res) => {
        // setToken(`Bearer ${res.data.token}`);
        const token = `Bearer ${res.data.token}`;
        localStorage.setItem("token", token);
        const { status, _id: userId } = res.data.user;
        console.log(status, userId);
        setUser({ status, userId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postRegister = () => {
    const data = {
      email: values.email,
      password: values.password,
      name: values.username,
      surname: values.surname,
    };
    axios
      .post(urlRegister, data)
      .then((res) => {
        console.log(res.data);
        toggleLogin();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (login) {
    return <h2>you already log in</h2>;
  } else {
    if (!values.isMember) {
      return (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              values.register ? postRegister() : postLogIn();
            }}
          >
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <br />
            <label htmlFor="username">password</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <br />
            {values.register && (
              <>
                <label htmlFor="username">name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <br />
                <label htmlFor="surname">surname</label>

                <input
                  type="text"
                  id="surname"
                  name="surname"
                  onChange={(e) => handleChange(e)}
                />
              </>
            )}
            <br />
            <button type="submit">
              {values.register ? "register" : "log in"}
            </button>
          </form>
          <p>
            <Button
              handleClick={toggleLogin}
              type="button"
              name={
                values.register
                  ? "already have account?"
                  : "didn't have account yet?"
              }
            />
          </p>
        </>
      );
    } else {
      return <Button type="submit" name="log out" />;
    }
  }
};

export default Auth;
