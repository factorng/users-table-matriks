import React from "react";
import styles from "./TableBody.module.css";
import usePagination from "./hooks/usePagination";

const USERS_PER_PAGE = 10;

export default function TableBody({
  usersToDisplay,
  setUsersToDisplay,
  setUpdateUsers,
  handleChange,
  setCurrentUsers,
  updateUsers,
}) {
  const {
    currentPageData,
    nextPage,
    prevPage,
    prevButtonDisabled,
    nextButtonDisabled,
  } = usePagination(USERS_PER_PAGE, usersToDisplay, updateUsers);
  const handleRowDelete = (user) => {
    const currentUsersAfterDelete = usersToDisplay.filter(
      (usr) => usr.email !== user.email
    );
    if (currentUsersAfterDelete.length) {
      setUsersToDisplay([...currentUsersAfterDelete]);
      setCurrentUsers([...currentUsersAfterDelete]);
      setUpdateUsers(false);
      handleChange("usersCount", currentUsersAfterDelete.length);
    } else setUsersToDisplay([{}]);
  };

  const showData = () => {
    if (Object.keys(usersToDisplay[0]).length) {
      return (
        <>
          <tbody>
            {currentPageData().map((user, i) => (
              <tr key={i}>
                <td key={user.name}>{user.name}</td>
                <td key={user.gender}>{user.gender}</td>
                <td key={user.email}>{user.email}</td>
                <td key={i + "delete"} className={styles.lastCol}>
                  <button
                    onClick={() => {
                      handleRowDelete(user);
                    }}
                    className={styles.deleteButton}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className={styles.controlls}>
                <button
                  onClick={() => prevPage()}
                  className={styles.pageButton}
                  disabled={prevButtonDisabled()}
                >
                  Предыдущая стр
                </button>
                <button
                  onClick={() => nextPage()}
                  className={styles.pageButton}
                  disabled={nextButtonDisabled()}
                >
                  Следующая стр
                </button>
              </td>
            </tr>
          </tfoot>
        </>
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
