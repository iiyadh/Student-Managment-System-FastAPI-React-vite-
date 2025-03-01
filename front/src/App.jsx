import './App.scss';
import HomePage from './components/HomePage';
import StudentList from './components/StudentList';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/students" element={<StudentList />}/>
      </Routes>
    </Router>
  )
}

export default App
