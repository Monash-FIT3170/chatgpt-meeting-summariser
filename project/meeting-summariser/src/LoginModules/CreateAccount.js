import "../styles/create_styles.css"
import React, {useState} from 'react'
import axios from 'axios';
// Define Board component
const CreateAccount = ({onClose}) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    //Functions that change the target vals
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handlePasswordNameChange = (event) => {
        setPassword(event.target.value)
    }

    //user Schema takes inputs from form & creates a new user to then pass into the backend using axios.post
    const handleSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            username: username,
            email: email,
            password: password
        }

        axios.post('http://localhost:5001/users/create', newUser)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

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
                                <input type="text" placeholder="please enter your username" id="usernameForm" 
                                autofocus required onChange={handleUsernameChange}/>
                        </div>
                        <div class="form-item">
                            <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter your email" id="emailForm" 
                                autofocus required onChange={handleEmailChange}/>
                        </div>
                        
                        <div class="form-item">
                            <span class="form-item-icon material-symbols-rounded"></span>
                                <input type="text" placeholder="please enter a password" id="passwordForm" 
                                autofocus required onChange={handlePasswordNameChange}/>
                        </div>                  
                    </form>
                    <button class="submit-button" onClick={handleSubmit}>Create my Account</button>  
                </div>
            </div>
            
        </>
    );
}

export default CreateAccount;

