const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://swipe4mebackend-856457684046.us-central1.run.app";

console.log(BASE_URL);

export const toEndpointUrl = (endpoint: string) => {
  return `${BASE_URL}${endpoint}`;
};
