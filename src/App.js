import logo from "./logo.svg";
import "./App.css";
import Adminlogin from "./Components/Adminlogin";
import { Route, Routes } from "react-router-dom";
import Studentpage from "./Components/Studentpage";
import HomePage from "./Components/HomePage";
import { Home } from "@mui/icons-material";
import Trainerpage from "./Components/Trainerpage";
import Referralpagetwo from "./Components/Referralpagetwo";
  const role = {
    admin:"admin",
    referral:"referral",
    trainer:"trainer"

  }

function App() {
  return (
    <>
      <Routes>
        <Route path="/referralpage" element={<Referralpagetwo/>}></Route>
        <Route path="/studentpage" element={<Studentpage />}></Route>
        <Route path="/" element={<Adminlogin />}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
        <Route path="/trainerpage" element={<Trainerpage/>}></Route>
        
      </Routes>
    </>
  );
}
export default App;
