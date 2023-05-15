import { Routes, Route } from 'react-router-dom';
import CreateMeetingSummary from './components/createMeetingSummary.component'
import { Home } from './pages'
import './App.css';
import LoginCanvas from './LoginModules/Login';
import CreateAccount from './LoginModules/CreateAccount';
function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createMeetingSummary" element={<CreateMeetingSummary />} />
       </Routes>
    </>
  );
}

export default App;
