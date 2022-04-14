import './App.css';
import { 
  Routes,
  Route
} from 'react-router-dom';
import Input from '../../pages/Input'
import Output from '../../pages/Output'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Input />} />
      <Route path="/results" element={<Output />} />
    </Routes>
  );
}

export default App;