import styles from "./DropdownSelector.module.css";
import { CheckIcon, ChevronsUpDown, PlusIcon, Search } from "lucide-react";
import useDropdown from "../../hooks/useDropdown";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

function Dropdown({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  error,
  refetch,
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
  isLoading = false,
  setSearch,
  search = "",
}) {
  const {
    wrapperRef,
    isOpen,
    newItemName,
    showAddInput,
    displayText,
    selectedItems,
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

  const lastItemRef = useIntersectionObserver({
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: fetchNextPage,
  });

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
            {error && (
              <div className={styles.error}>
                <p>Unable to load profiles.</p>

                <button onClick={refetch}>Retry</button>
              </div>
            )}
            {isLoading ? (
              <div className={styles.loading}>Loading profiles...</div>
            ) : options.length === 0 ? (
              <div className={styles.noResults}>No results found</div>
            ) : (
              options.map((item, index) => {
                const isLast = index === options.length - 1;
                const isSelected = selectedItems.some(
                  (selectedItem) => selectedItem[valueKey] === item[valueKey],
                );

                return (
                  <div
                    ref={isLast ? lastItemRef : null}
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
              })
            )}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                    onClick={handleAddNew}
                  >
                    {isLoading ? "Adding..." : "Add"}
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
