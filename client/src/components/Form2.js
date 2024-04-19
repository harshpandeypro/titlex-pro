import React, { useState } from "react";
import "./Form2.css";
import electric from "../images/electric-grey.svg";
import Spinner from "./Spinner";

const Form2 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = process.env.REACT_APP_BACKEND_URL + "/generate-title";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      //   console.log(data);
      setOutput(data);
      setLoading(false);
      // setTitle("");
      // setDescription("");
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div>
      <div className="container flex">
        <div className="left flex">
          <h1>Titlex Pro</h1>
          <p id="intro-description">Your AI Video Title Generator</p>
        </div>
        <div className="right flex">
          <div className="box flex">
            <form id="form" onSubmit={submitHandler} className="flex">
              <div className="form-title">
                <label htmlFor="title" className="form-label">
                  Enter Your Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g I tried to fight a lion"
                  required
                />
              </div>

              <div className="form-description">
                <label htmlFor="description" className="form-label">
                  Describe Your Video:
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="What's the video about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="submit-button flex">
                Generate <img className="electric-img" src={electric} alt="" />
              </button>
            </form>
            <div className="result">
              <h3>Result :</h3>
              <div className="output-box flex">
                <div className="output-left flex">
                  <h4>Input Title</h4>

                  <p>{title === "" ? "What's your video title?" : title}</p>
                </div>
                <div className="output-right flex">
                  <h4>Generated Title</h4>
                  {/* {loading && <Spinner />}

                  <p>
                    {output === ""
                      ? "Here's a better title suggestion"
                      : output}
                  </p> */}

                  {loading ? (
                    <Spinner />
                  ) : (
                    <p>
                      {output === ""
                        ? "Here's a better title suggestion"
                        : output}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2;
