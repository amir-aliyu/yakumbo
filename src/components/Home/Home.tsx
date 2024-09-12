import React from 'react';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';
import img1 from '../../assets/IMG_1002.jpg';
import img2 from '../../assets/IMG_1003.jpg';
import img3 from '../../assets/IMG_1004.jpg';
import img4 from '../../assets/IMG_1004.jpg';
import img5 from '../../assets/IMG_1004.jpg';
import founderVideo from '../../assets/founderVideo.mp4';
// import PlantForm from '../Form/PlantForm.tsx';
//import test from 'node:test';

// const BACKEND_URL = "goldfish-app-ah94n.ondigitalocean.app";

const Home = () => {

  return (
    // <div>
    //  <div className="container mt-5">
    //         <div className="row">
    //             <div id="about" className="col-md-6">
    //                 <div className="section-title">
    //                     <h2>About Us</h2>
    //                 </div>
    //                 <div className="section-content">
    //                     <p>
    //                         At Yakumbo Humanitarian Foundation, we believe that education and entrepreneurial skills are powerful tools for breaking the cycle of poverty. Inspired by firsthand experiences, we understand the transformative power of education in changing lives and uplifting communities.
    //                     </p>
    //                 </div>
    //         </div>
    

    //             <div id="message" className="col-md-6 bg-light">
    //                 <div className="section-title">
    //                     <h2>Our Message</h2>
    //                 </div>
    //                 <div className="section-content">
    //                     <p>
    //                         Our mission is to mobilize support and essential resources for disadvantaged, impoverished, and marginalized women in need. Join us in our commitment to empower women through meaningful vocational training and skill development, fostering a brighter future for all.
    //                     </p>
    //                 </div>
    //         </div>
    //     </div>
    //     </div>

      <div>
        <div className="container mt-5">
      <div className="row">
        
        {/* About Us and Our Mission Section */}
        <div id="about-mission" className="col-md-6">
          <div className="section-title">
            <h2>About Us</h2>
          </div>
          <div className="section-content">
            <p>
              At Yakumbo Humanitarian Foundation, we believe that education and entrepreneurial skills are powerful tools for breaking the cycle of poverty. Inspired by firsthand experiences, we understand the transformative power of education in changing lives and uplifting communities.
            </p>
          </div>
          <div className="section-title mt-4">
            <h2>Our Mission</h2>
          </div>
          <div className="section-content">
            <p>
              Our mission is to mobilize support and essential resources for disadvantaged, impoverished, and marginalized women in need. Join us in our commitment to empower women through meaningful vocational training and skill development, fostering a brighter future for all.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div id="founder-video" className="col-md-6">
          <div className="section-title">
            <h2>Message from the Founder</h2>
          </div>
          <div className="video-content">
            <video width="100%" controls>
              <source src={founderVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div>
            <center><h5>Binta W Aliyu</h5></center>
          </div>
        </div>
        </div>
        </div>
  


      <div id="projects" className="container">
        <div className="section-title">
          <h2>Projects</h2>
        </div>
                <br></br>
        <div className="row section-content">
            <div className="col-md-4">
                <h5>Food Banks</h5>
                        <img
                            className="d-block w-100"
                            src={img2}
                            alt="Second slide"/>
                <br></br>
                <p>Our food banks provide daily meals for 30 to 40 individuals, addressing immediate food insecurity in our community.</p>
            </div>
            <div className="col-md-4">
                <h5>Educational Sponsorship</h5>
                        <img
                            className="d-block w-100"
                            src={img3}
                            alt="Second slide"/>
                <br></br>
                <p>We support children in their educational journeys by sponsoring students from primary through tertiary education, ensuring that they have the resources needed to succeed.</p>
            </div>
            <div className="col-md-4">
                <h5>Women's Empowerment Initiatives</h5>
                        <img
                            className="d-block w-100"
                            src={img1}
                            alt="Second slide"/>
                <br></br>
                <p>We empower women by providing funding to start their own businesses, including assistance for purchasing sewing machines for those interested in tailoring. Our goal is to foster entrepreneurship and financial independence among women in our community.</p>
            </div>
        </div>


    </div>
</div>
       
  );
};

export default Home;

