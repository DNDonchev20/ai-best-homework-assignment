import { apiClient } from ".";
import type { Teacher } from "../models/teacher";

export class TeacherService {
  public async getTeacherById() {
    const user_id = sessionStorage.getItem("user_id");
    try {
      const response = await apiClient.get<Teacher>(
        `/teacher/userId/${user_id}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to login user");
    }
  }

  public async findTeacherByUserId(userId: string) {
    try {
      const response = await apiClient.get<Teacher>(`/teacher/userId/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get teacher");
    }
  }
}
