export class HomeworkSubmission {
    id: number;
    homeworkId: number;
    studentId: number;
    grade: number;
    filePath: string;
    submittedAt: Date;
    feedback?: string;
}
