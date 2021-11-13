import React from "react";
import { LOGOUT } from "../../actions";
import displayService from "../../services/displayService";
import Login from "./Login";
import { connect } from 'react-redux';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow : false,
            headerSec : []
        }
        this.admin = "/";
        if(this.props.admin == "true"){
            this.admin = "/admin/movie/";
        }
    }

    componentDidMount() {
        this.loadsection();
    }

    loadsection() {
        displayService
        .getCategory()
        .then(res => {
            this.setState({
                headerSec : res.data
            });
        })
        .catch(err => {
            alert(err);
        });
    }

    setModalShow = (flag) => {
        this.setState({
            modalShow : flag
        });
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-sm navbar-light header">
                    <div className="container">
                        <a className="navbar-brand text-light" href="/">
                            <img
                                src="/logo.png"
                                alt="icon"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt=""
                            />
                            E-Cube
                        </a>
                        {this.props.token === "" ? (
                            <span
                                className="navbar-text text-light login-btn"
                                style={{ cursor: "pointer" }}
                                onClick={() => this.setModalShow(true)}
                            >
                                Login
                            </span>
                        ) : (
                            <span className="navbar-text">
                                <span className="text-light">Hello! {(this.props.user.name != "" ? this.props.user.name : "")} | </span>
                                <span
                                    className="text-light"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => this.props.logoutUser()}
                                >
                                    Logout
                                </span>
                            </span>
                        )}
                    </div>
                </nav>
                <div className="container">
                    <ul className="sec-nav">
                        {
                            this.state.headerSec.map((section) => {
                                return(
                                    <li>
                                        <a href={this.admin+section.src}>{section.name}</a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {/* <ul className="sec-nav-right">
                        <li>
                            <a>My order</a>
                        </li>
                    </ul> */}
                </div>
                <div className="border4"></div>
                <Login show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
            </>
        );
    }
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
        logoutUser: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({ type: LOGOUT, value: "" });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
