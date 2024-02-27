import React, { useState } from "react";
import Spinner from "./Spinner";

const Form = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/generate-title", {
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

  const clearHandler = () => {
    setTitle("");
    setDescription("");
    setOutput("");
  };

  return (
    <>
      <div className="container ">
        <div className="row align-items-center">
          <div className="col-4">
            <h1>Titlex</h1>
            <form id="form" onSubmit={submitHandler} className="my-3">
              <div className="my-3">
                <label htmlFor="title" className="form-label">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="form-control"
                  placeholder="Enter your title"
                />
              </div>

              <div className="my-3">
                <label htmlFor="description" className="form-label">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's your video about?"
                  required
                  className="form-control"
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Generate
              </button>
              <button
                type="submit"
                className="btn btn-secondary mx-2"
                onClick={clearHandler}
              >
                Clear
              </button>
            </form>

            <h3>Your Output:</h3>
            <div className="row ">
              <div className="col-6 border">
                <h5>Your Title</h5>
                <p>{title}</p>
              </div>
              <div className="col-6 border">
                <h5>Generated Title</h5>
                <p>{loading && <Spinner />}</p>
                <p>{output}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
