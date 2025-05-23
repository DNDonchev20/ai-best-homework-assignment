import { apiClient } from ".";
import type { User } from "../models/user";

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
    const response = await apiClient.post<{
      access_token: string;
      refresh_token: string;
    }>("/auth/login", {
      email,
      password,
    });

    const accessTokenExpiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const refreshTokenExpiry = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
    sessionStorage.setItem("access_token", response.data.access_token);
    sessionStorage.setItem("refresh_token", response.data.refresh_token);
    sessionStorage.setItem("access_token_expiry", accessTokenExpiry.toString());
    sessionStorage.setItem(
      "refresh_token_expiry",
      refreshTokenExpiry.toString(),
    );

    const userId = await this.getUserIdByEmail(email);
    this.updateRefreshToken(userId, response.data.refresh_token);
    sessionStorage.setItem("user_id", userId);

    sessionStorage.setItem("isLogged", "true");

    return response.data;
  }

  public async getUserIdByEmail(email: string): Promise<string> {
    const response = await apiClient.get(`/user/id/email/${email}`);
    return response.data;
  }

  public async updateRefreshToken(userId: string, refreshToken: string) {
    const response = await apiClient.patch(`/user/refresh/id/${userId}`, {
      refreshToken,
    });

    return response.data;
  }

  //get current user by user id
  public async getUserById() {
    const user_id = sessionStorage.getItem("user_id");
    try {
      const response = await apiClient.get<User>(`/user/${user_id}`);
      return response.data as User;
    } catch (error) {
      throw new Error("Failed to login user");
    }
  }

  //get other user by user id
  public async getOtherUserByUserId(userId: string) {
    try {
      const response = await apiClient.get<User>(`/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user");
    }
  }
}
