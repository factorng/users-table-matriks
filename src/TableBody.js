import React from "react";
import styles from "./TableBody.module.css";

export default function TableBody({ usersToDisplay, setUsersToDisplay }) {
  const handleRowDelete = (user) => {
    const currentUsersAfterDelete = usersToDisplay.filter(
      (usr) => usr.email !== user.email
    );
    if (currentUsersAfterDelete.length)
      setUsersToDisplay([...currentUsersAfterDelete]);
    else setUsersToDisplay([{}]);
  };

  const showData = () => {
    if (Object.keys(usersToDisplay[0]).length) {
      return (
        <tbody>
          {usersToDisplay.map((user, i) => (
            <tr key={i}>
              <td key={user.name}>{user.name}</td>
              <td key={user.gender}>{user.gender}</td>
              <td key={user.email}>{user.email}</td>
              <td key={i + "delete"} className={styles.lastCol}>
                <button
                  onClick={() => handleRowDelete(user)}
                  className={styles.deleteButton}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      );
    } else
      return (
        <tbody>
          <tr>
            <td className={styles.info} colSpan="4">
              нет пользователей для отображения
            </td>
          </tr>
        </tbody>
      );
  };

  return showData();
}
