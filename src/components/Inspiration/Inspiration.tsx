import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';

const Inspiration: React.FC = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
            <Container className="mt-5">
            <h1 className="text-center mb-4">Empowering Change: Nafi's Journey to Success</h1>
            <Row>
                <Col md={6} className="d-flex align-items-center">
                    <Image src={img1} fluid rounded className="mb-4" />
                </Col>
                <Col md={6}>
                    <p>
                        Meet Nafi, a determined woman from Northern Nigeria who faced significant challenges in providing for her family.
                        With limited resources and opportunities, she struggled to make ends meet. However, everything changed when she received a sewing machine through our empowerment program.
                    </p>
                    <p>
                        With this new tool, Nafi transformed her passion for sewing into a thriving business. Her exceptional skills and dedication quickly attracted a growing clientele, and her tailoring services became a local favorite. Today, Nafi's hard work has paid off in remarkable ways. Not only has she built a successful business, but she has also achieved her dream of owning a home.
                    </p>
                    <p>
                        Nafi's inspiring journey exemplifies the power of empowerment and the incredible impact it can have on women's lives in our community.
                    </p>
                </Col>
            </Row>
        </Container>
            </div>

             {/* Slideshow for Photos */}
            <div className="container mt-5">
                <Carousel>
                    {/* <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Caption for First Slide</h3>
                            <p>Description of the first photo.</p>
                        </Carousel.Caption>
                    </Carousel.Item> */}
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            // src="/images/IMG_3857.JPG" // Replace with the path to your image
                            src={img2}
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Nafi</h3>
                            <p>Nafi works on a garment</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img3}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Amina, Amarya, and Bridget</h3>
                            <p>Three women we've empowered through our programs.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={img4}
                            alt="Fourth slide"
                        />
                        <Carousel.Caption>
                            <h3>Empowering Communities</h3>
                            <p>Four women we've empowered through our programs.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div>
        
        </div>
    );
};

export default Inspiration;
