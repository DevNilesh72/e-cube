import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoginDisplay from "./LoginDisplay";
import RegisterDisplay from "./RegisterDisplay";

function Login(props) {
  const [Login, showLogin] = React.useState(true);

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <div className="row model-header">
            <div className="col-5" onClick={() => showLogin(true)}>
              Login
            </div>
            <div className="col-5" onClick={() => showLogin(false)}>
              Sign up
            </div>
            <div className="col-1">
              <button className="btn btn-primary" onClick={props.onHide}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {Login ? <LoginDisplay hide_cb={props.onHide} /> : <RegisterDisplay />}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
