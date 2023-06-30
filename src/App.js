import "./color.css";
import * as indentation from 'indent-textarea';
import Home from "./home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Login from "./login/Login";
import Loader from "./components/loader/Loader";
import { useContext } from "react";
import { Context } from "./Context";

function App() {
  const { user, dispatch, isFetching } = useContext(Context);
  return (
    <Router>
      <Routes>
        <Route path="/home/:id" element={user ? <Home /> : <Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
