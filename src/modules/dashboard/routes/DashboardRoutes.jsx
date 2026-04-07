import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "../pages/DashboardPage";


export const DashboardRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={ <DashboardPage /> } />
      
      
      <Route path="/*" element={ <Navigate to="/admin/dashboard" /> } />
      
    </Routes>
  )
}

