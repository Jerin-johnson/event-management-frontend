import styles from "./DropdownSelector.module.css";
import { CheckIcon, ChevronsUpDown, PlusIcon, Search } from "lucide-react";
import useDropdown from "../../hooks/useDropdown";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import ErrorState from "../uiState/ErrorState";
import LoadingState from "../uiState/LoadingState";
import EmptyState from "../uiState/EmptyState";
import { useState } from "react";

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
  loadingText = "Loading...",
  loadingMoreText = "Loading more...",
  emptyText = "No results found.",
  errorText = "Something went wrong.",
  retryButtonText = "Retry",
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

  const [activeId, setActiveId] = useState(null);

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
            {error ? (
              <ErrorState
                text={errorText}
                retryButtonText={retryButtonText}
                onRetry={refetch}
              />
            ) : isLoading ? (
              <LoadingState text={loadingText} />
            ) : options.length === 0 ? (
              <EmptyState text={emptyText} />
            ) : (
              <>
                {options.map((item, index) => {
                  const isLast = index === options.length - 1;

                  const isSelected = selectedItems.some(
                    (selectedItem) => selectedItem[valueKey] === item[valueKey],
                  );

                  return (
                    <div
                      onMouseEnter={() => setActiveId(item[valueKey])}
                      key={item[valueKey]}
                      ref={isLast ? lastItemRef : null}
                      className={`${styles.option} ${
                        isSelected ? styles.optionSelected : ""
                      } ${activeId === item[valueKey] ? styles.optionHovered : ""}`}
                      onClick={() => toggleOption(item)}
                    >
                      <span className={styles.optionText}>
                        {isSelected && (
                          <CheckIcon className={styles.checkIcon} />
                        )}

                        {item[labelKey]}
                      </span>
                    </div>
                  );
                })}

                {isFetchingNextPage && <LoadingState text={loadingMoreText} />}
              </>
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
