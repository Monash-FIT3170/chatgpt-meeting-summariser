import React, { useState } from 'react';
import Header from '../components/header.jsx';

const Dashboard = () => {
    const username = sessionStorage.getItem('username') || "Account";
  return (
    <>
    <Header title="Dashboard" username={username}></Header>
    </>
  );
}

export default Dashboard;