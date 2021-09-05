import React, { useEffect, useState } from 'react'
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav'

function AddMovie(props){
    const [catList,setCatList] = useState([]);

    const [Mname, setMname] = useState("");
    const [Msummary, setMsummary] = useState("");
    const [Mrelease_date, setMrelease_date] = useState("");
    const [Mcategory, setMcategory] = useState("");
    const [Mtimeslot, setMtimeslot] = useState("");
    const [Mposter, setMposter] = useState(null);
    const [Mthumbnail, setMthumbnail] = useState(null);

    useEffect(() => {
        getCategories();
    },[]);

    const getCategories = (e) => {
        displayService
        .getCategory()
        .then(res => {
            setCatList(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }

    const submitMovie = (e) => {
        e.preventDefault();
        adminService.addMovie({
            name: Mname,
            summary: Msummary,
            release_date: Mrelease_date,
            category: Mcategory,
            poster: Mposter,
            thumbnail: Mthumbnail,
            time_slot: Mtimeslot
        })
        .then(res => {
            alert("Added successfullly");
            props.history.push('/admin/index');
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
                <div className="row justify-content-center">
                    <div className="col-5">
                        <h2>Add new movie</h2>
                        <form enctype="multipart/form-data" onSubmit={submitMovie}>
                            <div className="form-group row">
                                <label for="name" className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                <input type="text" className="form-control" id="name" 
                                        value={Mname} onChange={(e) => setMname(e.target.value)} placeholder="Name" />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="summary" className="col-sm-3 col-form-label">Summary</label>
                                <div className="col-sm-9">
                                <textarea class="form-control" id="summary" placeholder="Summary" rows="3" 
                                        onChange={(e) => setMsummary(e.target.value)}>{Msummary}</textarea>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="release_date" className="col-sm-3 col-form-label">Release date</label>
                                <div className="col-sm-9">
                                <input type="date" className="form-control" id="release_date" 
                                        value={Mrelease_date} placeholder="Release date" 
                                        onChange={(e) => setMrelease_date(e.target.value)} />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="category" className="col-sm-3 col-form-label">Category</label>
                                <div className="col-sm-9">
                                    <select className="form-control" id="category" 
                                            value={Mcategory} onChange={(e) => setMcategory(e.target.value)}>
                                        <option value="">Select category</option>
                                        {
                                            catList.map((item,index) => {
                                                return(
                                                    <option value={item._id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="timeslot" className="col-sm-3 col-form-label">Time slot</label>
                                <div className="col-sm-9">
                                    <select className="form-control" id="timeslot" 
                                            value={Mtimeslot} onChange={(e) => setMtimeslot(e.target.value)}>
                                        <option value="">Select time slot</option>
                                        <option value="5">5 times a day</option>
                                        <option value="4">4 times a day</option>
                                        <option value="3">3 times a day</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="poster" className="col-sm-3 col-form-label">Poster</label>
                                <div className="col-sm-9">
                                    <input type="file" className="custom-file-input" id="poster" 
                                            onChange={(e) => setMposter(e.target.files[0])} />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <label for="thumbnail" className="col-sm-3 col-form-label">Thumbnail</label>
                                <div className="col-sm-9">
                                    <input type="file" className="custom-file-input" id="thumbnail" 
                                            onChange={(e) => setMthumbnail(e.target.files[0])} />
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-primary">Add</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddMovie;