import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders animals", () => {
  render(<App />);
  const dogElement = screen.getByText(/Dog/i);
  const listItems = screen.getAllByRole("listitem");
  expect(dogElement).toBeInTheDocument();
  expect(listItems.length).toEqual(5);
});
