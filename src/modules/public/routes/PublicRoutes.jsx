import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";


export const PublicRoutes = () => {
  return (
    <>
      
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        <Route path="/*" element={ <Navigate to="/" /> } />

      </Routes>
      
    </>
  )
}
