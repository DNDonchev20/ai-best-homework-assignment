import { apiClient } from ".";
import { HomeworkSubmission } from "../models/homeworkSubmission";

export class HomeworkSubmissionService {
    public async findHomeworkSubmissionsByHomeworkId(homeworkId: string) {
        try {
            const response = await apiClient.get<HomeworkSubmission>(`/homework-submission/homework/${homeworkId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get homework submissions");
        }
    }

    public async createHomeworkSubmission(data: {
        homeworkId: string;
        studentId: string;
        feedback?: string;
      }): Promise<any> {
        try {
          const response = await apiClient.post('/homework-submission', data);
          return response.data;
        } catch (error) {
          console.error('Failed to create homework submission:', error);
          throw new Error('Failed to create homework submission');
        }
      }
    
      public async uploadHomeworkFile(submissionId: string, file: File): Promise<void> {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('submissionId', submissionId); 
    
            const response = await apiClient.post('/homework-submission/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            return response.data;
        } catch (error) {
            console.error('Failed to upload homework file:', error);
            throw new Error('Failed to upload homework file');
        }
    }

    public async getHomeworkSubmissionById(submissionId: string) {
        try {
            const response = await apiClient.get<HomeworkSubmission>(`/homework-submission/${submissionId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get homework submission");
        }
    }

    public async getHomeworkSubmissionByUserIdAndHomeworkId(userId: string, homeworkId: string) {
        try {
            const response = await apiClient.get<HomeworkSubmission>(`/homework-submission/userId/${userId}/homeworkId/${homeworkId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get homework submission");
        }
    }

    public async checkSubmissionExists(userId: string, homeworkId: string) {
        try {
            const response = await apiClient.get<boolean>(
                `/homework-submission/id/userId/${userId}/homeworkId/${homeworkId}`,
            );

            return response.data;
        } catch (error) {
            throw new Error("Failed to check submission id exists");
        }
    }

    public async deleteHomeworkSubmission(submissionId: string) {
        try {
            const response = await apiClient.delete(`/homework-submission/${submissionId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to delete homework submission");
        }
    }
}