import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { AppHeader } from "../../src/components/AppHeader";

describe("header", () => {
  afterEach(() => {
    // Clear the screen after each test
    cleanup();
    screen.debug();
  });

  it("should render the app name when given", () => {
    render(<AppHeader appName="test App Name" />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/test app name/i);
  });

  it("should render the default app name", () => {
    render(<AppHeader />);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Comments Feed/i);
  });
});
