import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginCanvas from './pages/login.jsx';
import DashboardPage from './pages/dashboard.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginCanvas />} />
      <Route path="/login" element={<LoginCanvas />} />
      <Route path="/home" element={<DashboardPage/>} />
    </Routes>
    </>
  );
}
export default App;
