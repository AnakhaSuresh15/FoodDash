import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {

    const [ loggedState, setLoggedState ] = useState("Login");
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} />
                <div className="logo-name">FoodDash</div>
            </div>
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/about">Contact Us</Link>
                    </li>
                    <li>Cart</li>
                </ul>
                <button className="loggedbtn" 
                    onClick={() => {
                        loggedState === 'Login' ? setLoggedState("Logout") : setLoggedState("Login");
                    }}
                >{ loggedState }</button>
            </div>
        </div>
    );
}

export default Header;