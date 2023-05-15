import { Routes, Route } from 'react-router-dom';
import { Home, Summarizer } from './pages'
import CreateMeetingSummary from './components/createMeetingSummary.component'
import { Home } from './pages'
>>>>>>>>> Temporary merge branch 2
import './App.css';
import LoginCanvas from './LoginModules/Login';
import CreateAccount from './LoginModules/CreateAccount';
function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createMeetingSummary" element={<CreateMeetingSummary />} />
          <Route path="/summarizer" element={<Summarizer />} />
       </Routes>
    </>
  );
}

export default App;
