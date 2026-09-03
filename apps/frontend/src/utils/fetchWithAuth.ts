import { useAuthStore } from "../store/authStore";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = useAuthStore.getState().token;

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!refreshResponse.ok) {
        throw new Error("Session expired");
      }

      const data = await refreshResponse.json();

      const { user, login } = useAuthStore.getState();

      if (user) {
        login(user, data.accessToken);
      }

      const newHeaders = {
        ...headers,
        Authorization: `Bearer ${data.accessToken}`,
      };

      response = await fetch(url, { ...options, headers: newHeaders });
    } catch (error) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }

  return response;
}
