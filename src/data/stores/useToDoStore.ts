import { devtools } from "zustand/middleware";
import create from "zustand";
interface Task {
  id: string;
  title: string;
  createdAt: number;
}
interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}
export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [],
  createTask: (title) => {
    const { tasks } = get();
    const newTask = {
      id: new Date().getTime().toString(36),
      title,
      createdAt: Date.now(),
    };
    set({
      tasks: [newTask].concat(tasks),
    });
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id),
    });
  },
}));
