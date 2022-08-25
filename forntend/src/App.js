
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Addproduct from "./Components/Addproduct";

function App() {
  return (
    <div className="App">
      <Router>
      
        <Routes>

        <Route element={<Login/>} path="/" />
        <Route element={<Signup/>} path="/register" />
        <Route element={<Home/>} path="/home" />
        <Route element={<Addproduct/>} path="/home/addproduct" />
        </Routes >

      </Router>
    </div>
  );
}

export default App;
