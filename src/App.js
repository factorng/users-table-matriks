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
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    handleChangeValueManually,
  } = useFormWithValidation();
  const usersCountInputDebounced = useDebounce(values.usersCount, 500, isValid);
  const [usersToDisplay, setUsersToDisplay] = useState([{}]);
  const [updateUsers, setUpdateUsers] = useState(true);

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
    if (updateUsers)
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
  }, [usersCountInputDebounced, updateUsers]);

  const usersCountHandleChange = (event) => {
    setUpdateUsers(true);
    handleChange(event);
  };

  return (
    <div className={styles.app}>
      <AddUsers
        usersCountHandleChange={usersCountHandleChange}
        handleChange={handleChangeValueManually}
        setUpdateUsers={setUpdateUsers}
        resetForm={resetForm}
        values={values}
        isValid={isValid}
        errors={errors}
      />
      <Table
        handleChange={handleChangeValueManually}
        setUpdateUsers={setUpdateUsers}
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
        currentUsers={currentUsers}
        setCurrentUsers={setCurrentUsers}
        updateUsers={updateUsers}
      />
    </div>
  );
}

export default App;
