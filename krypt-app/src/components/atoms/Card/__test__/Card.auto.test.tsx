// AUTO-GENERATED FILE — DO NOT EDIT
// If you want to keep a manual version, add the string '// MANUAL' to the file and the generator will skip it.

import { render, screen } from "@testing-library/react";
import { Card } from "../Card";


  describe("Card component (auto-generated)", () => {
    describe("rendering", () => {
      it("matches snapshot", () => {
        const { container } = render(<Card>Snapshot</Card>);
        expect(container).toMatchSnapshot();
      });
      it("renders children", () => {
        render(<Card>Test</Card>);
        expect(screen.getByText("Test")).toBeInTheDocument();
      });
    });

    describe("props", () => {
    describe("children prop", () => {
      it("renders with children", () => {
        render(<Card>Hello</Card>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
      });
    });
    describe("className prop", () => {
      it("applies custom class", () => {
        const { container } = render(<Card className="custom-class">Styled</Card>);
        expect(container.firstChild).toHaveClass("custom-class");
      });
    });
    describe("variant prop (union)", () => {
      
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
    describe("title prop", () => {
      it("renders with title", () => {
        render(<Card title={"value"}>title</Card>);
        expect(screen.getByText("title")).toBeInTheDocument();
      });
    });
    describe("description prop", () => {
      it("renders with description", () => {
        render(<Card description={"value"}>description</Card>);
        expect(screen.getByText("description")).toBeInTheDocument();
      });
    });
    describe("price prop", () => {
      it("renders with price", () => {
        render(<Card price={"value"}>price</Card>);
        expect(screen.getByText("price")).toBeInTheDocument();
      });
    });
    describe("ctaLabel prop", () => {
      it("renders with ctaLabel", () => {
        render(<Card ctaLabel={"value"}>ctaLabel</Card>);
        expect(screen.getByText("ctaLabel")).toBeInTheDocument();
      });
    });
    describe("ctaHref prop", () => {
      it("renders with ctaHref", () => {
        render(<Card ctaHref={"value"}>ctaHref</Card>);
        expect(screen.getByText("ctaHref")).toBeInTheDocument();
      });
    });
    describe("features prop", () => {
      it("renders with an array of strings", () => {
        render(<Card variant="pricing" features={["one", "two"]} />);
        expect(screen.getByText("one")).toBeInTheDocument();
        expect(screen.getByText("two")).toBeInTheDocument();
      });
    });
    });
  });