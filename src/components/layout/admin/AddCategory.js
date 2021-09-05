import React, { useEffect, useState } from "react";
import adminService from "../../../services/adminService";
import Nav from "./Nav";

function AddCategory(props) {
    const [catName, setcatName] = React.useState("");
    const [catSrc, setcatSrc] = React.useState("");
    const [catId, setcatId] = React.useState("");
    
    useEffect(() => {
        if(Object.keys(props.match.params).length != 0){
            setcatId(props.match.params.id);
            adminService.editCategory(props.match.params.id)
                        .then(CatObj => {
                            console.log(CatObj.data);
                            setcatName(CatObj.data.name);
                            setcatSrc(CatObj.data.src);
                        })
                        .catch(err => {
                            alert(err);
                        })
        }
    },[]);

    const categorySubmit = (e) => {
        e.preventDefault();
        if(catId != ""){
            adminService.updateCategory(catId,{
                name: catName,
                src: catSrc
            })
            .then(res => {
                alert("Updated successfully");
                props.history.push('/admin/manageCategory')
            })
            .catch(err => {
                alert(err);
            });
        }
        else{
            adminService.addCategory({
                name: catName,
                src: catSrc
            })
            .then(res => {
                alert("Added successfully");
                props.history.push('/admin/manageCategory')
            })
            .catch(err => {
                alert(err);
            });
        }
    }

    return (
        <>
            <div className="container">
                <Nav></Nav>
                <div className="border3"></div>
                <br />
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2>Add new category</h2>
                        <form onSubmit={categorySubmit}>
                            <div className="form-group row">
                                <label for="name" className="col-sm-3 col-form-label">
                                    Name
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        value = {catName}
                                        onChange={(e) => {
                                            setcatName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="name" className="col-sm-3 col-form-label">
                                    Src
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="src"
                                        placeholder="Src"
                                        value = {catSrc}
                                        onChange={(e) => {
                                            setcatSrc(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="form-group row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-primary">
                                        {(catId == "")? "Add" : "Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCategory;
