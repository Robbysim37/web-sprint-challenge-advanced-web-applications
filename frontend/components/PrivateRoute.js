import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
if(localStorage.getItem("token")){
    return <Outlet/>
}
    return <Navigate to="/"/>
}

export default PrivateRoute