// Author: Steven Yi
// Time spent: 15 minutes

import { User } from "../types";
import { toEndpointUrl } from "./utils";

export const getCurrentUser = async () => {
  const response = await fetch(toEndpointUrl("/api/users/me"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const data: User = await response.json();
  console.log(data);
  return data;
};
