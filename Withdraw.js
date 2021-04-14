import React from 'react';
import "./Withdraw.css"

function Withdraw() {
    return (
        <div className="withdraw_page">
            <div className="withdraw_container">
                <form>
                    <h4>Select the account you would like to deposite:</h4>
                    <input type="text" className="withdraw_input_account"></input>
                    <h4 className="wbottom_header">Specify the amount you would like to deposite:</h4>
                    <input type="text" className="withdraw_input_amount"></input>
                    <button type="submit">Withdraw</button>
                </form>
            </div>
        </div>
    )
}

export default Withdraw;