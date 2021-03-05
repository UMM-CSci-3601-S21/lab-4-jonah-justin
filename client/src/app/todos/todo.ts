export interface Todo {
  _id: string;
  owner: string;
  status: TodoStatus;
  body: string;
  category: string;
}

export type TodoStatus = 'complete' | 'incomplete';
