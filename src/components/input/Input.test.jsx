import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

describe("Input", () => {
  it("renders label", () => {
    render(<Input label="Profile Name" />);

    expect(screen.getByText(/profile name/i)).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input placeholder="Enter name" />);

    expect(screen.getByPlaceholderText(/enter name/i)).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();

    render(<Input placeholder="Name" />);

    const input = screen.getByPlaceholderText(/name/i);

    await user.type(input, "Jerin");

    expect(input).toHaveValue("Jerin");
  });

  it("renders error message", () => {
    render(<Input error="Required field" />);

    expect(screen.getByText(/required field/i)).toBeInTheDocument();
  });
});
