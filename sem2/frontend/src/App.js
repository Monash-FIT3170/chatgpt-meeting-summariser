import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginCanvas from './pages/login.jsx';
import DashboardPage from './pages/dashboard.jsx';
import { useState } from 'react';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false); //This is used to authenticate whether a user has successfully logged in
  //If after axios.post to the login route (in the logindetail.jsx file) is successfull then isAuthenticated = true and the Route to home is returned 
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginCanvas userHasAuthenticated={userHasAuthenticated} />}
      />
      {isAuthenticated ? (
        <Route path="/home" element={<DashboardPage />} /> //If user is legit they can use this route
      ) : (
        <Route path="*" element={<Navigate to="/login" />} /> //Otherwise they r redirected to login LOL
      )}
    </Routes>
  );
}
export default App;
