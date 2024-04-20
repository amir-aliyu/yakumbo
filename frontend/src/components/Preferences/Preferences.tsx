import React, { useState } from "react";

const Preferences = () => {
    const [selection, setSelection] = useState("");

    const handleChange = (event) => {
        setSelection(event.target.value); 
    };

    return (
        <div>
            <h1>My Preferences</h1>
            <h2>Do you want to receive recipes?</h2>
            <select value={selection} onChange={handleChange}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>
    );
};
  
export default Preferences;
