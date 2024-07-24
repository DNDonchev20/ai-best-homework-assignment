export interface HomeworkSubmission {
    id: number;
    homeworkId: string;
    studentId: string;
    filePath: string;
    submittedAt: Date;
    feedback?: string;
    isGraded: boolean;
}