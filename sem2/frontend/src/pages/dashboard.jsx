import React, { useState } from 'react';
import {DashboardCanvas} from '../components/main/DashboardCanvas';

const dashboardPage = () => {
    const username = sessionStorage.getItem('username') || "Account";
  return (
    <>
      <DashboardCanvas title="Minute Mind"></DashboardCanvas>
    </>
  );
}

export default dashboardPage;