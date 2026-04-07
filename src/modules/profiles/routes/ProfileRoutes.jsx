import { Route, Routes } from "react-router";
import { ProfilePage, ProfileCreatePage, ProfileEditPage } from "../pages";

export const ProfileRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<ProfilePage />} />
      <Route path="create" element={<ProfileCreatePage />} />
      <Route path="edit/:id" element={<ProfileEditPage />} />

    </Routes>
  )
}
