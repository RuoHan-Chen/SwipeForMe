export const getCurrentUser = () => {
  return fetch("/api/users/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ContentType: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};
