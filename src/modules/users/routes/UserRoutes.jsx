import { Route, Routes } from "react-router";
import { UserPage, UserCreatePage, UserEditPage } from "../pages";

export const UserRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<UserPage />} />
      <Route path="create" element={<UserCreatePage />} />
      <Route path="edit/:id" element={<UserEditPage />} />

    </Routes>
  )
}
