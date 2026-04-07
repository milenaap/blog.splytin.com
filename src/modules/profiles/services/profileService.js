import { api } from "../../../api/api";
import { buildURL } from "../../../helpers/helperURL";

/**
 * List
 */
export const getProfiles = async (filters = {}) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return [];
    }

    const url = buildURL("profiles/list", filters);

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
export const getProfileById = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`profiles/show/${id}`, "GET", null, token);
    return response;
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    return null;
  }
};

/**
 * Store
 */
export const createProfile = async (data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return null;
    }

    const response = await api("profiles/store", "POST", data, token);

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
export const updateProfile = async (id, data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`profiles/update/${id}`, "PUT", data, token);
    return response;
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return null;
  }
};

/**
 * Delete
 */
export const deleteProfile = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`profiles/delete/${id}`, "DELETE", null, token);
    return response;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return null;
  }
};
