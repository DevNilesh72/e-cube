import React from 'react'
import { Link } from 'react-router-dom';
function Article(){
    return(
        <>
            <div className = "container">
                <div className="row">
                    <div className="col-md-5">
                        <img src="/images/black-widow.jpg" className="img-responsive" style={{width:"100%"}} alt="Image" />
                    </div>
                    <div className="col-md-7">
                        <h1>Black Widow</h1>
                        <p>Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...Some text here ...</p>

                        <div className="row">
                            <div className="col">
                            <h3>Cast:</h3>
                            <ul>
                                <li>Scarlett Johansson</li>
                                <li>Florence Pugh</li>
                                <li>David Harbour</li>
                                <li>Rachel Weisz</li>
                            </ul>
                            </div>
                            <div className="col">
                            <h3>Reviews:</h3>
                            <dl>
                                <dt>Coffee</dt>
                                <dd>- black hot drink</dd>
                                <dt>Milk</dt>
                                <dd>- white cold drink</dd>
                            </dl>
                            </div>
                        </div>

                        <h3>Book tickets:</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Screen type</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>I-Max</td>
                                    <td>Mumbai</td>
                                    <td>4DX</td>
                                    <td><Link to="/book" className="btn btn-primary">Book</Link></td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>I-Nox</td>
                                    <td>Pune</td>
                                    <td>3D</td>
                                    <td><Link className="btn btn-primary">Book</Link></td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>PVR</td>
                                    <td>Delhi</td>
                                    <td>2D</td>
                                    <td><Link className="btn btn-primary">Book</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Article;