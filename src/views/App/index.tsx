import styles from "./index.module.scss";
import { useToDoStore } from "../../data/stores/useToDoStore";
import { useEffect } from "react";
import { generatedId } from "../../data/helpers";
import InputPlus from "../components/InputPlus/InputPlus";
import InputTask from "../components/InputTask/InputTask";

export const App: React.FC = () => {
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ]);

  
  return (
    <div className={styles.article}>
      <div className={styles.wrapper}>
        <h1 className={styles.articleTitle}>To Do App</h1>
        <section className={styles.articleSection}>
          <InputPlus
            onAdd={(title) => {
              if (title) {
                createTask(title);
              }
            }}
          />
        </section>
      </div>
      <section className={styles.articleSection}>
        {!tasks.length && (
          <p className={styles.articleText}>There is no one task</p>
        )}
        {tasks.map((todo) => (
          <InputTask
            key={todo.id}
            id={todo.id}
            title={todo.title}
            onDone={() => {}}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </div>
  );
};
