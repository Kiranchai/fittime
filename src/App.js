import Login from "./components/Login/Login";
import Registration from "./components/Registration";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Account from "./components/Account/Account";
import NotFound from "./components/NotFound/NotFound";
import SingleExercise from "./components/SingleExercise/SingleExercise";
import Exercises from "./components/Exercises/Exercises";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Navbar />}>
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/account" element={<Account />} />
          <Route path="/exercise/:id" element={<SingleExercise />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
