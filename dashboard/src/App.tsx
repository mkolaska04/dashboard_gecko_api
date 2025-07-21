import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen bg-bg_dark text-white ">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </div>
    </>
  )
}

export default App
