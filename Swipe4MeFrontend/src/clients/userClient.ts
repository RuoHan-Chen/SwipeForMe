// Author: Steven Yi
// Time spent: 15 minutes

import { toEndpointUrl } from "./utils";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  rating: number;
  profilePicUrl: string;
}

export const getCurrentUser = async () => {
  const response = await fetch(toEndpointUrl("/api/users/me"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ContentType: "application/json",
    },
  });

  const data: User = await response.json();
  console.log(data);
  return data;
};
