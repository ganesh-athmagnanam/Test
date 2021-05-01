//import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import firebase from '../Firebase/Firebase';
import logo1 from '../department.jpg';
import logo2 from '../radiology.jpg';
import logo3 from '../diagnostics.jpg';
//import {LoadRadiologyDetails} from '../Utility/Utility'
function HospitalDetails() {
    const history = useHistory();
    const [hospitalName, setHospitalName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [itemDetails, setItemDetails] = useState({
        detailValues: [{
            val1: "",
            val2: "",
            val3: "",
            val4: ""
        }]
    });

    useEffect(() => {

        let flag = false;

        //console.log(depratmentsName)
        firebase.database().ref("/hospitalDetails").once('value', items => {
            items.forEach(item => {
                setHospitalName(item.val().name)
                if (item.val().id == localStorage.getItem("JSESSIONID")) {
                    flag = true;
                    return true;
                }
            });
            if (flag) {
            }
            else {
                history.push("/home")
            }
        })
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("JSESSIONID")
        localStorage.removeItem("id")
        window.location.replace("/home");
    }
    const createInputs = () => {
        if (itemDetails.detailValues) {
            return itemDetails.detailValues.map((skill, idx) => {
                return (

                    <tr key={idx}>

                        <td>
                            <input type="text" style={{ width: "93%" }} name="val1" className="form-control" value={skill.val1} onChange={(e) => updateItem1(e, idx)} required />
                        </td>
                        <td>
                            <input type="text" style={{ width: "93%" }} name="val2" className="form-control" value={skill.val2} onChange={(e) => updateItem2(e, idx)} required />
                        </td>
                        <td>
                            <textarea type="text" required style={{ width: "93%" }} className="form-control" value={skill.val3} onChange={(e) => updateItem3(e, idx)} />
                        </td>
                        <td>
                            <input type="text" required style={{ width: "93%" }} className="form-control" value={skill.val4} onChange={(e) => updateItem4(e, idx)} />
                        </td>
                    </tr>

                );
            });
        }
    };
    const saveDepartment = () => {

        let save = true;
        itemDetails.detailValues.forEach(item => {
            if (!item.val1 || !item.val2 || !item.val3 || !item.val4) {
                save = false;
                return true;
            }
        })
        if (save) {
            if (departmentName && departmentName != "CHOOSE") {
                firebase.database().ref("/departmentDetails").child(localStorage.getItem("JSESSIONID")).child(departmentName).remove();
                firebase.database().ref("/departmentDetails").child(localStorage.getItem("JSESSIONID")).child(departmentName).push(
                    itemDetails.detailValues
                )
                alert("!!!Successfully saved!!!")
            }
            else {
                alert("Select the department")
            }

        }
        else {
            alert("All fields are mandatory")
        }


    }
    const saveRadiology = () => {
        let save = true;
        itemDetails.detailValues.forEach(item => {
            if (!item.val1 || !item.val2 || !item.val3 || !item.val4) {
                save = false;
                return true;
            }
        })
        if (save) {

            firebase.database().ref("/radiologyDetails").child(localStorage.getItem("JSESSIONID")).remove();
            firebase.database().ref("/radiologyDetails").child(localStorage.getItem("JSESSIONID")).push(
                itemDetails.detailValues
            )
            alert("!!!Successfully saved!!!")
        }
        else {
            alert("All fields are mandatory")
        }

    }
    const loadDefaultDepatmentDetails = () => {
        setItemDetails({
            detailValues: [{
                val1: "",
                val2: "",
                val3: "",
                val4: ""
            }]

        })
        if (departmentName) {
            firebase.database().ref("/departmentDetails").child(localStorage.getItem("JSESSIONID")).child(departmentName).once('value', items => {
                items.forEach(item => {
                    setItemDetails(() => {
                        return { detailValues: item.val().filter(obj => obj.val1 != "") }
                    })
                })
            })
        }
    }
    const callLoadRadiologyDetails = () => {
        console.log(itemDetails)
        setItemDetails({
            detailValues: [{
                val1: "",
                val2: "",
                val3: "",
                val4: ""
            }]
        })
        firebase.database().ref("/radiologyDetails").child(localStorage.getItem("JSESSIONID")).once('value', items => {
            items.forEach(item => {
                if (item.hasChildren()) {
                    setItemDetails(() => {
                        return { detailValues: item.val().filter(obj => obj.val1 != "") }
                    })
                }
            })
        })
    }
    const saveDiagnostics = () => {
        let save = true;
        itemDetails.detailValues.forEach(item => {
            if (!item.val1 || !item.val2 || !item.val3 || !item.val4) {
                save = false;
                return true;
            }
        })
        if (save) {
            firebase.database().ref("/diagnosticsDetails").child(localStorage.getItem("JSESSIONID")).remove();
            firebase.database().ref("/diagnosticsDetails").child(localStorage.getItem("JSESSIONID")).push(

                itemDetails.detailValues
            )
            alert("!!!Successfully saved!!!")
        }
        else {
            alert("All fields are mandatory")
        }

    }
    const loadDiagnosticsDetails = () => {
        console.log(itemDetails)
        setItemDetails({
            detailValues: [{
                val1: "",
                val2: "",
                val3: "",
                val4: ""
            }]
        })
        firebase.database().ref("/diagnosticsDetails").child(localStorage.getItem("JSESSIONID")).once('value', items => {
            items.forEach(item => {
                if (item.hasChildren()) {
                    setItemDetails(() => {
                        return { detailValues: item.val().filter(obj => obj.val1 != "") }
                    })
                }
            })
        })

    }
    //const handleAddrTypeChange = (e) => console.log((setDepartmentName(e.target.value)))
    const fetchDBValues = (e) => {
        setItemDetails({
            detailValues: [{
                val1: "",
                val2: "",
                val3: "",
                val4: ""
            }]

        })
        let department = e.target.value;
        if (department == 'Other') {
            document.getElementById("otherDepartment").style.display = "inline-block";
        }
        if (department == 'Dermatology' || department == 'Anaesthesiology' || department == 'Dental' || department == 'ENT' || department == 'Gastro Intestinal' ||
            department == 'General Physician' || department == 'Obstetrics and Gynaecology' || department == 'Orthopaedics' || department == 'Paediatrics') {
            document.getElementById("otherDepartment").style.display = "none";
        }
        department = department.toUpperCase()
        setDepartmentName(department)
        if (department && department != "CHOOSE") {


            firebase.database().ref("/departmentDetails").child(localStorage.getItem("JSESSIONID")).child(department).once('value', items => {
                items.forEach(item => {
                    setItemDetails(() => {
                        return { detailValues: item.val().filter(obj => obj.val1 != "") }
                    })
                })
            })
        }

    }

    const addSkill = () => {
        setItemDetails((prevState) => {
            return {
                ...prevState.itemDetails,
                detailValues: [...prevState.detailValues, {
                    val1: "",
                    val2: "",
                    val3: "",
                    val4: ""
                }]
            };
        });
    };
    const updateItem1 = (e, index) => {
        const itemDetailsCopy = { ...itemDetails };
        itemDetailsCopy.detailValues[index].val1 = e.target.value;
        setItemDetails(itemDetailsCopy);

    };
    const updateItem2 = (e, index) => {
        const itemDetailsCopy = { ...itemDetails };
        itemDetailsCopy.detailValues[index].val2 = e.target.value;
        setItemDetails(itemDetailsCopy);
    };
    const updateItem3 = (e, index) => {
        const itemDetailsCopy = { ...itemDetails };
        itemDetailsCopy.detailValues[index].val3 = e.target.value;
        setItemDetails(itemDetailsCopy);
    };
    const updateItem4 = (e, index) => {
        const itemDetailsCopy = { ...itemDetails };
        itemDetailsCopy.detailValues[index].val4 = e.target.value;
        setItemDetails(itemDetailsCopy);
    };
    return (
        <>

            <div className="overview" style={{ display: "block" }}>
                <div className="header">
                    <span style={{ fontSize: "30px" }}>{hospitalName}</span>

                    <div style={{ float: "right", fontSize: "28px", cursor: "pointer", color: "black" }} onClick={logoutHandler}>
                        <li className="fa fa-sign-out"

                        ></li>

                    </div>
                </div>

                <div className="modal fade bd-example-modal-lg" id="department" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="exampleModalLabel">Department Details</h3>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="custom-select" style={{ width: "200px", display: "inline-block", margin: "5px" }}>
                                        <select
                                            onChange={e => fetchDBValues(e)}>

                                            <option value="choose">Choose the Department</option>

                                            <option value="Anaesthesiology">Anaesthesiology</option>
                                            <option value="Dental">Dental</option>
                                            <option value="Dermatology">Dermatology</option>
                                            <option value="ENT">ENT</option>
                                            <option value="Gastro Intestinal">Gastro Intestinal</option>
                                            <option value="General Physician">General Physician</option>
                                            <option value="Obstetrics and Gynaecology">Obstetrics and Gynaecology</option>
                                            <option value="Orthopaedics">Orthopaedics</option>
                                            <option value="Paediatrics">Paediatrics</option>
                                            <option value="Other">Other</option>
                                        </select>

                                    </div>

                                    <input id="otherDepartment" type="text" style={{ display: "none" }}
                                        placeholder="Enter the department name"
                                        onChange={e => fetchDBValues(e)}
                                    />

                                    <div>
                                        <table style={{ width: "100%", border: "border:1px solid #EEEEEE" }}>
                                            <thead className="table-header">
                                                <tr>
                                                    <th>Doctor Name</th>
                                                    <th>Qualification/Experience</th>
                                                    <th>Timings</th>
                                                    <th>Fees</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {createInputs()}
                                            </tbody>
                                        </table>
                                    </div><br />
                                    <button type="button" className="btn btn-primary" onClick={addSkill}>Add</button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveDepartment}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bd-example-modal-lg" id="radiology" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Radiology</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div>
                                        <table style={{ width: "100%", border: "border:1px solid #EEEEEE" }}>
                                            <thead className="table-header">
                                                <tr>
                                                    <th>Scan Name</th>
                                                    <th>Price</th>
                                                    <th>Prerequsite/Timings</th>
                                                    <th>Report Availability</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {createInputs()}
                                            </tbody>
                                        </table>
                                    </div><br />
                                    <button type="button" className="btn btn-primary" onClick={addSkill}>Add</button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveRadiology}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade bd-example-modal-lg" id="diagnostics" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Diagnostics</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div>
                                        <table style={{ width: "100%", border: "border:1px solid #EEEEEE" }}>
                                            <thead className="table-header">
                                                <tr>
                                                    <th>Diagnostic Name</th>
                                                    <th>Price</th>
                                                    <th>Prerequsite/Timings</th>
                                                    <th>Report Availability</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {createInputs()}
                                            </tbody>
                                        </table>
                                    </div><br />
                                    <button type="button" className="btn btn-primary" onClick={addSkill}>Add</button>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={saveDiagnostics}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="container">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="container detailsContainer" style={{ backgroundColor: "#474652", marginTop: "10px" }}>
                                    <div className="card" style={{ width: "400px", display: "inline-block" }}>
                                        <button type="button" data-toggle="modal" data-target="#department" onClick={loadDefaultDepatmentDetails} className="btn btn-outline-primary" style={{ color: "black", float: "right", marginTop: "-5px" }}>
                                            <img className="card-img-top" src={logo1} alt="Card image" style={{ width: "100%", height: "300px" }} /></button>
                                    </div>
                                </div>
                                <div className="carousel-caption" style={{ color: "black", fontWeight: "bolder", textAlign: "center", right: "15%" }}>
                                    <h3>Department</h3>
                                    <p style={{ color: "red" }}>Enroll the doctor and their fees structure</p>
                                </div>
                            </div>



                            <div className="item ">
                                <div className="container detailsContainer" style={{ backgroundColor: "#474652", marginTop: "10px" }}>
                                    <div className="card" style={{ width: "400px", display: "inline-block" }}>
                                        <button type="button" data-toggle="modal" data-target="#radiology" onClick={() => callLoadRadiologyDetails()} className="btn btn-outline-primary" style={{ color: "black", float: "right", marginTop: "-5px" }}>
                                            <img className="card-img-top" src={logo2} alt="Card image" style={{ width: "100%", height: "300px" }} /></button>
                                    </div>
                                </div>
                                <div className="carousel-caption" style={{ color: "red", fontWeight: "bolder", textAlign: "center", right: "15%" }}>
                                    <h3>Radiology</h3>
                                    <p>Add available Scan and price details</p>
                                </div>
                            </div>

                            <div className="item ">
                                <div className="container detailsContainer" style={{ backgroundColor: "#474652", marginTop: "10px" }}>
                                    <div className="card" style={{ width: "400px", display: "inline-block" }}>
                                        <button type="button" data-toggle="modal" data-target="#diagnostics" onClick={loadDiagnosticsDetails} className="btn btn-outline-primary" style={{ color: "black", float: "right", marginTop: "-5px" }}>
                                            <img className="card-img-top" src={logo3} alt="Card image" style={{ width: "100%", height: "300px" }} /></button>
                                    </div>
                                </div>
                                <div className="carousel-caption" style={{ color: "red", fontWeight: "bolder", textAlign: "center", right: "10%" }}>

                                    <p>Add lab tests and its price details</p>
                                </div>
                            </div> </div>
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
                <Link to="/home"><button className="button button2">Home</button></Link>

            </div>

        </>
    )
}
export default HospitalDetails