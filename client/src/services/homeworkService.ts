import { apiClient } from ".";
import { Homework } from "../models/homework";

export class HomeworkService {
    public async getHomeworksByTeacherId(teacherId: string) {
        const response = await apiClient.get<Homework>(`/homework/teacher/${teacherId}`);
        return response.data;
    }

    public async createHomework(homework: Homework) {
        const response = await apiClient.post<Homework>("/homework", homework);
        return response.data;
    }

    public async getHomeworkById(homeworkId: string) {
        const response = await apiClient.get<Homework>(`/homework/${homeworkId}`);
        return response.data;
    }
}