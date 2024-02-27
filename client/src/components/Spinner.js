import React from "react";
import loadingSpinner from "./loading-spinner2.gif";

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img src={loadingSpinner} alt="..." style={{ width: "40px" }} />
    </div>
  );
};

export default Spinner;
