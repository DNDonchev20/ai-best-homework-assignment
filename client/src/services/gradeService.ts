import { apiClient } from ".";
import { Group } from "../models/group";

export class GradeService {
    public async createGrade(data: {
        studentId: string;
        homeworkSubmissionId: string;
        grade: number;
        percentage: number;
        feedback: string;
      }): Promise<Group> {
        try {
          const response = await apiClient.post<Group>('/grade', data);
          return response.data;
        } catch (error) {
          console.error('Failed to create grade:', error);
          throw new Error('Failed to create grade');
        }
    }

    public async getGradesByHomeworkSubmissionId(homeworkSubmissionId: string) {
        try {
            const response = await apiClient.get<Group>(`/grade/homeworkSubmission/${homeworkSubmissionId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get grades");
        }
    }

    public async getGradeByHomeworkSubmissionIdAndStudentId(homeworkSubmissionId: string, studentId: string) {
        try {
            const response = await apiClient.get<Group>(`/grade/homeworkSubmission/${homeworkSubmissionId}/student/${studentId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get grade");
        }
    }

    public async getGradeById(gradeId: string) {
        try {
            const response = await apiClient.get<Group>(`/grade/${gradeId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get grade");
        }
    }

    public async deleteGradeById(gradeId: string) {
        try {
            await apiClient.delete(`/grade/${gradeId}`);
        } catch (error) {
            throw new Error("Failed to delete grade");
        }
    }
}