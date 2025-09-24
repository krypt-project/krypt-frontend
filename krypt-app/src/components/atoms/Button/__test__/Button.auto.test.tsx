// AUTO-GENERATED FILE — DO NOT EDIT
// If you want to keep a manual version, add the string '// MANUAL' to the file and the generator will skip it.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";


  describe("Button component (auto-generated)", () => {
    describe("rendering", () => {
      it("matches snapshot", () => {
        const { container } = render(<Button>Snapshot</Button>);
        expect(container).toMatchSnapshot();
      });
      it("renders children", () => {
        render(<Button>Test</Button>);
        expect(screen.getByText("Test")).toBeInTheDocument();
      });
    });

    describe("props", () => {
    describe("children prop", () => {
      it("renders with children", () => {
        render(<Button>Hello</Button>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
      });
    });
    describe("variant prop (union)", () => {
      
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

      it("handles variant='error'", () => {
        render(<Button variant="error">variant-error</Button>);
        expect(screen.getByText("variant-error")).toBeInTheDocument();
      });

      it("handles variant='warning'", () => {
        render(<Button variant="warning">variant-warning</Button>);
        expect(screen.getByText("variant-warning")).toBeInTheDocument();
      });

      it("handles variant='success'", () => {
        render(<Button variant="success">variant-success</Button>);
        expect(screen.getByText("variant-success")).toBeInTheDocument();
      });
    });
    describe("size prop (union)", () => {
      
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
    });
    describe("rounded prop", () => {
      it("renders correctly when true", () => {
        render(<Button rounded={true}>rounded</Button>);
        expect(screen.getByText("rounded")).toBeInTheDocument();
      });
      it("renders correctly when false", () => {
        render(<Button rounded={false}>rounded</Button>);
        expect(screen.getByText("rounded")).toBeInTheDocument();
      });
    });
    describe("loading prop", () => {
      it("shows loading state when true", () => {
        render(<Button loading>Loading...</Button>);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
      });
      it("renders normally when false", () => {
        render(<Button loading={false}>Normal</Button>);
        expect(screen.getByText("Normal")).toBeInTheDocument();
      });
    });
    describe("icon prop", () => {
      it("renders with icon", () => {
        const { container } = render(<Button icon={"value"}>icon</Button>);
        expect(container.firstChild && container.firstChild.textContent).toContain("icon");
      });
    });
    describe("href prop", () => {
      it("renders with href", () => {
        render(<Button href={"value"}>href</Button>);
        expect(screen.getByText("href")).toBeInTheDocument();
      });
    });
    describe("className prop", () => {
      it("applies custom class", () => {
        const { container } = render(<Button className="custom-class">Styled</Button>);
        expect(container.firstChild).toHaveClass("custom-class");
      });
    });
    describe("title prop", () => {
      it("renders with title", () => {
        render(<Button title={"value"}>title</Button>);
        expect(screen.getByText("title")).toBeInTheDocument();
      });
    });
    describe("onClick handleClick", () => {
      it("calls onClick when triggered", async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Trigger</Button>);
        const el = screen.getByText("Trigger");
        await user.click(el);
        expect(handleClick).toHaveBeenCalled();
      });
    });
    describe("type prop (union)", () => {
      
      it("handles type='button'", () => {
        render(<Button type="button">type-button</Button>);
        expect(screen.getByText("type-button")).toBeInTheDocument();
      });

      it("handles type='submit'", () => {
        render(<Button type="submit">type-submit</Button>);
        expect(screen.getByText("type-submit")).toBeInTheDocument();
      });
    });
    describe("disabled prop", () => {
      it("renders disabled button when true", () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByRole("button")).toBeDisabled();
      });
      it("renders enabled button when false", () => {
        render(<Button disabled={false}>Enabled</Button>);
        expect(screen.getByRole("button")).not.toBeDisabled();
      });
    });
    });
  });