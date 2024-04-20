import React, { useState } from "react";

const Preferences = () => {
    const [selection, setSelection] = useState("");

    const handleChange = (event) => {
        setSelection(event.target.value); 
    };

    return (
      <div className="container">
        <h1 className="mt-4 mb-4 fw-bold">My Preferences</h1>
        <div className="card mt-4 shadow">
          <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
            <p className="m-0 fs-3">Preferences</p>
          </div>
          <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
            <h2>Do you want to receive recipes?</h2>
            <select value={selection} onChange={handleChange}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>
        // <div>
        //     <h1>My Preferences</h1>
        //     <h2>Do you want to receive recipes?</h2>
        //     <select value={selection} onChange={handleChange}>
        //         <option value="yes">Yes</option>
        //         <option value="no">No</option>
        //     </select>
        // </div>
    );
};
  
export default Preferences;
