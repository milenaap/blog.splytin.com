const API_URL = import.meta.env.VITE_API_URL;

/**
 * Single Api
 * @param {*} endpoint 
 * @param {*} method 
 * @param {*} body 
 * @param {*} token 
 * @returns 
 */
export const api = async (endpoint, method = "GET", body = null, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    // if (!response.ok) {
    //   throw new Error(`Error ${response.status}: ${response.statusText}`);
    // }

    return await response.json();
  } catch (error) {
    console.error("Error en la petición:", error);
    throw error;
  }
};


/**
 * API Blob
 * @param {*} endpoint 
 * @param {*} method 
 * @param {*} token 
 * @returns 
 */
export const apiBlob = async (endpoint, method = "GET", token) => {
  const baseUrl = import.meta.env.VITE_API_URL; // usa la misma base que tu api()
  const url = `${baseUrl}${endpoint}`;

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "download failed");
  }

  return await res.blob();
};
