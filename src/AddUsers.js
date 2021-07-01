import React from "react";
import styles from "./AddUsers.module.css";

export default function AddUsers({
  usersCountHandleChange,
  resetForm,
  values,
  isValid,
  errors,
}) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <label>
        Введите количество пользователей для отображения
        <div className={styles.inputField}>
          <input
            id="usersCount"
            type="number"
            value={values.usersCount || ""}
            onChange={usersCountHandleChange}
            name="usersCount"
            min="1"
            max="100"
            required
          />
          <button
            type="button"
            onClick={(event) =>
              resetForm(
                { usersCount: 0 },
                { usersCount: "Пожалуйста, введите число." },
                false
              )
            }
            className={styles.buttonReset}
          >
            очистить
          </button>
          <span
            className={isValid ? styles.inputError : styles.inputErrorActive}
          >
            {errors.usersCount || ""}
          </span>
        </div>
      </label>
    </form>
  );
}
