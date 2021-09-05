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
          <div className="row login-header">
            <div className="col" onClick={() => showLogin(true)}>
              Login
            </div>
            <div className="col" onClick={() => showLogin(false)}>
              Sign up
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {Login ? <LoginDisplay hide_cb={props.onHide} /> : <RegisterDisplay />}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
