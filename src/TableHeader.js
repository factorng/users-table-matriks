import React, { useState } from "react";
import SearchForm from "./SearchForm";
import dynamicSort from "./utils/sort";
import styles from "./TableHeader.module.css";

export default function TableHeader({
  usersToDisplay,
  setUsersToDisplay,
  currentUsers,
}) {
  const [sortCategory, setSortCategory] = useState("");

  const handleTableHeaderClick = (categoryName) => {
    if (categoryName === sortCategory) {
      setSortCategory(`-${categoryName}`);
      setUsersToDisplay([
        ...usersToDisplay.sort(dynamicSort(`-${categoryName}`)),
      ]);
    } else {
      setSortCategory(categoryName);
      setUsersToDisplay([...usersToDisplay.sort(dynamicSort(categoryName))]);
    }
  };

  const showArrow = () => {
    let arrow = "";
    if (sortCategory) {
      arrow = sortCategory.substr(0, 1) === "-" ? "↓" : "↑";
    } else {
      arrow = "↓↑";
    }
    return arrow;
  };

  return (
    <thead>
      <tr>
        <th colSpan="3">
          <SearchForm
            usersToDisplay={usersToDisplay}
            setUsersToDisplay={setUsersToDisplay}
            currentUsers={currentUsers}
          />
        </th>
        <th className={styles.lastCol}></th>
      </tr>
      <tr>
        <th>
          <button
            onClick={() => handleTableHeaderClick("name")}
            className={styles.sortButton}
          >
            {" "}
            Имя {showArrow()}
          </button>
        </th>
        <th>Пол</th>
        <th>Email</th>
        <th className={styles.lastCol}></th>
      </tr>
    </thead>
  );
}
