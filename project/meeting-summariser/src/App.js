import { Routes, Route } from 'react-router-dom';
import { Home, Summarizer } from './pages'
import './App.css';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/summarizer" element={<Summarizer />} />
       </Routes>
    </>
  );
}

export default App;
