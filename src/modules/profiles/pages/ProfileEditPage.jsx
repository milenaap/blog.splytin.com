import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { ThemedText } from "../../../components/Text/ThemedText";
import { ThemedCard } from "../../../components/Cards/ThemedCard";
import { Preloader } from "../../../components/Preloader/Preloader";
import { PreloaderButton } from "../../../components/Preloader/PreloaderButton";
import { getProfileById, updateProfile } from "../services/profileService";

export const ProfileEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
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
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);

        const [ profileRes ] = await Promise.all([
          getProfileById(id)
        ]);



        if (profileRes.success) {

          const {data} = profileRes;
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("password", data.password);
          setValue("image_url", data.image_url);





        } else {

          Swal.fire({
            title: t("error"),
            icon: "error",
            confirmButtonText: t("message.ok"),
            confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
          });
          navigate("/admin/profiles");

        }
      } catch (error) {

        console.error("Error al obtener los datos:", error);
        Swal.fire({
          title: t("errors.error_process"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
        });
        navigate("/admin/profiles");

      } finally {

        setDataLoading(false);

      }
    };

    fetchData();
  }, [id, navigate, setValue, t]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await updateProfile(id, data);

      if (response.success) {
        Swal.fire({
          title: t("message.record_updated"),
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
      console.error("Error al actualizar:", error);
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

      <ThemedText type="h2">{t("edit")}</ThemedText>

      <ThemedCard>
        {dataLoading ? (
          <Preloader />
        ) : (
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
                {t("cancel")}
              </ThemedButton>
            </div>
          </form>
        )}
      </ThemedCard>
    </SessionLayout>
  );
};
