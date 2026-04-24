export type TCreateSubmission = {
    studentUrl: string;
    studentNote: string;
    assignmentId: string;
};

export type TUpdateSubmission = {
    studentUrl?: string;
    studentNote?: string;
};

export type TReviewSubmission = {
    status: "PENDING" | "ACCEPTED" | "NEEDS_IMPROVEMENT";
    feedback: string;
};
