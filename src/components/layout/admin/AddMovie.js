import React, { useEffect, useState } from 'react'
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav'

function AddMovie(props){
    const [catList,setCatList] = useState([]);

    const [Mid, setMid] = useState("");
    const [Mname, setMname] = useState("");
    const [Msummary, setMsummary] = useState("");
    const [Mrelease_date, setMrelease_date] = useState("");
    const [Mcategory, setMcategory] = useState([]);
    const [Mtimeslot, setMtimeslot] = useState("");
    const [Mposter, setMposter] = useState(null);
    const [Mthumbnail, setMthumbnail] = useState(null);

    useEffect(() => {
        getCategories();
        if(Object.keys(props.match.params).length != 0){
            setMid(props.match.params.id);
            adminService.editMovie(props.match.params.id)
                        .then(res => {
                            setMname(res.data.name);
                            setMsummary(res.data.summary);
                            setMrelease_date(new Date(res.data.release_date).toLocaleDateString('en-CA'));
                            setMcategory(res.data.category);
                            setMtimeslot(res.data.time_slot);
                            setMposter(res.data.poster);
                            setMthumbnail(res.data.thumbnail);
                        })
                        .catch(err => {
                            alert(err);
                        });
        }
    },[]);

    const handleClickCategory = (selectedItems) => {
        var newMcategory = [];
        for (let i=0; i<selectedItems.length; i++) {
            newMcategory.push(selectedItems[i].value);
        }
        setMcategory(newMcategory);
    }

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
        if(Mid == ""){
            const form = new FormData();
            form.append("name",Mname);
            form.append("summary",Msummary);
            form.append("release_date",Mrelease_date);
            Mcategory.map((item) => {
                form.append("category",item);
            });
            form.append("time_slot",Mtimeslot);
            form.append("poster",Mposter);
            form.append("thumbnail",Mthumbnail);
            
            adminService.addMovie(form)
            .then(res => {
                alert("Added successfullly");
                props.history.push('/admin/movie/index');
            })
            .catch(err => {
                alert(err);
            });
        }
        else{
            adminService.updateMovie(Mid,{
                name: Mname,
                summary: Msummary,
                release_date: Mrelease_date,
                category: Mcategory,
                time_slot: Mtimeslot
            })
            .then(res => {
                alert("Updated successfullly");
                props.history.push('/admin/movie/index');
            })
            .catch(err => {
                alert(err);
            });
        }
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
                                        onChange={(e) => setMsummary(e.target.value)} value={Msummary}></textarea>
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
                                    <select className="form-control" id="category" multiple="true" 
                                           value={Mcategory} onChange={(e) => handleClickCategory(e.target.selectedOptions)}>
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
                                        <option value="6">6 times a day</option>
                                        <option value="5">5 times a day</option>
                                        <option value="4">4 times a day</option>
                                        <option value="3">3 times a day</option>
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <div className="col-sm-3">Poster</div>
                                <div className="col-sm-9">
                                    {
                                        (Mid != "")?<img className="admn-poster" src={"http://localhost:5000/images/"+Mposter} />:<input type="file" className="custom-file-input" id="poster" 
                                        onChange={(e) => setMposter(e.target.files[0])} />
                                    }
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <div className="col-sm-3">Thumbnail</div>
                                <div className="col-sm-9">
                                    {
                                        (Mid != "")?<img className="admn-thumbnail" src={"http://localhost:5000/images/"+Mthumbnail} />:<input type="file" className="custom-file-input" id="thumbnail" 
                                        onChange={(e) => setMthumbnail(e.target.files[0])} />
                                    }
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row">
                                <div className="col-sm-3"></div>
                                <div className="col-sm-9">
                                    <button type="submit" className="btn btn-primary">
                                        {(Mid == "")?"Add":"Update"}
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

export default AddMovie;