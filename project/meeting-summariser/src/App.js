import { Routes, Route } from 'react-router-dom';
import CreateMeetingSummary from './components/createMeetingSummary.component'
import { Home, Summarizer } from './pages'
import './App.css';

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
