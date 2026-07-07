import { useEffect, useRef, useState } from "react";
import styles from "./DropdownSelector.module.css";
import { CheckIcon, ChevronsUpDown, PlusIcon, Search } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter((item) =>
    item[labelKey]?.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setNewItemName("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (item) => {
    if (isMulti) {
      const isSelected = selected.some((s) => s[valueKey] === item[valueKey]);
      if (isSelected) {
        onChange(selected.filter((s) => s[valueKey] !== item[valueKey]));
      } else {
        onChange([...selected, item]);
      }
    } else {
      onChange([item]);
      setIsOpen(false);
    }
  };

  const handleAddNew = () => {
    if (!newItemName.trim() || !onAddNew) return;
    onAddNew(newItemName.trim());
    setNewItemName("");
    setSearch("");
  };

  const displayText = isMulti
    ? selected.length > 0
      ? `${selected.length} profiles selected`
      : placeholder
    : selected[0]?.[labelKey] || placeholder;

  return (
    <div className={`${styles.container} ${className}`} ref={wrapperRef}>
      <button
        className={`${styles.trigger} ${selected.length > 0 ? styles.triggerActive : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayText}</span>
        <ChevronsUpDown className={styles.chevron} />
      </button>

      {isOpen && (
        <div className={`${styles.dropdown} ${dropdownClassName}`}>
          {/* Search */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
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
              const isSelected = selected.some(
                (s) => s[valueKey] === item[valueKey],
              );
              return (
                <div
                  key={item[valueKey]}
                  className={`${styles.option} ${
                    isSelected ? styles.optionSelected : ""
                  } ${hoveredId === item[valueKey] ? styles.optionHovered : ""}`}
                  onMouseEnter={() => setHoveredId(item[valueKey])}
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
              {!newItemName ? (
                <div
                  className={styles.addNewButton}
                  onClick={() => setNewItemName(" ")}
                >
                  <PlusIcon className={styles.plusIcon} />
                  Add New
                </div>
              ) : (
                <div className={styles.addNewInputContainer}>
                  <input
                    className={styles.addNewInput}
                    placeholder="New profile name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddNew()}
                  />
                  <button className={styles.addButton} onClick={handleAddNew}>
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
