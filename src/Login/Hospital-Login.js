import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import firebase from '../Firebase/Firebase';
function Login(props) {
    const [name, setName] = useState(props.email);
    const [pwd, setPwd] = useState(props.email);
    let history = useHistory();
    const loginCall = (e) => {
        e.preventDefault();
        const ref = firebase.database().ref("/enroll");
        let flag = false;
        ref.once('value', items => {
            items.forEach(item => {
                if (item.val().Email == name
                    && item.val().Password == pwd) {
                    flag = true;
                    props.dispatch({
                        type: 'ADD_NAME',
                        hospitalName: item.val().HospitalName,
                        emailValue:item.val().Email
                    })
                    localStorage.setItem("id", item.val().Email);
                    localStorage.setItem("isLoggedIn", "yes");
                    localStorage.setItem("JSESSIONID", item.val().Id);
                    history.push("/hospitalDetails")
                    
                }
                
            });
            
        })
        //ref.off('value', validate);
    }
    return (
        <div>
            <form className="form-horizontal" onSubmit={e => { loginCall(e) }}>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="id">Official Email</label>
                    <div className="col-sm-6">
                        <input type="email" required className="form-control" id="hospitalId" placeholder="Enter Email id" name="hospitalId"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" htmlFor="pwd">Password</label>
                    <div className="col-sm-6">
                        <input type="password" 
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        required className="form-control" id="pwd" placeholder="Enter password" name="pwd" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-3 col-sm-6">
                        <button type="submit" className="btn btn-default button submit" style={{ backgroundColor: "#e1a7b3" }}>Submit</button>
                    </div>
                </div>
            </form>

            <Link to="/enroll"><button className="button button2">Hospital Enrollment</button></Link>
            <Link to="/hospitalSearch"><button className="button button3">Search for Hospital</button></Link>
            
        </div>
    )
    
}
const mapStateToProps = state => {
    return {
        email: state.email
    }
}
export default connect(mapStateToProps)(Login)
