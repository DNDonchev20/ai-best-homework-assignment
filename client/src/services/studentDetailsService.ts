import { apiClient } from ".";
import { StudentDetail } from "../models/studentDetails";

export class StudentDetailsService {
  public async findStudentsByGroupId(groupId: string) {
    try {
      const response = await apiClient.get<StudentDetail[]>(
        `/student-details/group/${groupId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get students");
    }
  }

  public async findUserIdByStudentId(studentId: string) {
    try {
      const response = await apiClient.get<string>(
        `/student-details/userId/id/${studentId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user id");
    }
  }

  public async getDetailsByUserId(userId: string) {
    try {
      const response = await apiClient.get<StudentDetail>(
        `/student-details/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to get user id");
    }
  }
}
