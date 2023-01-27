import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin'
import Home from './pages/Home'
import SubAdmin from './pages/SubAdmin';
import SubDashboard from './pages/SubDashboard'




function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Routes>
           <Route path='/dashboard' element={<Dashboard/>} />
           <Route path='/login' element={<Login/>} />
           <Route path='/register' element={<Register/>} />
           <Route path='/admin' element={<Admin/>} />
           <Route path='/subadmin' element={<SubAdmin/>}/>
           <Route path='/subdashboard' element={<SubDashboard/>} />

           <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </Router> 
      <ToastContainer />
    </>
  );
}



export default App;
