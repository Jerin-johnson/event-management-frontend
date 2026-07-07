import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./DropdownSelectr";

describe("Select", () => {
  const options = [
    { value: "1", label: "Jerin" },
    { value: "2", label: "John" },
  ];

  test("renders label", () => {
    render(<Select label="Profile" options={options} />);

    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  test("renders options", () => {
    render(<Select options={options} />);

    expect(screen.getByRole("option", { name: "Jerin" })).toBeInTheDocument();

    expect(screen.getByRole("option", { name: "John" })).toBeInTheDocument();
  });
});
