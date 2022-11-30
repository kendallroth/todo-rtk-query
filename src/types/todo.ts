export interface Todo {
  id: string;
  createdAt: string;
  complete: boolean;
  text: string;
}

export type TodoStatusFilter = "all" | "completed" | "outstanding";
