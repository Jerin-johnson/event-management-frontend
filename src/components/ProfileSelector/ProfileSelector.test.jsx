import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileSelector from "./ProfileSelector";

describe("ProfileSelector", () => {
  test("opens dropdown", async () => {
    const user = userEvent.setup();

    render(<ProfileSelector />);

    await user.click(
      screen.getByRole("button", {
        name: /anuj/i,
      }),
    );

    expect(
      screen.getByPlaceholderText(/search current profile/i),
    ).toBeInTheDocument();
  });

  test("adds profile", async () => {
    const user = userEvent.setup();

    render(<ProfileSelector />);

    await user.click(screen.getByRole("button"));

    await user.type(screen.getByPlaceholderText(/profile name/i), "beta");

    await user.click(
      screen.getByRole("button", {
        name: /add/i,
      }),
    );

    expect(screen.getByText("beta")).toBeInTheDocument();
  });
});
