import { api } from "../../api/api";
import { checkingCredentials, login, logout, setErrorMessage } from "./authSlice";

/**
 * Marca el estado como "checking" para mostrar loaders o bloquear formulario.
 */
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

/**
 * Inicia sesión con email y password.
 * Si es exitoso, obtiene el usuario y lo guarda en Redux + localStorage.
 */
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const { token, errors } = await api("auth/login", "POST", { email, password });

      // Si la API devolvió errores:
      if (!token) {
        console.log(errors);
        dispatch(setErrorMessage(errors[0].e));
        return;
      }

      // Obtener datos del usuario autenticado
      const userResponse = await api("auth/user", "GET", null, token);
      const { email: emailApi, name: nameApi, roles } = userResponse.data;

      const user = {
        status: "authenticated",
        token,
        email: emailApi,
        displayName: nameApi,
        image_url: "",
        roles,
        errorMessage: null,
      };

      dispatch(login(user));
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Cierra la sesión limpiando Redux y localStorage.
 */
export const startLogout = () => {
  return async (dispatch) => {
    dispatch(logout());
  };
};

/**
 * Restaura la sesión si existe un token válido en localStorage.
 */
export const startRestoreSession = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const token = localStorage.getItem("token_blog_splytin_com");

    // Si no hay token ⇒ cerrar sesión
    if (!token) {
      dispatch(logout());
      return;
    }

    try {
      const userResponse = await api("auth/user", "GET", null, token);
      const { email: emailApi, name: nameApi, roles = [] } = userResponse.data;

      const user = {
        status: "authenticated",
        token,
        email: emailApi,
        displayName: nameApi,
        image_url: "",
        roles,
        errorMessage: null,
      };

      dispatch(login(user));
    } catch (error) {
      console.error("Error al restaurar sesión:", error);
      dispatch(logout());
    }
  };
};
