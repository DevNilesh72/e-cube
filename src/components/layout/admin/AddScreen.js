import React, { useEffect, useState } from "react";
import adminService from "../../../services/adminService";
import Nav from "./Nav";

function AddScreen(props) {
  const [Sid, setSid] = React.useState("");
  const [Sname, setSname] = React.useState("");
  const [Slocation, setSlocation] = React.useState("");
  const [Stype, setStype] = React.useState([]);
  const [Scapacity, setScapacity] = React.useState(3);
  const [Sactive, setSactive] = React.useState(true);

  useEffect(() => {
    if(Object.keys(props.match.params).length != 0){
      setSid(props.match.params.id);
      adminService.editScreen(props.match.params.id)
                  .then(res => {
                    setSname(res.data.name);
                    setSlocation(res.data.location);
                    setStype(res.data.screen_type);
                    setScapacity(res.data.capacity);
                    setSactive(res.data.active);
                  })
                  .catch(err => {
                    alert(err);
                  })
    }
  },[]);

  const handleClickActive = () => setSactive(!Sactive);

  const isChecked = (e) => (Stype.indexOf(e) != -1);

  const handleClickType = (e) => {
    var newType = [...Stype];
    if(e.target.checked){
      newType.push(e.target.value);
    }
    else{
      removeItems(newType,e.target.value);
    }
    
    setStype(newType);
  }

  function removeItems(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const screenSubmit = (e) => {
    e.preventDefault();
    if(Sid != ""){
      console.log(Sid);
      adminService.updateScreen(Sid,{
        name: Sname,
        location: Slocation,
        screen_type: Stype,
        capacity: Scapacity,
        active: Sactive
      })
      .then(res => {
        alert("Updated successfully");
        props.history.push('/admin/manageScreen');
      })
      .catch(err => {
        alert(err);
      })
    }
    else{
      adminService.addScreen({
        name: Sname,
        location: Slocation,
        screen_type: Stype,
        capacity: Scapacity,
        active: Sactive
      })
      .then(res => {
        alert("Added successfullly");
        props.history.push('/admin/manageScreen');
      })
      .catch(err => {
        alert(err);
      })
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
            <h2>Add new screen</h2>
            <form onSubmit={screenSubmit}>
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
                    value={Sname}
                    onChange={(e) => {
                      setSname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label for="location" className="col-sm-3 col-form-label">
                  Location
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    placeholder="Location"
                    value={Slocation}
                    onChange={(e) => {
                      setSlocation(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label for="screen_type" className="col-sm-3 col-form-label">
                  Screen type
                </label>
                <div className="col-sm-9">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="2D"
                      value="2D"
                      checked={isChecked("2D")}
                      onChange={handleClickType}
                    />
                    <label class="form-check-label" for="2D">
                      2D
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="3D"
                      value="3D"
                      checked={isChecked("3D")}
                      onChange={handleClickType}
                    />
                    <label class="form-check-label" for="3D">
                      3D
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="4DX"
                      value="4DX"
                      checked={isChecked("4DX")}
                      onChange={handleClickType}
                    />
                    <label class="form-check-label" for="4DX">
                      4DX
                    </label>
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label for="capacity" className="col-sm-3 col-form-label">
                  Capacity
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="capacity"
                    placeholder="Capacity"
                    value={Scapacity}
                    onChange={(e) => {
                      setScapacity(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <div className="form-group row">
                <label for="active" className="col-sm-3 col-form-label">
                  Active
                </label>
                <div className="col-sm-9">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="active"
                      value="active"
                      checked = {Sactive}
                      onChange={handleClickActive}
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="form-group row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    {(Sid == "")?"Add":"Update"}
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

export default AddScreen;
