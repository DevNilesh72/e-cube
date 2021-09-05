import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <>
        <Container>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                        className="d-block w-100"
                        src="/images/mumbai-saga.webp"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="/images/godzilla-v-kong.jpg"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/images/army-of-the-dead.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className="container-fluid bg-3 text-center">    
                <h3>Some of my Work</h3><br/>
                <Row>
                    <Col sm={3}>
                        <Link className='art-link' to='/article'>
                            <img src="/images/army-of-the-dead.jpg" className="img-responsive" style={{width:"100%"}} alt="Image" />
                            <p>Some text..</p>
                        </Link>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/godzilla-v-kong.jpg" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/mumbai-saga.webp" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/radhe.png" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                </Row>
            </div>
            <br/>
            <div className="container-fluid bg-3 text-center">    
                <Row>
                    <Col sm={3}>
                        <img src="/images/army-of-the-dead.jpg" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/godzilla-v-kong.jpg" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/mumbai-saga.webp" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                    <Col sm={3}>
                        <img src="/images/radhe.png" className="img-responsive" style={{width:"100%"}} alt="Image" />
                        <p>Some text..</p>
                    </Col>
                </Row>
            </div>
        </Container>
        </>
    )
}

export default Landing;
