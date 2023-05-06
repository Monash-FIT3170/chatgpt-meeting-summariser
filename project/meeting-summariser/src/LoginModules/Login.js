import React, { useState } from 'react';
import "../styles/login_styles.css"
import "../styles/create_styles.css"
import CreateAccount from './CreateAccount.js';

// Define Login component
function LoginCanvas (){
        const [PopUp, setPopUp] = useState(false);
        function togglePopUp() {
            if (PopUp) {
                setPopUp(false)
            }
            else {
                setPopUp(true)
            }
        }

        return (
            <>
            <div>
                <div class="page-logo">
                    <img src="../img/logo.png" alt="logo"/>
                </div>
                <div class="login-card-container">
                {PopUp && <CreateAccount onClose={togglePopUp}/>}
                    <div class="login-card">
                        <div class="login-card-title">
                            <h1>Login</h1>
                        </div>
                        <div class="login-card-user">
                            <img src="../img/user.jpg" alt="user"/>
                        </div>
                        <form class="login-card-form">
                            <div class="form-item">
                                <span class="form-item-icon material-symbols-rounded">person</span>
                                <input type="text" placeholder="Enter Username" id="usernameForm" 
                                autofocus required/>
                            </div>
                            <div class="form-item">
                                <span class="form-item-icon material-symbols-rounded">lock</span>
                                <input type="password" placeholder="Enter Password" id="passwordForm"
                                required/>
                            </div>
                            <div class="form-item-other">
                                <div class="checkbox">
                                    <input type="checkbox" id="rememberMeCheckbox" checked/>
                                    <label for="rememberMeCheckbox">Remember me</label>
                                </div>
                                <a href="#">I forgot my password!</a>
                            </div>
                            <button type="submit">Sign In</button>
                        </form>
                        <div class="login-card-footer">
                            Don't have an account? 
                            <button onClick={togglePopUp}>Create an account.</button>
                            
                        </div>
                    </div>
                    <div class="login-card-social">
                        <div>Other Sign-In Options</div>
                        <div class="login-card-social-btns">
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                                </svg>
                            </a>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-google" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
            </>
        );
    }


export default LoginCanvas