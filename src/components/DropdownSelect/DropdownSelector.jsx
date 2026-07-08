import styles from "./DropdownSelector.module.css";
import { CheckIcon, ChevronsUpDown, PlusIcon, Search } from "lucide-react";
import useDropdown from "../../hooks/useDropdown";

function Dropdown({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select...",
  isMulti = false,
  showAddNew = false,
  onAddNew,
  labelKey = "name",
  valueKey = "id",
  className = "",
  dropdownClassName = "",
  searchPlaceHolderValue = "Search...",
}) {
  const {
    wrapperRef,
    isOpen,
    search,
    newItemName,
    showAddInput,
    filteredOptions,
    displayText,
    selectedItems,
    setSearch,
    setNewItemName,
    setShowAddInput,
    toggleDropdown,
    toggleOption,
    handleAddNew,
  } = useDropdown({
    options,
    selected,
    onChange,
    placeholder,
    isMulti,
    onAddNew,
    labelKey,
    valueKey,
  });

  console.log(filteredOptions);

  return (
    <div ref={wrapperRef} className={`${styles.container} ${className}`}>
      <button
        type="button"
        className={`${styles.trigger}`}
        onClick={toggleDropdown}
      >
        <span>{displayText}</span>

        <ChevronsUpDown className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${dropdownClassName}`}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />

            <input
              autoFocus
              className={styles.searchInput}
              placeholder={searchPlaceHolderValue}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.optionsList}>
            {filteredOptions.length === 0 && (
              <div className={styles.noResults}>No results found</div>
            )}

            {filteredOptions.map((item) => {
              const isSelected = selectedItems.some(
                (selectedItem) => selectedItem[valueKey] === item[valueKey],
              );

              return (
                <div
                  key={item[valueKey]}
                  className={`${styles.option} ${
                    isSelected ? styles.optionSelected : ""
                  }`}
                  onClick={() => toggleOption(item)}
                >
                  <span className={styles.optionText}>
                    {isSelected && isMulti && (
                      <CheckIcon className={styles.checkIcon} />
                    )}

                    {item[labelKey]}
                  </span>
                </div>
              );
            })}
          </div>

          {showAddNew && (
            <div className={styles.addNewSection}>
              {!showAddInput ? (
                <div
                  className={styles.addNewButton}
                  onClick={() => setShowAddInput(true)}
                >
                  <PlusIcon className={styles.plusIcon} />
                  Add New
                </div>
              ) : (
                <div className={styles.addNewInputContainer}>
                  <input
                    autoFocus
                    className={styles.addNewInput}
                    placeholder="New Profile"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddNew();
                      }
                    }}
                  />

                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={handleAddNew}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
