import React from 'react';
import './Login.css';

function Login(){
    return(
        <div className='login'>
            <div className='login_container'>
                <h1>Welcome</h1>
                <form>
                    <input type='text' placeholder='Username'/>
                    <input type='password' placeholder='Password'/>
                    <button className='signin' >Sign In</button>
                </form>
            </div>
        </div>
    )

}
export default Login;