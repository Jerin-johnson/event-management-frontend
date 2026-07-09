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
  const [newItemName, setNewItemName] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const selectedItems = useMemo(() => {
    if (isMulti) return selected ?? []; //is array return same else obj return as array

    return selected ? [selected] : [];
  }, [selected, isMulti]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setShowAddInput(false);
    setNewItemName("");
  }, []);

  const wrapperRef = useClickOutside(closeDropdown);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

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

  const handleAddNew = useCallback(async () => {
    const value = newItemName.trim();
    if (!value) return;
    try {
      await onAddNew(value);
      setNewItemName("");
      setShowAddInput(false);
    } catch (error) {
      console.log(error);
    }
  }, [newItemName, onAddNew]);

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
    newItemName,
    showAddInput,
    displayText,
    selectedItems,
    setNewItemName,
    setShowAddInput,
    toggleDropdown,
    toggleOption,
    handleAddNew,
    closeDropdown,
  };
}
