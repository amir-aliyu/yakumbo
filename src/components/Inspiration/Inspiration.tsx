import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Carousel } from 'react-bootstrap';

const Inspiration: React.FC = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
            <h1>Our Inspiration</h1>
            <br></br>
            <h2>Meet Nafi: </h2>

             {/* Slideshow for Photos */}
             <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../../public/images/IMG_3856.heic" // Replace with the path to your image
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Caption for First Slide</h3>
                        <p>Description of the first photo.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../../public/images/IMG_3857.JPG" // Replace with the path to your image
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Caption for Second Slide</h3>
                        <p>Description of the second photo.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="../../public/images/IMG_3858.JPG" // Replace with the path to your image
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Caption for Third Slide</h3>
                        <p>Description of the third photo.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            </div>
        
        </div>
    );
};

export default Inspiration;
