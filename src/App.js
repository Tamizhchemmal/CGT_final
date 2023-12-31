import "./App.css";
import { Route, Routes } from "react-router-dom";
import Studentpage from "./Components/Studentpage";
import HomePage from "./Components/HomePage";
import Trainerpage from "./Components/Trainerpage";
import Referralpagetwo from "./Components/Referralpagetwo";
import TrainerProfile from "./Components/TrainerProfile";
import RefProfile from "./Components/RefProfile";
import CommonHomePage from "./Components/CommonHomePage";
import React, { createContext } from "react";

import Noaccess from "./Components/Noaccess";
import Adminlogin from "./Components/Adminlogin";

export const rolecontext = createContext();

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Adminlogin />}></Route>
        <Route
          path="/home"
          element={
            <ProductedHome>
              <HomePage />
            </ProductedHome>
          }
        ></Route>
        <Route
          path="/commonhome"
          element={
            <ProductedHomeTrainer>
              <CommonHomePage />
            </ProductedHomeTrainer>
          }
        ></Route>
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

        <Route
          path="/refprofile"
          element={
            <ProductedProfileReferral>
              <RefProfile />
            </ProductedProfileReferral>
          }
        ></Route>
        <Route
          path="/trainerprofile"
          element={
            <ProductedProfileTrainer>
              <TrainerProfile />
            </ProductedProfileTrainer>
          }
        ></Route>

        <Route path="/error" element={<Noaccess />}></Route>
      </Routes>
    </>
  );
}
export default App;

const Productedpage = ({ children }) => {
  const roless = localStorage.getItem("role");
  const id = localStorage.getItem("id");
  console.log(roless);

  if (roless == "admin") {
    return children;
  } else if (roless == "referral" || roless == "trainer") {
    return <Noaccess />;
  } else {
    return <Noaccess />;
  }
};

const ProductedHome = ({ children }) => {
  const roless = localStorage.getItem("role");
  if (roless == "admin") {
    return children;
  } else {
    return <Noaccess />;
  }
};
const ProductedHomeTrainer = ({ children }) => {
  const roless = localStorage.getItem("role");
  if (roless == "trainer" || roless == "referral") {
    return children;
  } else {
    return <Noaccess />;
  }
};

const ProductedProfileTrainer = ({ children }) => {
  const roless = localStorage.getItem("role");
  if (roless == "trainer") {
    return children;
  } else {
    return <Noaccess />;
  }
};

const ProductedProfileReferral = ({ children }) => {
  const roless = localStorage.getItem("role");
  if (roless == "referral") {
    return children;
  } else {
    return <Noaccess />;
  }
};
