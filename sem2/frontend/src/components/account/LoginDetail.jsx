import styles from './Account.module.css';
import React, { useState, useEffect, useRef } from 'react';

import CreateAccount from './CreateAccount';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Google, Facebook, GitHub } from '@mui/icons-material';

import GoogleLoginComponent from './alt_login/GoogleMUILogin';

function LoginDetail() {
    const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);

    const handleCreateAccountClick = () => {
        setIsCreateAccountOpen(true);
    };

    const handleCloseModal = () => {
        console.log("Closing create account modal");
        setIsCreateAccountOpen(false);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //Functions that change the target vals
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const user = {
            username: username,
            password: password,
        };

        console.log(user);
    }


    return (
        <>
            {!isCreateAccountOpen && (
                <div className={styles.login_box} id="login_box">
                    <div className={styles.logo_container}>
                        <img className={styles.logo} src='../../img/logo.png' alt='Minute Mind'></img>
                    </div>
                    <h2>Login</h2>
                    <form>
                        <div className={styles.user_box}>
                            <span className={`form-item-icon material-symbols-rounded ${styles.icon}`}>
                                <PersonIcon />
                            </span>
                            <input type="text" placeholder="Username" onChange={handleUsernameChange}>
                            </input>
                        </div>
                        <div className={styles.user_box}>
                            <span className={`form-item-icon material-symbols-rounded ${styles.icon}`}>
                                <LockIcon />
                            </span>
                            <input type="password" placeholder="Password" onChange={handlePasswordChange}>
                            </input>
                        </div>
                        <a className={styles.submit} onClick={handleSubmit}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Login
                        </a>
                    </form>
                    <hr className={styles.hr_colour}></hr>
                    <span className={styles.alt_login}>
                        <a href='#' id='g_id_onload' className={styles.alt_login_icon}>
                            <GoogleLoginComponent />
                        </a>
                        <a href='#' className={styles.alt_login_icon}>
                            <Facebook />
                        </a>
                        <a href='#' className={styles.alt_login_icon}>
                            <GitHub />
                        </a>
                    </span>
                    <span className={styles.create_account_span}>
                    <a className={styles.create_account} onClick={() => setIsCreateAccountOpen(true)}>Create Account</a>
                    </span>
                </div>)}
            {isCreateAccountOpen && (
                <CreateAccount setIsCreateAccountOpen={setIsCreateAccountOpen} id='CreateAccount' className={`${styles.login_box} ${styles.create_account_div}`} />
            )};
        </>
    );
}

export { LoginDetail };