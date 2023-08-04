import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, json } from "react-router-dom";
import Studentpage from "./Components/Studentpage";
import HomePage from "./Components/HomePage";
import Trainerpage from "./Components/Trainerpage";
import Referralpagetwo from "./Components/Referralpagetwo";
import TrainerProfile from "./Components/TrainerProfile";
import RefProfile from "./Components/RefProfile";
import React, { createContext, useContext, useState } from "react";
import "./Css/HomePage.css";
import "./Css/login.css";

import Noaccess from "./Components/Noaccess";
import Adminlogin from "./Components/Adminlogin";

export const rolecontext = createContext();

function App() {
  const [roles, setRoles] = useState("");
  const getrole = (role) => {
    setRoles(role);
  };

  return (
    <>
      <rolecontext.Provider value={roles}>
        <Routes>
          <Route path="/referralpage" element={<Referralpagetwo />}></Route>
          <Route path="/studentpage" element={<Studentpage />}></Route>
          <Route path="/" element={<Adminlogin onSubmit={getrole} />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route
            path="/trainerpage"
            element={
              <ProductedTrainerpage>
                <Trainerpage />
              </ProductedTrainerpage>
            }
          ></Route>

          <Route path="/refprofile" element={<RefProfile />}></Route>
          <Route path="/trainerprofile" element={<TrainerProfile />}></Route>

          <Route path="/error" element={<Noaccess />}></Route>
        </Routes>
      </rolecontext.Provider>
    </>
  );
}
export default App;

const ProductedTrainerpage = ({ children }) => {
  const roless = useContext(rolecontext);
  console.log(roless);
  if (roless == "admin") {
    return children;
  } else {
    return <Noaccess />;
  }
};
