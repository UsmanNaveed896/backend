import { Routes, Route } from "react-router-dom";
import Home from './home/home'
import EditPage from './editpage/editPage'
import './App.css';
import Location from '../src/location/location'
import Login from '../src/login/login'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="location" element={<Location />} />
      </Routes>
     
      
    </div>
  );
}

export default App;
