import { render, screen } from "@testing-library/react";
import App from "../App";
import Header from "../NavBar.js";

test("renders navbar element", () => {
  render(<Header />);
  const navBarElement = screen.getByText(/React Navbar Example/i);
  expect(navBarElement).toBeInTheDocument();
});

test("renders \"Press Me\" button", () => {
  render(<App />);
  const buttonElement = screen.getByText(/Press Me/i);
  expect(buttonElement).toBeInTheDocument();
});
