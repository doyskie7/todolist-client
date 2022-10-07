import React from "react"
import { Routes, Route,Navigate } from 'react-router-dom';
import { Main } from "../Pages/Main";

export const PrivateRoutes = () =>{
    return (
        <Routes>
            <Route path="/todo" index element ={<Main/>}/>
            <Route path="*" element={<Navigate to="/todo"/>}  />
        </Routes>
    )
}