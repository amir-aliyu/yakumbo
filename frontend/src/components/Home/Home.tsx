import React, { FC, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import PlantForm from '../Form/PlantForm.tsx';
//import test from 'node:test';

const BACKEND_URL = "goldfish-app-ah94n.ondigitalocean.app";

const Home = () => {

  return (
    <div>
    <div className="banner">
        Yakumbo Humanitarian Foundation
    </div> 
      
    <div id="about" className="container">
        <div className="section-title">About Us</div>
        <div className="row section-content">
            <div className="col-md-12">
                <p>Welcome to the Yakumbo Humanitarian Foundation. We are dedicated to making a difference in our community by providing support and resources to those in need...</p>
            </div>
        </div>
    </div>

    <div id="message" className="container bg-light">
        <div className="section-title">Our Message</div>
        <div className="row section-content">
            <div className="col-md-12">
                <p>At the Yakumbo Humanitarian Foundation, our mission is to empower individuals and strengthen communities through our programs and initiatives...</p>
            </div>
        </div>
    </div>

    <div id="projects" className="container">
        <div className="section-title">Projects</div>
        <div className="row section-content">
            <div className="col-md-4">
                <h5>Project 1</h5>
                <p>Description of Project 1...</p>
            </div>
            <div className="col-md-4">
                <h5>Project 2</h5>
                <p>Description of Project 2...</p>
            </div>
            <div className="col-md-4">
                <h5>Project 3</h5>
                <p>Description of Project 3...</p>
            </div>
        </div>
    </div>

    <div id="contact" className="container bg-light">
        <div className="section-title">Contact Us</div>
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

    <footer className="text-center py-4">
        &copy; 2024 Y Foundation. All rights reserved.
    </footer>

</div>
       
  );
};

export default Home;

