// import LineGraph from "./components/LineGraph/LineGraph";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import InitialSetup from "./pages/InitialSetup/InitialSetup";
import Progress from "./pages/Progress/Progress";
// import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initialSetup" element={<InitialSetup />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
