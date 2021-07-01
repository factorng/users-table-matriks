import React, { useEffect, useState } from "react";
import Table from "./Table";
import useDebounce from "./hooks/useDebounce";
import useFormWithValidation from "./hooks/formWithValidation";
import getUsers from "./utils/api";
import styles from "./App.module.css";
import AddUsers from "./AddUsers";

const INITIAL_USERS_COUNT = 10;

function App() {
  const [currentUsers, setCurrentUsers] = useState([{}]);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const usersCountInputDebounced = useDebounce(values.usersCount, 500, isValid);
  const [usersToDisplay, setUsersToDisplay] = useState([{}]);

  useEffect(() => {
    resetForm({ usersCount: INITIAL_USERS_COUNT }, { usersCount: "" }, true);
    if (localStorage.getItem("usersCount")) {
      resetForm(
        { usersCount: localStorage.getItem("usersCount") },
        { usersCount: "" },
        true
      );
      localStorage.removeItem("usersCount");
    } else {
      localStorage.setItem("usersCount", INITIAL_USERS_COUNT);
    }
  }, [resetForm]);

  useEffect(() => {
    getUsers(usersCountInputDebounced)
      .then((users) => {
        setCurrentUsers(
          users.map((user) => {
            const renamedGender =
              user.gender === "male" ? "мужской" : "женский";
            return {
              name: `${user.name.title} ${user.name.first} ${user.name.last}`,
              gender: renamedGender,
              email: user.email,
            };
          })
        );
        setUsersToDisplay(
          users.map((user) => {
            const renamedGender =
              user.gender === "male" ? "мужской" : "женский";
            return {
              name: `${user.name.title} ${user.name.first} ${user.name.last}`,
              gender: renamedGender,
              email: user.email,
            };
          })
        );
      })
      .catch((err) => console.log(err));
    localStorage.setItem("usersCount", usersCountInputDebounced);
  }, [usersCountInputDebounced]);

  // если нет юзеров заглушка "нет пользователей"
  const usersCountHandleChange = (event) => {
    handleChange(event);
  };

  return (
    <div className={styles.app}>
      <AddUsers
        usersCountHandleChange={usersCountHandleChange}
        resetForm={resetForm}
        values={values}
        isValid={isValid}
        errors={errors}
      />
      <Table
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
        currentUsers={currentUsers}
      />
    </div>
  );
}

export default App;
