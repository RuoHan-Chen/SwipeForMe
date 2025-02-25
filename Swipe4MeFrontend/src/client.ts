export const googleSignIn = async (idToken: string) => {
  const queryParams = {
    id_token: idToken,
  };

  const response = await fetch(
    "/api/auth/oauth2/google/login?" +
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

export interface ActiveUser {
  id: number;
  user_id: number;
  location: string;
  start_time: string;
  end_time: string;
}

export type GetAllActiveUsersResponse = ActiveUser[];

export const getAllActiveUsers =
  async (): Promise<GetAllActiveUsersResponse> => {
    const response = await fetch("/api/active", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ContentType: "application/json",
      },
    });
    return await response.json();
  };
