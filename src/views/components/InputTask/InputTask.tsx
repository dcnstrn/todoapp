import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./InputTask.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (title: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  // фокус на инпут при редактировании
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          className={styles.inputTaskCheckbox}
          disabled={isEditMode}
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              onDone(id);
            }
          }}
        />
        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            className={styles.inputTaskTitleEdit}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(!isEditMode);
              }
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(!isEditMode);
          }}
        ></button>
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
        ></button>
      )}

      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            onRemoved(id);
          }
        }}
      ></button>
    </div>
  );
};

export default InputTask;
