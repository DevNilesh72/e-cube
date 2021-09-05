import React from 'react'
import { Link } from 'react-router-dom';
function Nav(){
    return(
        <>
            <div className="nav-admin">
                <Link to="/admin/addMovie">
                    <div className="nav-items">
                        <i className="fas fa-film fa-3x"></i><br/>
                        Add movie
                    </div>
                </Link>
                <Link to="/admin/addScreen">
                    <div className="nav-items">
                        <i className="fas fa-video fa-3x"></i><br/>
                        <a>Add screen</a>
                    </div>
                </Link>
                <Link to="/admin/addCategory">
                    <div className="nav-items">
                        <i className="fas fa-folder-plus fa-3x"></i><br/>
                        <a>Add category</a>
                    </div>
                </Link>
                <Link to="/admin/manageScreen">
                    <div className="nav-items">
                    <i className="fas fa-desktop fa-3x"></i><br/>
                        <a>Manage Screen</a>
                    </div>
                </Link>
                <Link to="/admin/manageCategory">
                    <div className="nav-items">
                    <i className="fas fa-folder-open fa-3x"></i><br/>
                        <a>Manage category</a>
                    </div>
                </Link>
                <Link to="/admin/manageUser">
                    <div className="nav-items">
                        <i className="fas fa-users fa-3x"></i><br/>
                        <a>Manage users</a>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Nav;