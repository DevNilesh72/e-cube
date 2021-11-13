import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';
import displayService from '../../services/displayService'
const Landing = (props) => {
    const [MovieList,setmovieList] = useState([]);

    useEffect(() => {
        getMovieList();
    },[]);

    const getMovieList = (e) => {
        var cat = "index";
        if(Object.keys(props.match.params).length != 0){
            cat = props.match.params.cat;
        }
        displayService
        .getMovieByCategory(cat)
        .then(res => {
            setmovieList(res.data);
        })
        .catch(err => {
            alert(err);
        });
    }

    return (
        <>
        <Container>
            <Carousel>
                {
                    MovieList.map((movie,index) => {
                        return(
                            <Carousel.Item interval={1000}>
                                <img
                                    className="d-block w-100"
                                    src={"http://localhost:5000/images/"+movie.thumbnail}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{movie.name}</h3>
                                    <p>{movie.summary}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <div className="container-fluid bg-3 text-center">    
                <br/><h3>Book tickets here</h3><br/>
                <Row>
                {
                    MovieList.map((movie,index) => {
                        return(
                            <Col sm={3}>
                                <Link className='art-link' to={'/article/'+movie._id}>
                                    <img src={"http://localhost:5000/images/"+movie.thumbnail} className="img-responsive" style={{width:"100%"}} alt="Image" />
                                    <p>{movie.name}</p>
                                </Link>
                            </Col>
                        )
                    })
                }
                </Row>
            </div>
        </Container>
        </>
    )
}

export default Landing;
