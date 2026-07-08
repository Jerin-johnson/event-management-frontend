import { useCallback, useMemo, useState } from "react";
import useClickOutside from "./useClickOutside";

export default function useDropdown({
  options = [],
  selected,
  onChange,
  placeholder = "Select...",
  isMulti = false,
  onAddNew,
  labelKey = "name",
  valueKey = "id",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const selectedItems = useMemo(() => {
    if (isMulti) return selected ?? []; //is array return same else obj return as array

    return selected ? [selected] : [];
  }, [selected, isMulti]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setShowAddInput(false);
    setNewItemName("");
  }, []);

  const wrapperRef = useClickOutside(closeDropdown);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const filteredOptions = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) return options;

    return options.filter((item) =>
      String(item[labelKey] ?? "")
        .toLowerCase()
        .includes(searchValue),
    );
  }, [options, search, labelKey]);

  const toggleOption = useCallback(
    (item) => {
      if (isMulti) {
        const exists = selectedItems.some(
          (selectedItem) => selectedItem[valueKey] === item[valueKey],
        );

        if (exists) {
          onChange(
            selectedItems.filter(
              (selectedItem) => selectedItem[valueKey] !== item[valueKey],
            ),
          );
        } else {
          onChange([...selectedItems, item]);
        }

        return;
      }

      onChange(item);
      closeDropdown();
    },
    [isMulti, selectedItems, onChange, valueKey, closeDropdown],
  );

  const handleAddNew = useCallback(() => {
    const value = newItemName.trim();

    if (!value) return;

    if (!onAddNew) return;

    const alreadyExists = options.some(
      (item) =>
        String(item[labelKey]).toLowerCase().trim() === value.toLowerCase(),
    );

    if (alreadyExists) {
      setNewItemName("");
      setShowAddInput(false);
      return;
    }

    onAddNew(value);

    setNewItemName("");
    setShowAddInput(false);
    setSearch("");
  }, [newItemName, onAddNew, options, labelKey]);

  const displayText = useMemo(() => {
    if (isMulti) {
      return selectedItems.length
        ? `${selectedItems.length} profiles selected`
        : placeholder;
    }

    return selected?.[labelKey] || placeholder;
  }, [isMulti, selectedItems, selected, placeholder, labelKey]);

  return {
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

    closeDropdown,
  };
}
