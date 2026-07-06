import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "./Select";

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

  //   test("changes selected value", async () => {
  //     const user = userEvent.setup();

  //     render(<Select options={options} value="" onChange={() => {}} />);

  //     const select = screen.getByRole("combobox");

  //     await user.selectOptions(select, "2");

  //     expect(select).toHaveValue("2");
  //   });
});
