import React from 'react';
import './Header.css';

function Header(){
    return (
        <div className='header'>
            <b><h1 className="name">Credila</h1></b>
            <div className='header_nav'>
                <b><span className="option">Checking & Savings</span></b>
                <b><span className="option">Credit Cards</span></b>
                <b><span className="option">Transaction</span></b>
            </div>
        </div>
    )
}

export default Header;