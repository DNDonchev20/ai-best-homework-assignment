import { apiClient } from ".";
import { StudentDetail } from "../models/studentDetails";

export class StudentDetailsService {
    public async findStudentsByGroupId(groupId: string) {
        try {
            const response = await apiClient.get<StudentDetail[]>(`/student-details/group/${groupId}`);
            return response.data;
        } catch (error) {
            throw new Error("Failed to get students");
        }
    }
}