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
import { ToastContainer } from "react-toastify";

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
          <Route path="/" element={<Adminlogin onSubmit={getrole} />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route
            path="/trainerpage"
            element={
              <Productedpage>
                <Trainerpage />
              </Productedpage>
            }
          ></Route>
          <Route
            path="/referralpage"
            element={
              <Productedpage>
                <Referralpagetwo />
              </Productedpage>
            }
          ></Route>
          <Route
            path="/studentpage"
            element={
              <Productedpage>
                <Studentpage />
              </Productedpage>
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

const Productedpage = ({ children }) => {
  const roless = useContext(rolecontext);
  console.log(roless);
  if (roless == "referral" || roless == "trainer") {
    return <Noaccess />;
  } else if (roless == "admin") {
    return children;
  } else {
    return <Noaccess />;
  }
};
