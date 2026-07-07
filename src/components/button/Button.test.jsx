import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Add Profile</Button>);

    expect(
      screen.getByRole("button", { name: /add profile/i }),
    ).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click Me</Button>);

    await user.click(screen.getByRole("button", { name: /click me/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled", () => {
    render(<Button disabled>Save</Button>);

    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });
});
