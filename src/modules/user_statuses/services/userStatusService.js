import { api } from "../../../api/api";
import { buildURL } from "../../../helpers/helperURL";

/**
 * List
 */
export const getUserStatuses = async (filters = {}) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return [];
    }

    const url = buildURL("user-statuses/list", filters);

    const response = await api(url, "GET", null, token);

    if (!response || typeof response !== "object") {
      console.error("Respuesta no válida de la API:", response);
      return [];
    }

    return response;
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return [];
  }
};

/**
 * Show
 */
export const getUserStatusById = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`user-statuses/show/${id}`, "GET", null, token);
    return response;
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    return null;
  }
};

/**
 * Store
 */
export const createUserStatus = async (data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return null;
    }

    const response = await api("user-statuses/store", "POST", data, token);

    if (!response || typeof response !== "object") {
      console.error("Error en la respuesta de la API:", response);
      return null;
    }

    return response;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    return null;
  }
};

/**
 * Update
 */
export const updateUserStatus = async (id, data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`user-statuses/update/${id}`, "PUT", data, token);
    return response;
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return null;
  }
};

/**
 * Delete
 */
export const deleteUserStatus = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`user-statuses/delete/${id}`, "DELETE", null, token);
    return response;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return null;
  }
};
