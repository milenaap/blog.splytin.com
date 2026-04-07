import { Route, Routes } from "react-router";
import { UserStatusPage, UserStatusCreatePage, UserStatusEditPage } from "../pages";

export const UserStatusRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<UserStatusPage />} />
      <Route path="create" element={<UserStatusCreatePage />} />
      <Route path="edit/:id" element={<UserStatusEditPage />} />

    </Routes>
  )
}
