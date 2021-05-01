import { Link } from 'react-router-dom';
const LandingPage = () => {
    return (
        <div>
            
            <Link to="/enroll"><button className="corner-button"><span >Hospital Enrollment</span></button></Link>
            <Link to="/hospitalLogin"><button className="corner-button" style={{marginLeft:"15px"}}><span >Hospital Login</span></button></Link><br />
            <Link to="/hospitalSearch"><button className="corner-button" style={{marginTop:"15px"}}><span >Search for Hospital</span></button></Link>
        </div>
    )
}
export default LandingPage;