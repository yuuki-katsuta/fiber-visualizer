import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Test } from "./sample";

describe("test", () => {
  test("sample test", async () => {
    render(<Test />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("test components")).toBeInTheDocument();
  });
});
