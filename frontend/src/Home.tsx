import React from "react";
import Navbar from './navbar.tsx';
import Users from './Users.tsx';
import {Routes, Route,} from "react-router-dom";
import UserCreate from "./UsersCreate.tsx";
import { BrowserRouter, NavLink } from "react-router-dom";

function Home() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Users/>} />
                <Route path="/create" element={<UserCreate/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Home