import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./Table.module.css";

export default function Table({
  usersToDisplay,
  setUsersToDisplay,
  currentUsers,
  setUpdateUsers,
  handleChange,
  setCurrentUsers,
  updateUsers,
}) {
  return (
    <table className={styles.table}>
      <TableHeader
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
        currentUsers={currentUsers}
        setUpdateUsers={setUpdateUsers}
        handleChange={handleChange}
      />
      <TableBody
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
        handleChange={handleChange}
        setUpdateUsers={setUpdateUsers}
        setCurrentUsers={setCurrentUsers}
        updateUsers={updateUsers}
      />
    </table>
  );
}
