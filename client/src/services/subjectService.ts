import { apiClient } from ".";
import type { Subject } from "../models/subject";
import { TeacherService } from "../services/teacherService";

export class SubjectService {
  teacherService = new TeacherService();

  public async getSubjectByTeacherId() {
    const teacherId = await this.teacherService.getTeacherById();
    try {
      const response = await apiClient.get<Subject>(`/subject/${teacherId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to login user");
    }
  }
}
