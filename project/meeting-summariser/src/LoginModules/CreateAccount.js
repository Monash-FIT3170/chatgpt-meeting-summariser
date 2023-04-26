import React, { Component } from 'react';
import "../styles/create_styles.css"

// Define Board component
const CreateAccount = ({onClose}) => {
    return (
        <>
            <div class="card-container">
                <div class="create-card">
                    <div class="dot">
                        <div class="close-button" onClick={onClose}>x</div>
                    </div>
                    <div class="title">
                        Create Account
                    </div>
                    <form class="create-card-form">
                        <div class="form-item">
                        <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter your email" id="emailForm" 
                                autofocus required/>
                        </div>
                        <div class="form-item">
                        <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter a username" id="usernameForm" 
                                autofocus required/>
                        </div>
                        <div class="form-item">
                        <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter a password" id="passwordForm" 
                                autofocus required/>
                        </div>                  
                    </form>
                    <button class="submit-button">Create my Account</button>  
                </div>
            </div>
            
        </>
    );
}

export default CreateAccount;

