import React, { useRef } from "react";
import axios from "axios";
import { useAppContext } from "../src/context/appContext";
const FormPostJob = () => {
  const descriptionRef = useRef("");
  const titleRef = useRef("");
  const availableRef = useRef(1);
  const requirementRef = useRef("");

  const { postJobBegin, fetchJobBegin } = useAppContext();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const data = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            available: availableRef.current.value,
            requirement: requirementRef.current.value,
          };

          const response = await axios.post(
            `http://localhost:3000/tofu/jobs`,
            data
          );
          postJobBegin();
          fetchJobBegin();
          console.log(response.data);
          // fetchProducts()
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <label htmlFor="title">Job Title</label>
      <input type="text" name="title" id="title" ref={titleRef} />
      <br />
      <label htmlFor="available">Available</label>
      <input
        type="number"
        ref={availableRef}
        name="available"
        id="available"
        min="1"
        max="50"
      />{" "}
      positions
      <br />
      <label htmlFor="requirement">requirement</label>
      <input
        type="text"
        name="requirement"
        ref={requirementRef}
        id="requirement"
      />
      <br />
      <label htmlFor="description">description</label>
      <input
        type="textarea"
        ref={descriptionRef}
        name="description"
        id="description"
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

export default FormPostJob;
