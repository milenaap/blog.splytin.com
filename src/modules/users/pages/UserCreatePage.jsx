import { useEffect, useState } from "react";
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
import { createUser } from "../services/userService";
import ThemedComboBox from "../../../components/ComboBoxes/ThemedComboBox";
import { getUserStatuses } from "../../user_statuses/services/userStatusService";

export const UserCreatePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userStatusesRes] = await Promise.all([getUserStatuses()]);


      if (userStatusesRes?.success) {
        setUserstatuses(userStatusesRes.data);

        // TODO default:
        // const x = userStatusesRes.data.find( x => x.id === 64 );
        // setSelectedUserStatus(x);
        // setValue("user_status_id", x?.id, {shouldValidate: true,});

      } else {
        Swal.fire({
          title: t("error"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ERROR,
        });
      }
      } catch (error) {
       console.error("Error al enviar los datos:", error);
        Swal.fire({
          title: t("errors.error_process"),
          icon: "error",
          confirmButtonText: t("message.ok"),
          confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_ERROR,
        });
      }
    };

    fetchData();
  }, [t]);

  const onSubmit = async(data) => {
    try {
      setIsLoading(true);
      const { success } = await createUser(data);

      if (success) {
        Swal.fire({
          title: t("message.record_saved"),
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
    navigate("/admin/users");
  };

  return (
    <SessionLayout>

      <ThemedText type="h2">{t("new")}</ThemedText>

      <ThemedCard>
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
              { t("cancel") }
            </ThemedButton>
          </div>

        </form>
      </ThemedCard>
    </SessionLayout>
  );
};
