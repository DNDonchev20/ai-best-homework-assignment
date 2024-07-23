export interface HomeworkSubmission {
    id: number;
    homeworkId: number;
    studentId: number;
    filePath: string;
    submittedAt: Date;
    feedback?: string;
    isGraded: boolean;
}