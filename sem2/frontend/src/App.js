import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginCanvas from './pages/login.jsx';
import Dashboard from './pages/dashboard.jsx';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<LoginCanvas />} />
      <Route path="/login" element={<LoginCanvas />} />
      <Route path="/home" element={<Dashboard/>} />
    </Routes>
    </>
  );
}
export default App;
