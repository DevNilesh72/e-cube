import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav';

function Admin(props){
    const [movieList, setmovieList] = useState([]);

    useEffect(() => {
        getMovieList();
    },[]);

    const getMovieList = (e) => {
        if(Object.keys(props.match.params).length != 0){
            console.log(props.match.params.cat);
            
            displayService
            .getMovieByCategory(props.match.params.cat)
            .then(res => {
                setmovieList(res.data);
            })
            .catch(err => {
                alert(err);
            });
        }
    }

    const deleteMovie = (movieId) => {
        console.log(movieId);
        adminService.deleteMovie(movieId)
                    .then(res => {
                        if(res.data.success){
                            alert("Movie deleted successfully");
                            getMovieList();
                        }
                    })
                    .catch(err => {
                        alert(err);
                    })
    }

    return(
        <>
            <div className="container">
                <Nav></Nav>
                <div className="border3"></div>
                <br/>
                <h2>Manage Movies</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Release date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Time slot</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movieList.map((movie,index) => {
                                return(
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td><img className="admn-icon" src={"http://localhost:5000/images/"+movie.thumbnail} />&nbsp;{movie.name}</td>
                                        <td>{new Date(movie.release_date).toDateString()}</td>
                                        <td>
                                            {
                                                movie.category.map((cat,index) => {
                                                    if(!index)
                                                        return cat.name;
                                                    else
                                                        return ", "+cat.name;
                                                })
                                            }
                                        </td>
                                        <td>{movie.time_slot}</td>
                                        <td>
                                            <Link to={"/admin/addMovie/"+movie._id}>
                                                <button type="button" className="btn btn-info">Update</button>
                                            </Link>
                                            <Link to={"/admin/managePrice/"+movie._id}>
                                                <button type="button" className="btn btn-success">Manage price</button>
                                            </Link>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteMovie(movie._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Admin;