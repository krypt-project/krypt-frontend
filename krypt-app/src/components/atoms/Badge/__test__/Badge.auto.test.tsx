import { render, screen } from "@testing-library/react"; 
import Badge from "../Badge";
  
  describe("Badge component (auto-generated)", () => {
    it("renders children", () => {
      render(<Badge>Test</Badge>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });});