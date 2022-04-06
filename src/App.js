import "./App.css";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactSession } from "react-client-session";
import { NavBar } from "./Components/NavBar";
import { Profile } from "./Components/Profile";
import { Links } from "./Components/Links";
import { Notices } from "./Components/Notices";
import { Users } from "./Components/Users";
import { NotFoundPage } from "./Components/NotFoundPage";
import { Route, Routes, Navigate, BrowserRouter as Router  } from "react-router-dom";
import { SignInSide } from  "./Components/SignInSide"
import { Subjects } from  "./Components/Subjects"

ReactSession.setStoreType("localstorage");


function App() {


  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} exact />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/links" element={<Links />} />
          <Route path="/dashboard/notices" element={<Notices />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/subjects" element={<Subjects />} />
          <Route path="/*/*" element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}

export default App;
