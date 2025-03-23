// Author: Steven Yi
// Time spent: 15 minutes

import { toEndpointUrl } from "./utils";

export interface LoginResponse {
  token: string;
  userId: number;
}

export const googleSignIn = async (idToken: string): Promise<LoginResponse> => {
  const queryParams = {
    id_token: idToken,
  };

  const response = await fetch(
    toEndpointUrl("/api/auth/oauth2/google/login?") +
      new URLSearchParams(queryParams).toString(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return await response.json();
};
