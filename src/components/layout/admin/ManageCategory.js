import React from 'react'
import { Link } from 'react-router-dom';
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav';

class ManageCategory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cat : []
        }
    }

    componentDidMount() {
        this.loadsection();
    }

    loadsection() {
        displayService
        .getCategory()
        .then(res => {
            this.setState({
                cat : res.data
            });
        })
        .catch(err => {
            alert(err);
        });
    }

    deleteCategory(CatId) {
        console.log(CatId);
        if(window.confirm("Do you want to delete this category?")){
            adminService.deleteCategory(CatId)
                        .then(res => {
                            if(res.data.success){
                                alert("Category deleted successfully");
                                this.loadsection();
                            }
                        })
                        .catch(err => {
                            alert(err);
                        })
        }
        
    }

    render(){
        return(
            <>
                <div className="container">
                    <Nav></Nav>
                    <div className="border3"></div>
                    <br/>
                    <h2>Manage Category</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Src</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cat.map((section,index) => {
                                    return(
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{section.name}</td>
                                            <td>{section.src}</td>
                                            <td>
                                                <Link to={"addCategory/"+section._id}>
                                                    <button type="button" className="btn btn-info">Update</button>
                                                </Link>
                                                <button type="button" className="btn btn-danger" onClick={() => this.deleteCategory(section._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default ManageCategory;