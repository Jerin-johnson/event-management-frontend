import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProfileForm from "./ProfileForm";

describe("ProfileForm", () => {
  test("renders input and button", () => {
    render(<ProfileForm onSubmit={() => {}} />);

    expect(
      screen.getByPlaceholderText(/enter profile name/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /add profile/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls onSubmit", async () => {
    const user = userEvent.setup();

    const handleSubmit = vi.fn();

    render(<ProfileForm onSubmit={handleSubmit} />);

    const input = screen.getByPlaceholderText(/enter profile name/i);

    await user.type(input, "Jerin");

    await user.click(
      screen.getByRole("button", {
        name: /add profile/i,
      }),
    );

    expect(handleSubmit).toHaveBeenCalledWith("Jerin");
  });
});
