export type TCreateSubmission = {
    studentUrl: string;
    studentNote: string;
    assignmentId: string;
};

export type TUpdateSubmission = {
    studentUrl?: string;
    studentNote?: string;
};
