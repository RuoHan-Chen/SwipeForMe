const BASE_URL = import.meta.env.PROD
  ? "https://swipe4mebackend-856457684046.us-central1.run.app"
  : "http://localhost:8080";

console.log(BASE_URL);

export const toEndpointUrl = (path: string) => {
  const baseUrl = import.meta?.env?.VITE_API_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
};
