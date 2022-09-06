import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes, Route,} from 'react-router-dom'
import Admin from './Admin/AdminCrud/Admin';
import Login from './Admin/Login/Login';
import Hotels from './Admin/hotels/Hotels';

function App() {
  return (
    <div className="App">
  
  <Router>
        <Routes>
         
           <Route exact path='/' element={<Login />}> 
           </Route>
           <Route path = '/admin/:id' element ={<Admin/>}/>
           <Route path = '/hotels' element ={<Hotels/>}/>
          
    </Routes>
    </Router>
    </div>
  );
}

export default App;
