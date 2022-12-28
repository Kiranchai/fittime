import Login from "./components/Login/Login";
import Registration from "./components/Registration";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<div>exercises</div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
