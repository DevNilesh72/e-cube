import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav';

function ManageScreen(){
    const [screens, setScreens] = React.useState([]);

    useEffect(()=>{
        loadsection();
    },[]);

    const loadsection = () => {
        displayService
        .getScreen()
        .then(res => {
            setScreens(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }

    const deleteScreen = (screenId) => {
        if(window.confirm("Do you want to delete this screen?")){
            adminService.deleteScreen(screenId)
                        .then(res => {
                            if(res.data.success){
                                alert("Screen deleted successfully");
                                loadsection();
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
        }
    }

    return(
        <>
            <div className="container">
                <Nav></Nav>
                <div className="border3"></div>
                <br/>
                <h2>Manage Screens</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Location</th>
                            <th scope="col">Screen types</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            screens.map((section,index) => {
                                return(
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{section.name}</td>
                                        <td>{section.location}</td>
                                        <td>{section.screen_type.join()}</td>
                                        <td>{section.capacity}</td>
                                        <td>{section.active.toString()}</td>
                                        <td>
                                            <Link to={"/admin/addScreen/"+section._id}>
                                                <button type="button" className="btn btn-info">Update</button>
                                            </Link>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteScreen(section._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManageScreen;