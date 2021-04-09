import React from 'react';
import './Footer.css';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

function Footer() {

    return (
        <div className='footer'>
            <h1>Choose what's right for you</h1>
            <div class='icons'>
                <BusinessCenterIcon className='bus' style = {{fontSize: 60}}/>
                <CreditCardIcon className='card' style = {{fontSize: 60}}/>
                <AccountBalanceWalletIcon className='wallet' style = {{fontSize: 60}}/>
                <AccountBalanceIcon className='balance' style = {{fontSize: 60}}/>
            </div>
            
        </div>
    )
}


export default Footer;