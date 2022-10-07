import React from "react"
import { Routes, Route,Navigate } from 'react-router-dom';
import {AuthenticationPage} from '../Pages/AuthenticationPage/index'

export const PublicRoutes = () =>{
    return (
        <Routes>
            <Route path="/" index element ={<AuthenticationPage/>}/>
            <Route path="*" element={<Navigate to="/"/>}  />
        </Routes>
    )
}