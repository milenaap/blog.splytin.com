import { api } from "../../../api/api";
import { buildURL } from "../../../helpers/helperURL";

/**
 * List
 */
export const getUsers = async (filters = {}) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return [];
    }

    const url = buildURL("users/list", filters);

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
export const getUserById = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`users/show/${id}`, "GET", null, token);
    return response;
  } catch (error) {
    console.error("Error al obtener el registro:", error);
    return null;
  }
};

/**
 * Store
 */
export const createUser = async (data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) {
      console.warn("No hay token disponible en localStorage");
      return null;
    }

    const response = await api("users/store", "POST", data, token);

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
export const updateUser = async (id, data) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`users/update/${id}`, "PUT", data, token);
    return response;
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    return null;
  }
};

/**
 * Delete
 */
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token_blog_splytin_com");
    if (!token) return null;

    const response = await api(`users/delete/${id}`, "DELETE", null, token);
    return response;
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    return null;
  }
};
