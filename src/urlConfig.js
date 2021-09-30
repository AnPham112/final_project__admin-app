const baseUrl = "https://backend-rest-server112.herokuapp.com";

export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
}