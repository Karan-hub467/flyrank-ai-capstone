import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("MovieHub", () => {
  it("shows the account creation form", () => {
    render(<App />);

    expect(screen.getByText("MovieHub")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your name")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Create a password")
    ).toBeInTheDocument();
  });
});