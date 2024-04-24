import React, { useState } from "react";
import { useEffect } from "react";
import { Box, Select, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Preferences = () => {
    const navigate = useNavigate();
    const [recipeOptIn, setRecipeOptIn] = useState(true);
    const [recipeOptInValue, setRecipeOptInValue] = useState(
        recipeOptIn ? 1 : 0
    );
    const [uuid, setUuid] = React.useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/accounts/cookies', {
            method: 'GET',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setUuid(data.uuid);})
        .catch(error => console.error('Error:', error));
        console.log(uuid);
    }, [uuid, setUuid]);

    const handleChange = (event) => {
        if (event.target.value === "1") {
            setRecipeOptIn(true);
            setRecipeOptInValue(1);
        } else if (event.target.value === "0") {
            setRecipeOptIn(false);
            setRecipeOptInValue(0);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/accounts/update-preferences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uuid: uuid,
                    recipeOptIn: recipeOptIn,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                toast.success('Preferences updated successfully');
                navigate('/account');
            } else {
                console.log('Failed to update preferences');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
      <div className="container">
        <h1 className="mt-4 mb-4 fw-bold">My Preferences</h1>
        <div className="card mt-4 shadow">
          <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
            <p className="m-0 fs-3">Preferences</p>
          </div>
          <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
            <h5 className="card-title">Recipe Emails</h5>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }} onSubmit={handleSubmit}>
              <Select
                native
                value={recipeOptInValue}
                onChange={handleChange}
                inputProps={{
                  name: "recipeOptIn",
                  id: "recipeOptIn",
                }}
                sx = {{ width: "50%", height: "50px" }}
                className="form-select"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value={1}>Yes, I want to receive recipe emails</option>
                <option value={0}>No, I do not want to receive recipe emails</option>
              </Select>
              <Box sx={{ width: "100%" }} />
              <button type="submit" className="btn btn-primary mt-4">
                Save
              </button>
              <button type="reset" className="btn btn-danger mt-4 ms-2">
                Cancel
              </button>
            </Box>
          </div>
        </div>
      </div>
    );
};
  
export default Preferences;
