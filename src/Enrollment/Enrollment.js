
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase/Firebase';
import { connect } from "react-redux";
import uuid from 'react-uuid'
function Enroll(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pin, setPin] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const closePopup = () => {
        document.getElementById("closeNegative").style.display = "none";
        document.getElementById("closePositive").style.display = "none";
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(pin)
        console.log(email)
        const uuidValue=uuid();
        props.dispatch({
            type: 'ADD_EMAIL',
            email: email
        })

        
        let flag = false;
        const ref = firebase.database().ref("/enroll");
        const refhospitalInfo=firebase.database().ref("/hospitalDetails")
        const refdepartmentInfo=firebase.database().ref("/departmentDetails")
        const refRadiologyInfo=firebase.database().ref("/radiologyDetails")
        const refDiagnosticsInfo=firebase.database().ref("/diagnosticsDetails")
        ref.once('value', items => {
            items.forEach(item => {
                if (item.val().Email == email
                    ||
                    (item.val().Pincode == pin && item.val().HospitalName == name)) {
                    flag = true;
                }
            });

            if (!flag) {
                refhospitalInfo.push({
                    "id":uuidValue,
                    "name":name
                })
                //refdepartmentInfo.child(uuidValue).child(name).set("Approved")
                //refRadiologyInfo.child(uuidValue).child(name).set("Approved")
                //refDiagnosticsInfo.child(uuidValue).child(name).set("Approved")
                firebase.database().ref("/enroll").push({
                    "HospitalName": name,
                    "Address": address,
                    "Pincode": pin,
                    "Email": email,
                    "Password": pwd,
                    "Id":uuidValue
                    
                })
                setName("");
                setAddress("");
                setEmail("");
                setPwd("");
                setPin("");
                document.getElementById("closeNegative").style.display = "none";
                document.getElementById("closePositive").style.display = "block";
            }
            else {
                document.getElementById("closePositive").style.display = "none";
                document.getElementById("closeNegative").style.display = "block";
            }
        });

    }

    return (
        <div>

            <form className="form-horizontal" onSubmit={e => { handleSubmit(e) }}>

                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="name">Hospital Name</label>
                    <div className="col-sm-6">

                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="form-control" id="hospitalName" placeholder="Enter hospital name" name="firstName"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="address">Address</label>
                    <div className="col-sm-6">
                        <input type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required className="form-control" id="address" placeholder="Enter the full address" name="address" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="city">Pincode</label>
                    <div className="col-sm-6">
                        <input type="text"
                            value={pin}
                            onChange={e => setPin(e.target.value)}
                            required className="form-control" id="city" placeholder="Enter the pincode" name="pincode" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="id">Official Email</label>
                    <div className="col-sm-6">
                        <input type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required className="form-control" id="hospitalId" placeholder="Enter email id" name="hospitalId" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Set Password</label>
                    <div className="col-sm-6">
                        <input type="password"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                            required className="form-control" id="pwd" placeholder="Set the password for login" name="pwd" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-6">
                        <button type="submit" className="btn btn-default button submit " style={{ backgroundColor: "#e1a7b3" }}>Submit</button>
                    </div>
                </div>
            </form>
            <Link to="/hospitalLogin"><button className="button button2">Hospital Login</button></Link>
            <Link to="/hospitalSearch"><button className="button button3">Search for Hospital</button></Link>
            <div className="alert" id="closeNegative">
                <span className="closebtn" onClick={closePopup}>&times;</span>
                <strong>Error!</strong> Hospital has been enrolled already.
            </div>
            <div className="alert success" id="closePositive">
                <span className="closebtn" onClick={closePopup}>&times;</span>
                <strong>Congrats!</strong> Hospital is enrolled successfully.
                    </div>
        </div>
    )


}
const mapStateToProps = state => {
    return {
        email: state.email
    }
}
export default connect(mapStateToProps)(Enroll)