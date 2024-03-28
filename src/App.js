import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import InitialSetup from "./pages/InitialSetup/InitialSetup";
import Progress from "./components/Progress/Progress";
import Profile from "./components/Profile/Profile";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initialSetup" element={<InitialSetup />} />
          <Route path="/user" element={<UserPage />}>
            <Route index element={<Navigate to="progress" />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
