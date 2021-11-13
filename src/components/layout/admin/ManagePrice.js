import React, { useEffect, useState } from 'react'
import adminService from '../../../services/adminService';
import displayService from '../../../services/displayService';
import Nav from './Nav';

function ManagePrice(props){
    const [movie_id, setmovie_id] = React.useState("");
    const [Screens, setScreens] = React.useState([]);
    const [Price_detail, setPrice_detail] = React.useState([]);
    const [Screen_type_selected, setScreen_type_selected] = React.useState([]);

    useEffect(()=>{
        if(Price_detail.length == 0){
            getScreen();
            if(Object.keys(props.match.params).length != 0){
                setmovie_id(props.match.params.id);
                getPriceDetails(props.match.params.id);
            }
        }
    });

    const getScreen = () => {
        displayService
        .getScreen()
        .then(res => {
            setScreens(res.data);
        })
        .catch(err => {
            alert(err);
        })
    }

    const handleClickScreen = (selectedItem) => {
        let selected = Screens[selectedItem[0].value].screen_type;
        let screen_type_options = [];
        selected.map((item) => {
            screen_type_options.push(<option value={item}>{item}</option>);
        })
        setScreen_type_selected(screen_type_options);
    }

    const handleClickType = (selectedItem) => {
        document.getElementById("add_price").style.display = "block";
    }

    const getPriceDetails = (Mid) => {
        displayService
        .getMovieScreen(Mid)
        .then(res => {
            setPrice_detail(res.data.price_details);
        })
        .catch(err => {
            alert(err)
        })
    }

    const handleAddDetails = (e) => {
        let selected_screen = document.getElementById("screen").value;
        let screen_id = Screens[selected_screen]._id;
        let screen_type = document.getElementById("screen_type").value;
        let amount = document.getElementById("price").value;
        let active = document.getElementById("active").checked;

        adminService.addMoviePrice(movie_id,{
            screen_id: screen_id,
            screen_type: screen_type,
            amount: amount,
            active: active
        })
        .then(res => {
            alert("updated successfully");
            document.getElementById("price").value = "";
            document.getElementById("active").checked = "";
            document.getElementById("screen_type").value = "";
            document.getElementById("screen").value = "";
            document.getElementById("add_price").style.display = "none";
        })
        .catch(err => {
            alert(err)
        })
    }

    const handleEditAmount = (indx) => {
        let newPrice = Price_detail;
        newPrice[indx].amount = document.getElementById("amount_val_"+Price_detail[indx]._id).value;
        setPrice_detail(newPrice);
    }

    const handleEditActive = (indx) => {
        let newPrice = Price_detail;
        newPrice[indx].active = document.getElementById("active_val_"+Price_detail[indx]._id).checked;
        setPrice_detail(newPrice);
    }

    const handleUpdate = (indx) => {
        const upPrice = {}
        upPrice.price_id = Price_detail[indx]._id;
        upPrice.screen_id = Price_detail[indx].screen._id;
        upPrice.screen_type = Price_detail[indx].screen_type;
        upPrice.amount = Price_detail[indx].amount;
        upPrice.active = Price_detail[indx].active;

        adminService.updateMoviePrice(movie_id,upPrice)
        .then(res => {
            alert("Updated successfully");
            console.log(res.data);
            getPriceDetails(props.match.params.id);
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
                <h2>Manage Price</h2>
                <table className="table w-50">
                    <td>
                        Screen:<br/>
                        <select className="form-control" id="screen" 
                                onChange={(e) => handleClickScreen(e.target.selectedOptions)}>
                                <option>Select Screen</option>
                            {
                                Screens.map((item,indx) => {
                                    return(
                                        <option value={indx}>{item.name}</option>
                                    )
                                })
                            }
                        </select>
                    </td>
                    <td>
                        Screen type: <br/>
                        <select className="form-control" id="screen_type" 
                                onChange={(e) => handleClickType(e.target.selectedOptions)}>
                            <option>Select screen type</option>
                            {Screen_type_selected}
                        </select>
                    </td>
                </table>
                <div id="add_price" style={{"display":"none"}} >
                    <div className="form-group row">
                        <label for="price" className="col-sm-1 col-form-label">
                            Amount:
                        </label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="Price" id="price" />
                        </div>
                    </div>
                    <br/>
                    <div className="form-group row">
                        <label for="active" className="col-sm-1 col-form-label">
                            Active:
                        </label>
                        <div className="col-sm-2">
                            <input type="checkbox" className="form-check-input" id="active" />
                        </div>
                        <div className="col-sm-2">
                            <button type="button" className="btn btn-info" onClick={(e) => handleAddDetails(e)}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border3"></div>
                <br/>
                <table className="table w-50">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Screen</th>
                            <th scope="col">Type</th>
                            <th scope="col">Price</th>
                            <th scope="col">Active</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Price_detail.map((section,indx) => {
                                return(
                                    <tr id={section._id}>
                                        <td>{indx+1}</td>
                                        <td id={"name_"+section._id}>{section.screen.name}</td>
                                        <td id={"screen_type_"+section._id}>{section.screen_type}</td>
                                        <td id={"amount_"+section._id}>
                                            <input type="text" value={section.amount} id={"amount_val_"+section._id} onChange={() => handleEditAmount(indx)} />
                                        </td>
                                        <td id={"active_"+section._id}>
                                            <input type="checkbox" checked={section.active} id={"active_val_"+section._id} onChange={() => handleEditActive(indx)} />
                                        </td>
                                        <td id={"btn_"+section._id}>
                                            <button type="button" className="btn btn-primary"
                                                    onClick={() => handleUpdate(indx)}>
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManagePrice;