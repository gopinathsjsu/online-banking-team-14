import React from "react";
import "./Checking.css";
import {Link} from "react-router-dom"
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';

function Checking(){
    return(
        <div className="checking">
            <div className="balance">
                <div className="checking_account">
                    <h1 className="cname">Checking Balance:</h1>
                    <h1 className="camount">$500</h1>
                </div>
                <div className="saving_account">
                    <h1 className="sname">Saving Balance:</h1>
                    <h1 className="samount">$500</h1>
                </div>
            </div>
            <div className="transactions">
                <Link className="link_deposite" to="/deposite">
                    <div class="deposite_">
                        <CreditCardOutlinedIcon className="dicon"style = {{fontSize: 150}}/>
                        <span className="dname">Deposite</span>
                    </div>
                </Link>
                <Link className="link_withdraw" to="/withdraw">
                    <div className="withdraw">
                        <ReceiptOutlinedIcon className="wicon" style = {{fontSize: 150}}/>
                        <span className="wname">Withdraw</span>
                    </div>
                </Link>
            </div>
            
        </div>
    )
}

export default Checking;