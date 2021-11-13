import React, { useState } from "react";
import loginService from "../../services/loginService";
import { LOGIN } from "../../actions";
import { connect } from 'react-redux';

const LoginDisplay = (props) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const LoginSubmit = (e) => {
        e.preventDefault();
        loginService.login({
            email: email,
            password: password
        })
        .then(res => {
            var token = res.data.token;
            
            localStorage.setItem("token",token);
            loginService.current(token)
                .then(res1 => {
                    var user = res1.data;
                    localStorage.setItem("user",JSON.stringify(user));
                    props.loginUser(token,user);
                })
                .catch(err => alert(err))
            alert("Login succesfull");
            props.hide_cb();
        })
        .catch(err => {
            alert(err);
        });
    }

    return (
        <>
            <div className="row model-container">
                <form onSubmit={LoginSubmit}>
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
                        <label for="inputPassword3" className="col-3 col-form-label">
                            Password
                        </label>
                        <div className="col-9">
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword3"
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
                            <input type="submit" className="btn btn-primary" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};


//component state map to props
const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (Ntoken,Nuser) => dispatch({ type: LOGIN, value: {token:Ntoken,user:Nuser} })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginDisplay);