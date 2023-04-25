import React, { Component } from 'react';
import "../styles/create_styles.css"
// Define Board component
function CreateAccount () {
    return (
        <>
            <div class="card-container">
                <div class="create-card">
                    <div class="title">
                        Create Account
                    </div>
                    <form class="login-card-form">
                        <div class="form-item">
                        <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter your email" id="emailForm" 
                                autofocus required/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateAccount;

