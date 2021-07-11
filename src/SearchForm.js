import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";

export default function SearchForm({
  usersToDisplay,
  setUsersToDisplay,
  currentUsers,
  handleChange,
  setUpdateUsers,
}) {
  const [inputSearch, setInputSearch] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [fields, setFields] = useState([]);
  const [searchHints, setSearchHints] = useState([]);
  const [findedUsers, setFindedUsers] = useState([]);

  useEffect(() => {
    setFields([...Object.keys(currentUsers[0])]);
    setSelectedField(Object.keys(currentUsers[0])[0]);
  }, [currentUsers]);

  const handleShowFindedUsers = React.useCallback(
    (event) => {
      if (searchHints && event.key === "Enter") {
        setUsersToDisplay([...findedUsers]);
        setSearchHints([]);
        setInputSearch("");
      }
    },
    [searchHints, findedUsers, setUsersToDisplay]
  );

  useEffect(() => {
    function handleResetSearch(event) {
      if (!event.target.className.includes("formHint")) {
        setSearchHints([]);
        setInputSearch("");
      }
    }
    document.addEventListener("click", handleResetSearch);
    return () => document.removeEventListener("click", handleResetSearch);
  }, []);

  useEffect(() => {
    document.addEventListener("keypress", handleShowFindedUsers);
    return () =>
      document.removeEventListener("keypress", handleShowFindedUsers);
  }, [handleShowFindedUsers]);

  const handleSearch = (event) => {
    setInputSearch(event.target.value.toLowerCase());
    const searchQuery = event.target.value.toLowerCase();

    const findedUsers = usersToDisplay.filter((elem) => {
      return elem[selectedField].toLowerCase().indexOf(searchQuery) !== -1;
    });
    let hints = findedUsers.map((elem) => elem[selectedField]);
    hints = hints.filter((v, i, a) => a.indexOf(v) === i);
    setSearchHints([...hints]);
    setFindedUsers([...findedUsers]);
    setUpdateUsers(false);
  };

  const handleHintClick = (hint) => {
    const selectedData = usersToDisplay.filter((elem) => {
      return elem[selectedField] === hint;
    });
    setUsersToDisplay([...selectedData]);
    setSearchHints([]);
    setInputSearch(hint);
    setUpdateUsers(false);
  };
  const handleResetFilters = () => {
    setUsersToDisplay([...currentUsers]);
    setUpdateUsers(false);
    handleChange("usersCount", currentUsers.length);
  };

  const renderSelect = () => {
    const translatedFields = fields.map((name) => {
      switch (name) {
        case "name":
          return "имя";
        case "gender":
          return "пол";
        default:
          return name;
      }
    });

    return (
      <>
        {translatedFields.map((field, i) => (
          <option value={[fields[i]]} key={field}>
            {field}
          </option>
        ))}
      </>
    );
  };

  return (
    <form className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <select
        value={selectedField}
        onChange={(event) => setSelectedField(event.target.value)}
        className={styles.formSelect}
      >
        {renderSelect()}
      </select>
      <div className={styles.inputField}>
        <input
          value={inputSearch}
          onChange={handleSearch}
          className={styles.formInput}
        />
        <div className={styles.formHints}>
          {searchHints.slice(0, 10).map((hint, key) => (
            <p
              className={styles.formHint}
              key={key}
              onClick={() => handleHintClick(hint)}
            >
              {hint}
            </p>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleResetFilters}
        className={styles.formButton}
      >
        Сбросить фильтры
      </button>
    </form>
  );
}
