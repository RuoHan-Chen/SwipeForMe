const BASE_URL = import.meta.env.PROD
  ? "https://swipe4mebackend-856457684046.us-central1.run.app"
  : "http://localhost:8080";

console.log(BASE_URL);

export const toEndpointUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};
