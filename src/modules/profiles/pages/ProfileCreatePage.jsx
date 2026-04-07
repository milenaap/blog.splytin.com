import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { ThemedCard } from "../../../components/Cards/ThemedCard";
import { ThemedText } from "../../../components/Text/ThemedText";
import { createProfile } from "../services/profileService";

export const ProfileCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  

  const schema = yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().nullable(),
    password: yup.string().nullable(),
    image_url: yup.string().nullable()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  

  const onSubmit = async(data) => {
    try {
      setIsLoading(true);
      const { success } = await createProfile(data);

      if (success) {
        Swal.fire({
          title: t("message.record_saved"),
          icon: "success",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS
        }).then(() => {
          navigate("/admin/profiles");
        });
      } else {
        Swal.fire({
          title: t("error"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      Swal.fire({
        title: t("errors.error_process"),
        icon: "error",
        confirmButtonText: t("message.ok"),
        confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onClickCancel = (e) => {
    e.preventDefault();
    navigate("/admin/profiles");
  };

  return (
    <SessionLayout>

      <ThemedText type="h2">{t("new")}</ThemedText>

      <ThemedCard>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">

          
            {/* name */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("name")}</label>
              <input
                type="text"
                {...register("name")}
                className={`w-full p-2 border ${errors["name"] ? "border-danger" : "border-gray-300"} rounded-md`}
              />
              {errors.name && <p className="text-danger text-sm">{errors.name?.message}</p>}
            </div>

            {/* email */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("email")}</label>
              <input
                type="text"
                {...register("email")}
                className={`w-full p-2 border ${errors["email"] ? "border-danger" : "border-gray-300"} rounded-md`}
              />
              {errors.email && <p className="text-danger text-sm">{errors.email?.message}</p>}
            </div>

            {/* password */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("password")}</label>
              <input
                type="text"
                {...register("password")}
                className={`w-full p-2 border ${errors["password"] ? "border-danger" : "border-gray-300"} rounded-md`}
              />
              {errors.password && <p className="text-danger text-sm">{errors.password?.message}</p>}
            </div>

            {/* image_url */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("image_url")}</label>
              <input
                type="text"
                {...register("image_url")}
                className={`w-full p-2 border ${errors["image_url"] ? "border-danger" : "border-gray-300"} rounded-md`}
              />
              {errors.image_url && <p className="text-danger text-sm">{errors.image_url?.message}</p>}
            </div>

          <div className="col-span-12 flex justify-center items-center mt-7 gap-4 flex-wrap">
            <ThemedButton
              type="submit"
              disabled={isLoading}
              className="w-32 h-10 flex items-center justify-center"
            >
              {
                isLoading
                ? <PreloaderButton />
                : t("save")
              }
            </ThemedButton>

            <ThemedButton variant="danger" onClick={onClickCancel}>
              { t("cancel") }
            </ThemedButton>
          </div>

        </form>
      </ThemedCard>
    </SessionLayout>
  );
};
