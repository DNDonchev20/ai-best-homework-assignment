import { apiClient } from ".";

export class UserService {
  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
  ) {
    const response = await apiClient.post("/user", {
      email,
      firstName,
      lastName,
      password,
      role,
    });

    return response.data;
  }

  public async login(email: string, password: string) {
    const response = await apiClient.post<{access_token: string, refresh_token: string}>("/auth/login", {
      email,
      password,
    });

    const accessTokenExpiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days
    const refreshTokenExpiry = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // 30 days
    sessionStorage.setItem('access_token', response.data.access_token);
    sessionStorage.setItem('refresh_token', response.data.refresh_token);
    sessionStorage.setItem('access_token_expiry', accessTokenExpiry.toString());
    sessionStorage.setItem('refresh_token_expiry', refreshTokenExpiry.toString());

    sessionStorage.setItem('isLogged', 'true');

    return response.data;
  }
}
