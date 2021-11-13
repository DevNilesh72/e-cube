import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import displayService from '../../services/displayService';
function Article(props) {
    const [catList,setCatList] = useState([]);
    const [Screen, setScreen] = useState([]);
    
    const [Mid, setMid] = useState("");
    const [Mname, setMname] = useState("");
    const [Msummary, setMsummary] = useState("");
    const [Mrelease_date, setMrelease_date] = useState("");
    const [Mcategory, setMcategory] = useState([]);
    const [Mposter, setMposter] = useState(null);
    const [Mtime_slot, setMtime_slot] = useState([]);
    const [Time_slots, setTime_slots] = useState({
        "6":["8.00","10.30","13.00","15.30","18.00","20.30"],
        "5":["8.30","11.30","14.30","17.30","23.00"],
        "4":["9.00","12.00","15.00","18.30"],
        "3":["10.00","14.00","17.00"]
    });
    const [selected_time, setselected_time] = useState("");

    useEffect(() => {
        getCategories();
        if(Object.keys(props.match.params).length != 0){
            setMid(props.match.params.id);
            displayService
            .getOneMovie(props.match.params.id)
            .then(res => {
                setMname(res.data.name);
                setMsummary(res.data.summary);
                setMrelease_date(new Date(res.data.release_date).toDateString());
                setMcategory(res.data.category);
                setMposter(res.data.poster);
                setScreen(res.data.price_details);

                var total_time = Time_slots[res.data.time_slot];
                var available_time = [];
                var now = new Date();
                var hr = now.getHours();
                if(hr == "00") {hr = 24}
                var min = now.getMinutes();
                var current = parseInt(hr*3600 + min*60);
                for(let i = 0; i < total_time.length; i++){
                    let time = total_time[i];
                    time = time.split(".");
                    time = parseInt(time[0]*3600 + time[1]*60);
                    if(time > current){
                        available_time.push(total_time[i]);
                    }
                }
                setMtime_slot(available_time);
            })
            .catch(err => {
                alert(err)
            })
        }
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

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <img src={"http://localhost:5000/images/"+Mposter} className="img-responsive" style={{ width: "100%" }} alt="Image" />
                    </div>
                    <div className="col-md-7">
                        <h1>{Mname}</h1>
                        <p>{Msummary}</p>
                        Release date: <small>{Mrelease_date}</small>

                        <div className="row">
                            <div className="col">
                                <h3>Category:</h3>
                                <p>
                                    {
                                        Mcategory.map((cat,index) => {
                                            if(!index)
                                                return cat.name;
                                            else
                                                return ", "+cat.name;
                                        })
                                    }
                                </p>
                            </div>
                        </div>

                        <h3>Book tickets:</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Screen type</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Screen.map((item,index) => {
                                        return(
                                            <>
                                                <tr>
                                                    <th>{index+1}</th>
                                                    <td>{item.screen.name}</td>
                                                    <td>{item.screen.location}</td>
                                                    <td>{item.screen_type}</td>
                                                    <td>₹ {item.amount}</td>
                                                    <td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Time: </td>
                                                    <td colSpan="4">
                                                    <div className="row">
                                                        {
                                                            Mtime_slot.map((time,indx) => {
                                                                let dtime = time.split(".");
                                                                let today = new Date();
                                                                today.setHours(dtime[0]);
                                                                today.setMinutes(dtime[1]);
                                                                var display_time = today.toLocaleTimeString([],{
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                                return(
                                                                    <div className="col">
                                                                        <Link className='art-link' to={'/book/'+item._id+'/'+Mid+'/'+time}>
                                                                            <span className="text-primary">{display_time}</span>
                                                                        </Link>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article;