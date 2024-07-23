import { apiClient } from ".";
import { HomeworkSubmission } from "../models/homeworkSubmission";

export class HomeworkSubmissionService {
    public async findHomeworkSubmissionsByHomeworkId(homeworkId: string) {
        try {
            const response = await apiClient.get<HomeworkSubmission[]>(`/homework-submission/homework/${homeworkId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get homework submissions");
        }
    }
}