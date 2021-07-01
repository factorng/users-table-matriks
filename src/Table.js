import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import styles from "./Table.module.css";

export default function Table({
  usersToDisplay,
  setUsersToDisplay,
  currentUsers,
}) {
  return (
    <table className={styles.table}>
      <TableHeader
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
        currentUsers={currentUsers}
      />
      <TableBody
        usersToDisplay={usersToDisplay}
        setUsersToDisplay={setUsersToDisplay}
      />
    </table>
  );
}
