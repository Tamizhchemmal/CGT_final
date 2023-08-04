import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Studentpage from "./Components/Studentpage";
import HomePage from "./Components/HomePage";
import Trainerpage from "./Components/Trainerpage";
import Referralpagetwo from "./Components/Referralpagetwo";
import TrainerProfile from "./Components/TrainerProfile";
import RefProfile from "./Components/RefProfile";
import React, { useState } from "react";

import "./Css/login.css";

import Noaccess from "./Components/Noaccess";
import Adminlogin from "./Components/Adminlogin";

function App() {
  const getrole = (role) => {
    console.log(role);
  };
  return (
    <>
      <Routes>
        <Route path="/referralpage" element={<Referralpagetwo />}></Route>
        <Route path="/studentpage" element={<Studentpage />}></Route>
        <Route path="/" element={<Adminlogin />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/trainerpage" element={<Trainerpage />}></Route>

        <Route path="/refprofile" element={<RefProfile />}></Route>
        <Route path="/trainerprofile" element={<TrainerProfile />}></Route>

        <Route path="/error" element={<Noaccess />}></Route>
      </Routes>
    </>
  );
}
export default App;

// const ProductedTrainerpage=({children})=>{
//   console.log(role)
//  if(role=="admin"){
//   return children;
//  }else{
//   return <Noaccess/>
//  }
// }
