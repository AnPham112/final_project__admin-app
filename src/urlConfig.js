const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:2000"
    : "https://backend-rest-server112.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
}