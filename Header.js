import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

function Header(){
    return (
        <div className='header'>
            <div className="header_row">
                <Link className="link_home" to="/">
                    <b><h1 className="name">Credila</h1></b>
                </Link>
                <div className='header_nav'>
                    <Link className="link_check" to="/Checking">
                        <b><span className="option">Checking & Savings</span></b>
                    </Link>
                    <b><span className="option">Credit Cards</span></b>
                    <b><span className="option">Transaction</span></b>
                </div> 
            </div>         
        </div>
    )
}

export default Header;