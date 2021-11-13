import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import paymentService from "../../services/paymentService";
import { connect } from 'react-redux';

class Payment extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            card_holder: '',
            card_number: '',
            ccv: '',
            expire_date: '',
            amount: this.props.amount
        }
    }

    handlePayment = () => {
        paymentService.makePayment({
            user: this.props.user.id,
            card_holder: this.state.card_holder,
            card_number: this.state.card_number,
            ccv: this.state.ccv,
            expire_date: this.state.expire_date,
            amount: this.state.amount
        })
        .then(res => {
            alert("Payment successfull");
            this.props.paymentSuccess(res.data._id);
        })
        .catch(err => {
            alert(err);
        })
    }

    setcard_holder(e){
        this.setState({
            card_holder: e.target.value
        });
    }

    setcard_number(e){
        this.setState({
            card_number: e.target.value
        });
    }

    setccv(e){
        this.setState({
            ccv: e.target.value
        });
    }

    setexpire_date(e){
        this.setState({
            expire_date: e.target.value
        });
    }

    render() {
        return(
            <>
                <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header>
                        <div className="row model-header">
                            <div className="col-10">
                                <h4>Check out</h4>
                            </div>
                            <div className="col-1">
                                <button className="btn btn-primary" onClick={this.props.onHide}>
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row model-container">
                            <div className="col">
                                <div class="form-group">
                                    <label for="card_holder">Card Holder's Name:</label>
                                    <input type="text" class="form-control" id="card_holder" placeholder="Enter Card Holder's Name" value={this.state.card_holder} onChange={(e) => this.setcard_holder(e)} />
                                </div>
                                <hr/>
                                <div class="form-group">
                                    <label for="card_number">Card number:</label>
                                    <input type="text" class="form-control" id="card_number" placeholder="Enter Card number" value={this.state.card_number} onChange={(e) => this.setcard_number(e)} />
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col">
                                        <div class="form-group">
                                            <label for="ccv">CCV:</label>
                                            <input type="text" class="form-control" id="ccv" placeholder="CCV" value={this.state.ccv} onChange={(e) => this.setccv(e)} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div class="form-group">
                                            <label for="expire_date">Expire Date:</label>
                                            <input type="text" class="form-control" id="expire_date" placeholder="MM / YY" value={this.state.expire_date} onChange={(e) => this.setexpire_date(e)} />
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col">
                                        <button onClick={this.handlePayment} className="btn btn-primary" style={{"width":"100%"}}>Pay ₹ {this.props.amount}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

//component state map to props
const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    };
};

export default connect(mapStateToProps)(Payment);