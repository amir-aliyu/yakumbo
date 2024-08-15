import React, { useState } from "react";
import { useEffect } from "react";
import { Box, Select, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Contact= () => {

    return (
      <div>

    <div id="donate" className="container">
            <div className="section-title">
              <h2>Donate</h2>
            </div>
            <div className="row section-content">
                <div className="col-md-12">
                    <p>   Your generous donation helps us continue our mission to support the community and make a positive impact. Thank you for your support!</p>
                </div>
            </div>
        </div>

        <div id="contact" className="container bg-light">
          <div className="section-title">
            <h2>Contact Us</h2>
          </div>
          <div className="row section-content">
              <div className="col-md-6">
                  <h5>Contact Information</h5>
                  <p>Email: info@yfoundation.org</p>
                  <p>Phone: (123) 456-7890</p>
              </div>
              <div className="col-md-6">
                  <h5>Get Involved</h5>
                  <p>If you are interested in volunteering or supporting our cause, please reach out to us...</p>
              </div>
          </div>
      </div>
    </div>
    );
};
  
export default Contact;
