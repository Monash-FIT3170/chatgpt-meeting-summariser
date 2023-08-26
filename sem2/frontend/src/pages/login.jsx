import React, { useState } from 'react';
import {LoginDetail} from '../components/account/LoginDetail';
import {CreateAccount} from '../components/account/CreateAccount';

const LoginPage = ({userHasAuthenticated}) => {

  return (
    <>
    <LoginDetail userHasAuthenticated={ userHasAuthenticated }></LoginDetail>
    </>
  );
}

export default LoginPage;
