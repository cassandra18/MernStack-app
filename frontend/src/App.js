import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header';
import Dashboard from './pages/Dashboad';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
