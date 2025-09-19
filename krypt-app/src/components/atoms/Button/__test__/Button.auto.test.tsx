import { render, screen } from "@testing-library/react"; 
import userEvent from "@testing-library/user-event";
import Button from "../Button";
  
  describe("Button component (auto-generated)", () => {
    it("renders children", () => {
      render(<Button>Test</Button>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
    it("handles variant='default'", () => {
      render(<Button variant="default">variant-default</Button>);
      expect(screen.getByText("variant-default")).toBeInTheDocument();
    });
  
    it("handles variant='outlined'", () => {
      render(<Button variant="outlined">variant-outlined</Button>);
      expect(screen.getByText("variant-outlined")).toBeInTheDocument();
    });
  
    it("handles variant='gradient'", () => {
      render(<Button variant="gradient">variant-gradient</Button>);
      expect(screen.getByText("variant-gradient")).toBeInTheDocument();
    });
  
    it("handles variant='link'", () => {
      render(<Button variant="link">variant-link</Button>);
      expect(screen.getByText("variant-link")).toBeInTheDocument();
    });
  
    it("handles variant='sidebar'", () => {
      render(<Button variant="sidebar">variant-sidebar</Button>);
      expect(screen.getByText("variant-sidebar")).toBeInTheDocument();
    });
  
    it("handles size='sm'", () => {
      render(<Button size="sm">size-sm</Button>);
      expect(screen.getByText("size-sm")).toBeInTheDocument();
    });
  
    it("handles size='md'", () => {
      render(<Button size="md">size-md</Button>);
      expect(screen.getByText("size-md")).toBeInTheDocument();
    });
  
    it("handles size='lg'", () => {
      render(<Button size="lg">size-lg</Button>);
      expect(screen.getByText("size-lg")).toBeInTheDocument();
    });
  
    it("handles rounded=true", () => {
      render(<Button rounded={true}>rounded</Button>);
      expect(screen.getByText("rounded")).toBeInTheDocument();
    });
    it("handles rounded=false", () => {
      render(<Button rounded={false}>rounded</Button>);
      expect(screen.getByText("rounded")).toBeInTheDocument();
    });
  
    it("handles loading=true", () => {
      render(<Button loading={true}>loading</Button>);
      expect(screen.getByText("loading")).toBeInTheDocument();
    });
    it("handles loading=false", () => {
      render(<Button loading={false}>loading</Button>);
      expect(screen.getByText("loading")).toBeInTheDocument();
    });
  
    it("handles type='button'", () => {
      render(<Button type="button">type-button</Button>);
      expect(screen.getByText("type-button")).toBeInTheDocument();
    });
  
    it("handles type='submit'", () => {
      render(<Button type="submit">type-submit</Button>);
      expect(screen.getByText("type-submit")).toBeInTheDocument();
    });
  
    it("handles disabled=true", () => {
      render(<Button disabled={true}>disabled</Button>);
      expect(screen.getByText("disabled")).toBeInTheDocument();
    });
    it("handles disabled=false", () => {
      render(<Button disabled={false}>disabled</Button>);
      expect(screen.getByText("disabled")).toBeInTheDocument();
    });
  });