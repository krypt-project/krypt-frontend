import { render, screen } from "@testing-library/react"; 
import {Card} from "../Card";
  
  describe("Card component (auto-generated)", () => {
    it("renders children", () => {
      render(<Card>Test</Card>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
    it("handles variant='default'", () => {
      render(<Card variant="default">variant-default</Card>);
      expect(screen.getByText("variant-default")).toBeInTheDocument();
    });
  
    it("handles variant='feature'", () => {
      render(<Card variant="feature">variant-feature</Card>);
      expect(screen.getByText("variant-feature")).toBeInTheDocument();
    });
  
    it("handles variant='pricing'", () => {
      render(<Card variant="pricing">variant-pricing</Card>);
      expect(screen.getByText("variant-pricing")).toBeInTheDocument();
    });
  
    it("handles variant='ghost'", () => {
      render(<Card variant="ghost">variant-ghost</Card>);
      expect(screen.getByText("variant-ghost")).toBeInTheDocument();
    });
  
    it("handles variant='auth'", () => {
      render(<Card variant="auth">variant-auth</Card>);
      expect(screen.getByText("variant-auth")).toBeInTheDocument();
    });
  });