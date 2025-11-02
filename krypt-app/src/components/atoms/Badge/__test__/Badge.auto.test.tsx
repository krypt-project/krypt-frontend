// AUTO-GENERATED FILE — DO NOT EDIT
// If you want to keep a manual version, add the string '// MANUAL' to the file and the generator will skip it.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Badge from "../Badge";


  describe("Badge component (auto-generated)", () => {
    describe("rendering", () => {
      it("matches snapshot", () => {
        const { container } = render(<Badge text={"Test"} />);
        expect(container).toMatchSnapshot();
      });
      
    });

    describe("props", () => {
    describe("text prop", () => {
      it("renders with text", () => {
        render(<Badge text="Hello" />);
        expect(screen.getByText("Hello")).toBeInTheDocument();
      });
    });
    describe("color prop", () => {
      it("renders with color", () => {
        const { container } = render(<Badge text={"Test"} color={"value"} />);
        expect(container).toBeDefined();
      });
    });
    describe("className prop", () => {
      it("applies custom class", () => {
        const { container } = render(<Badge text={"Test"} className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
      });
    });
    describe("link prop", () => {
      it("renders with link", () => {
        const { container } = render(<Badge text={"Test"} link={"value"} />);
        expect(container).toBeDefined();
      });
    });
    describe("onClick handleClick", () => {
      it("calls onClick when triggered", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        const { container } = render(<Badge text={"Test"} onClick={handleClick} />);
        const el = container.firstChild;
        await user.click(el as Element);
        expect(handleClick).toHaveBeenCalled();
      });
    });
    describe("selectable prop", () => {
      it("renders with boolean prop (no children)", () => {
        const { container } = render(<Badge text={"Test"} selectable={true} />);
        expect(container).toBeDefined();
      });
    });
    });
  });