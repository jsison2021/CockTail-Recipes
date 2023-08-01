import Mainbar from './Mainbar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
    <div className='App'>
      <Mainbar></Mainbar>
    </div>
    </BrowserRouter>
      
  );
}

export default App;
