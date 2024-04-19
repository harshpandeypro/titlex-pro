import React from "react";
import loadingSpinner from "./loading-spinner3.gif";

const Spinner = () => {
  return (
    <div className="text-center my-3">
      <img
        src={loadingSpinner}
        alt="..."
        style={{ width: "80px", marginTop: "10px" }}
      />
    </div>
  );
};

export default Spinner;
