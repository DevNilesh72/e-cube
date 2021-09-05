import React, { useState } from "react";
import registerService from "../../services/registerService";

const RegisterDisplay = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const RegisterSubmit = (e) => {
        e.preventDefault();
        registerService.register({
            name: name,
            email: email,
            password: password
        })
        .then(res => {
            alert("success");
        })
        .catch(err => {
            alert("failed");
        });
    }

    return (
        <>
            <div className="row login-container">
                <form onSubmit={RegisterSubmit}>
                    <div className="form-group row">
                        <label for="inputName" className="col-3 col-form-label">
                            Name
                        </label>
                        <div className="col-9">
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                placeholder="Name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <label for="inputEmail" className="col-3 col-form-label">
                            Email
                        </label>
                        <div className="col-9">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <label for="inputPassword" className="col-3 col-form-label">
                            Password
                        </label>
                        <div className="col-9">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    <div className="form-group row">
                        <div className="col-3"></div>
                        <div className="col-9">
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="Sign up"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterDisplay;