import React, { useState, useEffect } from "react";
import styles from "./SearchForm.module.css";

export default function SearchForm({
  usersToDisplay,
  setUsersToDisplay,
  currentUsers,
}) {
  const [inputSearch, setInputSearch] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [fields, setFields] = useState([]);
  const [searchHints, setSearchHints] = useState([]);

  useEffect(() => {
    setFields([...Object.keys(usersToDisplay[0])]);
    setSelectedField(Object.keys(usersToDisplay[0])[0]);
  }, [usersToDisplay]);

  useEffect(() => {
    function handleResetSearch() {
      setSearchHints([]);
      setInputSearch("");
    }
    document.addEventListener("click", handleResetSearch);
    return () => document.removeEventListener("click", handleResetSearch);
  });

  const handleSearch = (event) => {
    setInputSearch(event.target.value.toLowerCase());
    const searchQuery = event.target.value.toLowerCase();

    let findedUsers = usersToDisplay.filter((elem) => {
      return elem[selectedField].toLowerCase().indexOf(searchQuery) !== -1;
    });
    let hints = findedUsers.map((elem) => elem[selectedField]);
    hints = hints.filter((v, i, a) => a.indexOf(v) === i);
    setSearchHints([...hints]);
  };

  const handleHintClick = (hint) => {
    const selectedData = usersToDisplay.filter((elem) => {
      return elem[selectedField] === hint;
    });
    setUsersToDisplay([...selectedData]);
    setSearchHints([]);
    setInputSearch("");
  };
  const handleResetFilters = () => {
    setUsersToDisplay([...currentUsers]);
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
      <button
        type="button"
        onClick={handleResetFilters}
        styles={styles.formButton}
      >
        Сбросить фильтры
      </button>
    </form>
  );
}
