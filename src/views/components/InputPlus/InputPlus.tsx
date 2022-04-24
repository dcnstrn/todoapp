import { useCallback, useState } from "react";
import styles from "./InputPlus.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  return (
    <div className={styles.inputPlus}>
      <input
        className={styles.inputPlusValue}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        placeholder="type here..."
      />
      <button
        className={styles.inputPlusButton}
        onClick={addTask}
        aria-label="Add"
      ></button>
    </div>
  );
};

export default InputPlus;
