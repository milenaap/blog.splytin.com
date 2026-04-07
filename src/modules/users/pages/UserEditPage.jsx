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
import { getUserById, updateUser } from "../services/userService";
import ThemedComboBox from "../../../components/ComboBoxes/ThemedComboBox";
import { getUserStatuses } from "../../user_statuses/services/userStatusService";

export const UserEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [dataLoading, setDataLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  // UserStatus
  const [userStatuses, setUserstatuses] = useState([]);
  const [selectedUserStatus, setSelectedUserStatus] = useState(null);
  const onChangeUserStatus = () => {};

  const schema = yup.object().shape({
    user_status_id: yup.mixed().nullable(),
    name: yup.string().nullable(),
    email: yup.string().nullable(),
    password: yup.string().nullable(),
    email_verfied_at: yup.string().nullable(),
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

        const [ userRes, userStatusesRes ] = await Promise.all([
          getUserById(id),
          getUserStatuses()
        ]);

if (userStatusesRes?.success) {

          setUserstatuses(userStatusesRes.data);

        } else {
          Swal.fire({
            title: t("error"),
            icon: "error",
            confirmButtonText: t("message.ok"),
            confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ERROR,
          });
        }

        if (userRes.success) {

          const {data} = userRes;
          setValue("user_status_id", data.user_status_id);
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("password", data.password);
          setValue("email_verfied_at", data.email_verfied_at);
          setValue("image_url", data.image_url);

// user_status_id
          setSelectedUserStatus(userStatusesRes.data?.find(x => x?.id === data.user_status_id) ?? null);



        } else {

          Swal.fire({
            title: t("error"),
            icon: "error",
            confirmButtonText: t("message.ok"),
            confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
          });
          navigate("/admin/users");

        }
      } catch (error) {

        console.error("Error al obtener los datos:", error);
        Swal.fire({
          title: t("errors.error_process"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_DANGER
        });
        navigate("/admin/users");

      } finally {

        setDataLoading(false);

      }
    };

    fetchData();
  }, [id, navigate, setValue, t]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await updateUser(id, data);

      if (response.success) {
        Swal.fire({
          title: t("message.record_updated"),
          icon: "success",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS
        }).then(() => {
          navigate("/admin/users");
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
    navigate("/admin/users");
  };

  return (
    <SessionLayout>

      <ThemedText type="h2">{t("edit")}</ThemedText>

      <ThemedCard>
        {dataLoading ? (
          <Preloader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
            
            {/* user_status_id */}
            <div className="col-span-12 md:col-span-6 lg:col-span-6">
              <ThemedComboBox
                label={t("user_status")}
                options={userStatuses}
                selected={selectedUserStatus}
                setSelected={(item) => {
                  setSelectedUserStatus(item);
                  setValue("user_status_id", item?.id, { shouldValidate: true });
                }}
                error={errors.user_status_id?.message}
                getLabel={(item) =>
                  `{${item?.name ?? ""}}`.trim()
                }
                onChange={(value) => onChangeUserStatus(value)}
              />
            </div>

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

            {/* email_verfied_at */}
            <div className="col-span-12 md:col-span-6 lg:col-span-4">
              <label className="block text-gray-700">{t("email_verfied_at")}</label>
              <input
                type="text"
                {...register("email_verfied_at")}
                className={`w-full p-2 border ${errors["email_verfied_at"] ? "border-danger" : "border-gray-300"} rounded-md`}
              />
              {errors.email_verfied_at && <p className="text-danger text-sm">{errors.email_verfied_at?.message}</p>}
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
