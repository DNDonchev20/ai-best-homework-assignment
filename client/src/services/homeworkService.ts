import { apiClient } from ".";
import { Homework } from "../models/homework";

export class HomeworkService {
    public async getHomeworksByTeacherId(teacherId: string) {
        const response = await apiClient.get<Homework>(`/homework/teacher/${teacherId}`);
        return response.data;
    }
}