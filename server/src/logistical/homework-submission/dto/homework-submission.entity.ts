export class HomeworkSubmission {
    id: number;
    homeworkId: string;
    studentId: string;
    filePath: string;
    submittedAt: Date;
    feedback?: string;
}