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
