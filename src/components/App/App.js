import './App.css';
import { 
  Routes,
  Route
} from 'react-router-dom';
import Input from '../../pages/Input'
import Results from '../../pages/Results'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;