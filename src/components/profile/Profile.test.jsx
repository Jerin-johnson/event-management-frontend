import { render, screen } from "@testing-library/react";

import Profile from "./Profile";

describe("Profile", () => {
  test("renders heading", () => {
    render(<Profile />);

    expect(screen.getByText(/profile management/i)).toBeInTheDocument();
  });
});
