import React from "react";
import "./Checking.css";
import {Link} from "react-router-dom"
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';

function Checking(){
    return(
        <div className="checking">
            <div className="balance">
                <Link className="link_deposite" to="/seechecking">
                    <div className="checkingnum">
                    <h1 className="cname">Checking Account Number: {localStorage.getItem("checkingAccount")}</h1>
                    </div>
                </Link>
                <Link className="link_deposite" to="/seesaving">
                    <div className="savingnum">
                        <h1 className="sname">Saving Account Number: {localStorage.getItem("savingAccount")}</h1>
                    </div>
                </Link>
            </div>
            {localStorage.getItem("savingAccount") !== "0" && localStorage.getItem("checkingAccount") !== "0" &&
                <div className="transactions">
                <Link className="link_deposite" to="/internal">
                    <div class="deposite_">
                        <CreditCardOutlinedIcon className="dicon"style = {{fontSize: 150}}/>
                        <span className="dname">Internal Transaction</span>
                    </div>
                </Link>
            </div>}
            
            
        </div>
    )
}

export default Checking;