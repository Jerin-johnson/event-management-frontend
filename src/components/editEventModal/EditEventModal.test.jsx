import EditEventModal from "./EditEventModal";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

describe("EditEventModal", () => {
  it("renders correctly when open", () => {
    const mockEvent = {
      id: 1,
      profiles: ["Profile 1", "Profile 2"],
      timezone: "UTC",
      startDate: "2024-06-01",
      startTime: "09:00",
      endDate: "2024-06-01",
      endTime: "10:00",
    };

    const { getByText } = render(
      <EditEventModal
        isOpen={true}
        onClose={vi.fn()}
        event={mockEvent}
        onSave={vi.fn()}
      />,
    );

    expect(getByText("Edit Event")).toBeInTheDocument();
    expect(getByText("Profiles")).toBeInTheDocument();
    expect(getByText("Update Event")).toBeInTheDocument();
  });
});
