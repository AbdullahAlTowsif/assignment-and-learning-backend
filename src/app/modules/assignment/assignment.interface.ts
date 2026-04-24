export type TCreateAssignment = {
  title: string;
  description: string;
  deadline: Date;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
};

export type TUpdateAssignment = Partial<TCreateAssignment>;
