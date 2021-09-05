import React from 'react'

function Booking(props){
    let seat_col = [];
    for(let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++){
        if(String.fromCharCode(i) == "G" || String.fromCharCode(i) == "U"){
            seat_col.push(<div className="seat-col-lbl"></div>);
        }
        seat_col.push(<div className={"seat-col-lbl col-"+String.fromCharCode(i)}>{String.fromCharCode(i)}</div>);
    }

    let seat_row = [];
    for(let i = 1; i < 31; i++){
        if(i == 6 || i == 25){
            seat_row.push(<div className="seat-row-lbl"></div>);
        }
        seat_row.push(<div className="seat-row-lbl">{i}</div>);
    }

    let seat_box = [];
    for (let i = 0;i < 30;i++){
        if(i == 5 || i == 24){
            seat_box.push(<div className="seat-box seat-box-empty"></div>);
        }
        let seat_box_row = [];
        for (let j = 0;j < 26;j++){
            if(j == 6 || j == 20){
                seat_box_row.push(<div className="seat-box-lbl"></div>);
            }
            seat_box_row.push(<div className="seat-box-lbl"><input name={"seat"+i+j} class="form-check-input" type="checkbox" /></div>);
        }
        seat_box.push(<div className="seat-box" title={"Row: "+(i+1)}>{seat_box_row}</div>);
    }

    return(
        <>
            <div className="container">
                <br/>
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
        </>
    );
}

export default Booking;