import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders placeholder text", () => {
  render(<App />);
  const placeholder = screen.getByText(/One day there/i);
  expect(placeholder).toBeInTheDocument();
});
