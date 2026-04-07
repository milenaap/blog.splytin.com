import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { SessionLayout } from "../../../layouts/private/SessionLayout";
import { Toast } from "../../../helpers/helperToast";
import { Preloader } from "../../../components/Preloader/Preloader";
import { ThemedDataTable } from "../../../components/DataTables/ThemedDataTable";
import { ThemedButton } from "../../../components/Buttons/ThemedButton";
import { ThemedText } from "../../../components/Text/ThemedText";
import { deleteUserStatus, getUserStatuses } from "../services/userStatusService";

export const UserStatusPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- filtros (UI) ---
  const [qName, setQName] = useState("");

  const resetFilters = useCallback(() => {
    setQName("");
  }, []);

  const dataHeader = [
    { key: "name", label: t("name") },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {

        const response = await getUserStatuses({
          name: qName,
        });

        const { data } = response;

        if (Array.isArray(data)) {
          setData(data);
        } else {
          console.warn("La API no devolvió un array:", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [qName]);

  const onDeleteClick = async (id, description = "") => {
    Swal.fire({
      icon: "warning",
      title: t("message.are_you_sure"),
      text: t("delete") + (description !== "" ? ": " + description : ""),
      showCancelButton: true,
      confirmButtonText: t("delete"),
      cancelButtonText: t("cancel"),
      confirmButtonColor: import.meta.env.VITE_SWEETALERT_COLOR_BTN_SUCCESS,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteUserStatus(id);
          const { success, errors } = response;

          if (success) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            await Toast(t("message.record_deleted"), "success");
          } else {
            await Toast(errors?.[0]?.e || t("message.error_deleting"), "error");
          }
        } catch (error) {
          console.error("Error al eliminar el registro:", error);
          await Toast(t("message.error_deleting"), "error");
        }
      }
    });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    navigate("/admin/user-statuses/create");
  };

  return (
    <SessionLayout>
      <div className="flex items-center justify-between mb-5">
        <ThemedText type="h2">{t("user_statuses")}</ThemedText>

        <div className="sm:flex sm:items-center">
          <div className="mt-4 sm:mt-0 sm:flex-none">
            <ThemedButton type="button" onClick={onAddClick}>
              {t("new")}
            </ThemedButton>
          </div>
        </div>
      </div>

      {/* filters */}
      
      <div className="border border-gray-200 shadow-sm rounded-xl px-4 py-4 mb-5 bg-gray-200/30">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
<div className="md:col-span-3">
            <input
              type="text"
              value={qName}
              onChange={(e) => setQName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 bg-white"
              placeholder={t("name")}
            />
          </div>
          <div className="md:col-span-2 flex items-end">
            <ThemedButton variant="warning" type="button" onClick={resetFilters} className="w-full">
              {t("clear_filters")}
            </ThemedButton>
          </div>
        </div>
      </div>

      {loading ? (
        <Preloader />
      ) : (
        <ThemedDataTable
          columns={dataHeader}
          data={data}
          editPath="/admin/user-statuses"
          onDelete={onDeleteClick}
        />
      )}
    </SessionLayout>
  );
};
