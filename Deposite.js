import React from 'react';
import "./Deposite.css"

function Deposite() {
    return (
        <div className="deposite_page">
            <div className="deposite_container">
                <form>
                    <h4>Select the account you would like to deposite:</h4>
                    <input type="text" className="deposit_input_account"></input>
                    <h4 className="bottom_header">Specify the amount you would like to deposite:</h4>
                    <input type="text" className="deposit_input_amount"></input>
                    <button type="submit">Deposite</button>
                </form>
            </div>
        </div>
    ) 
}

export default Deposite;