import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import displayService from '../../services/displayService';
import paymentService from "../../services/paymentService";
import Login from './Login';
import Payment from './Payment';

function Booking(props){
    const [mID,setmID] = useState("");
    const [sID,setsID] = useState("");

    const [Mname, setMname] = useState("");
    const [Mbooking_date, setMbooking_date] = useState("");
    const [Mthumbnail, setMthumbnail] = useState(null);
    const [selected_time, setselected_time] = useState("");
    const [Sname, setSname] = useState("");
    const [Stype, setStype] = useState("");
    const [Slocation, setSlocation] = useState("");
    const [Sprice, setSprice] = useState("");
    const [BookedSeats, setBookedSeats] = useState([]);
    const [TotalSeatBooked, setTotalSeatBooked] = useState([]);
    const [SeatCount, setSeatCount] = useState(0);
    const [TotalAmount, setTotalAmount] = useState(0);

    const [modelPayment, setmodelPayment] = useState(false);
    const [modelLogin, setmodelLogin] = useState(false);

    useEffect(() => {
        if(Object.keys(props.match.params).length != 0){
            let time = props.match.params.time;

            var now = new Date();
            var hr = now.getHours();
            if(hr == "00") {hr = 24}
            var min = now.getMinutes();
            var current = parseInt(hr*3600 + min*60);

            time = time.split(".");
            var this_time = parseInt(time[0]*3600 + time[1]*60);

            if(this_time > current){
                let today = new Date();
                today.setHours(time[0]);
                today.setMinutes(time[1]);
                setselected_time(today.toLocaleTimeString([],{
                    hour: '2-digit',
                    minute: '2-digit'
                }));
            }
            else{
                props.history.push('/article/'+props.match.params.mid);
            }

            setmID(props.match.params.mid);
            getMovieDetails(props.match.params.mid, props.match.params.sid);
        }
    },[])

    const getMovieDetails = (Mid, Sid) => {
        displayService.getMovieBooking(Mid, Sid)
        .then(res => {
            setMname(res.data.name);
            setMthumbnail(res.data.thumbnail);
            setMbooking_date(new Date().toDateString());
            var screen_details = res.data.price_details;
            console.log(screen_details);
            screen_details.map((item,indx) => {
                if(item._id == Sid){
                    setsID(item.screen._id);
                    setSname(item.screen.name);
                    setSlocation(item.screen.location);
                    setStype(item.screen_type);
                    setSprice(item.amount);
                    setBookedSeats(item.tic)
                }
            })
        })
        .catch(err => alert(err));
    }

    const handleSeatSelect = (e,i,j) => {
        var newTotalSeatBooked = [...TotalSeatBooked];
        var newSeatCount = SeatCount;
        if(e.target.checked){
            newTotalSeatBooked.push("seat"+row_lbl[i]+col_lbl[j]);
            newSeatCount++;
        }
        else{
            removeItems(newTotalSeatBooked,"seat"+row_lbl[i]+col_lbl[j]);
            newSeatCount--;
        }
        setSeatCount(newSeatCount)
        setTotalAmount(Sprice*newSeatCount);
        setTotalSeatBooked(newTotalSeatBooked);
    };

    const handleBooking = () => {
        if(props.token == ""){
            setmodelLogin(true);
        }
        else{
            setmodelPayment(true);
        }
    }

    function removeItems(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
    }

    const isSelected = (seat) => {
        return (TotalSeatBooked.indexOf(seat) !== -1)
    }

    const handlePaymentSuccess = (pay_id) => {
        setmodelPayment(false);
        paymentService.bookTickets(sID,{
            user: props.user.id,
            movie: mID,
            payment: pay_id,
            date: Mbooking_date,
            price: TotalAmount,
            screen_type: Stype,
            seat_no: TotalSeatBooked
        })
        .then(res => {
            alert("Payment Successfull");
        })
        .catch(err => {
            alert(err);
        })
        
    }

    var row_lbl = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    var col_lbl = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));

    let seat_col = [];
    for(let i = 0; i < col_lbl.length; i++){
        if(i == 6 || i == 20){
            seat_col.push(<div className="seat-col-lbl"></div>);
        }
        seat_col.push(<div className={"seat-col-lbl col-"+col_lbl[i]}>{col_lbl[i]}</div>);
    }

    let seat_row = [];
    for(let i = 0; i < row_lbl.length; i++){
        if(i == 5 || i == 24){
            seat_row.push(<div className="seat-row-lbl"></div>);
        }
        seat_row.push(<div className="seat-row-lbl">{row_lbl[i]}</div>);
    }

    let seat_box = [];
    for (let i = 0; i < row_lbl.length; i++){
        if(i == 5 || i == 24){
            seat_box.push(<div className="seat-box seat-box-empty"></div>);
        }
        let seat_box_row = [];
        for (let j = 0; j < col_lbl.length; j++){

            if(j == 6 || j == 20){
                seat_box_row.push(<div className="seat-box-lbl"></div>);
            }
            seat_box_row.push(<div className="seat-box-lbl">
                <input name={"seat"+row_lbl[i]+col_lbl[j]} onChange={(e) => handleSeatSelect(e,i,j)} class="form-check-input" checked={isSelected("seat"+row_lbl[i]+col_lbl[j])} type="checkbox" />
            </div>);
        }
        seat_box.push(<div className="seat-box" title={"Row: "+row_lbl[i]}>{seat_box_row}</div>);
    }

    return(
        <>
            <div className="container">
                <br/>
                <div className="book-details">
                    <div className="book-details-items">
                        <img src={"http://localhost:5000/images/"+Mthumbnail} className="book-icon" />
                    </div>
                    <div className="book-details-items">
                        <h4>{Mname}</h4>
                        <p>{Mbooking_date} <br/>
                        {selected_time}</p>
                    </div>
                    <div className="book-details-items">
                        <h4>Venue:</h4>
                        <p>{Sname} | {Stype}<br/>
                        {Slocation}</p>
                    </div>
                    <div className="book-details-items">
                        <button className="btn btn-info book-btn" onClick={handleBooking}>
                            <big><b>Book tickets</b></big>
                            <br/>₹ {Sprice} x {SeatCount} = ₹ {TotalAmount}
                        </button>
                    </div>
                </div>
                <div className="border3"></div>
                <div className="seat-list">
                    <div className="seat-head">
                        <div className="seat-col">
                            <div style={{"width":"60px","height":"50px","float":"left"}}></div>
                            {seat_col}
                        </div>
                    </div>
                    <div className="seat-body">
                        <div className="seat-row">
                            {seat_row}
                        </div>
                        {seat_box}
                    </div>
                </div>
            </div>
            <Payment show={modelPayment} onHide={() => setmodelPayment(false)} paymentSuccess={handlePaymentSuccess} amount={TotalAmount} user={props.user.id}/>
            <Login show={modelLogin} onHide={() => setmodelLogin(false)} />
        </>
    );
}

//component state map to props
const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    };
};

export default connect(mapStateToProps)(Booking);