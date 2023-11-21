import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {

    const [ loggedState, setLoggedState ] = useState("Login");
    return (
        <div className="flex justify-between border-black shadow-lg h-20">
            <div className="flex">
                <img className="w-35" src={LOGO_URL} />
                <div className="font-sans self-center text-3xl">FoodDash</div>
            </div>
            <div className="flex p-50 items-center mr-7">
                <ul className="flex text-md list-none">
                    <li className="p-2 m-2">
                        <Link style={{textDecoration: 'none', color: 'black'}} to="/">Home</Link>
                    </li>
                    <li className="p-2 m-2">
                        <Link style={{textDecoration: 'none', color: 'black'}} to="/about">About Us</Link>
                    </li>
                    <li className="p-2 m-2">
                        <Link style={{textDecoration: 'none', color: 'black'}} to="/contact">Contact Us</Link>
                    </li>
                    <li className="p-2 m-2">Cart</li>
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