// // Button.test.tsx
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Button from "../Button";

// const variants = {
//   default: "bg-[var(--primary)] text-white hover:bg-[var(--background-3)]",
//   outlined:
//     "border border-[var(--border)] text-[var(--foreground)] bg-[var(--background)]/70 hover:bg-[var(--secondary)]",
//   gradient:
//     "bg-gradient-to-r from-[var(--background-2)] to-[var(--primary)] text-white hover:opacity-90",
//   link: "text-sm text-gray-500 hover:text-black transition-colors focus:outline-none focus:ring-0",
//   sidebar: "p-2 rounded hover:bg-gray-200 transition cursor-pointer",
// } as const;

// const sizes = {
//   sm: "px-3 py-1.5 text-sm",
//   md: "px-4 py-2 text-base",
//   lg: "px-6 py-3 text-lg",
// } as const;

// type VariantKey = keyof typeof variants;
// type SizeKey = keyof typeof sizes;

// describe("Button component", () => {
//   it("renders children correctly", () => {
//     render(<Button>Click me</Button>);
//     expect(screen.getByText("Click me")).toBeInTheDocument();
//   });

//   Object.entries(variants).forEach(([variant, expectedClass]) => {
//     it(`applies correct class for ${variant}`, () => {
//       render(<Button variant={variant as VariantKey}>{variant}</Button>);
//       const btn = screen.getByRole("button", { name: variant });
//       expect(btn).toHaveClass(expectedClass);

//       expectedClass.split(" ").forEach((className) => {
//         expect(btn.className).toContain(className);
//       });
//     });
//   });

//   Object.entries(sizes).forEach(([size, expectedClass]) => {
//     it(`applies correct class for ${size}`, () => {
//       render(<Button size={size as SizeKey}>{size}</Button>);
//       const btn = screen.getByRole("button", { name: size });
//       expect(btn).toHaveClass(expectedClass);

//       expectedClass.split(" ").forEach((className) => {
//         expect(btn.className).toContain(className);
//       });
//     });
//   });

//   it("applies rounded-full when rounded is true", () => {
//     render(<Button rounded>Rounded</Button>);
//     const btn = screen.getByRole("button", { name: "Rounded" });
//     expect(btn).toHaveClass("rounded-full");
//   });

//   it("disabled button when loading=true ", () => {
//     render(<Button loading>Loading</Button>);
//     const btn = screen.getByRole("button", { name: "Loading" });
//     expect(btn).toBeDisabled();
//   });
//   it("disabled button when disabled=true", () => {
//     render(<Button disabled>Disabled</Button>);
//     expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
//   });

//   it("renders as a link when href is provided", () => {
//     render(<Button href="/dashboard">Go</Button>);
//     const link = screen.getByRole("link", { name: "Go" });
//     expect(link).toHaveAttribute("href", "/dashboard");
//   });

//   it("call OnClick when click", async () => {
//     const user = userEvent.setup();
//     const handleClick = jest.fn();
//     render(<Button onClick={handleClick}>Click</Button>);
//     await user.click(screen.getByRole("button", { name: "Click" }));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });

//   it("add atribut if provided", () => {
//     render(<Button title="Tooltip">Hover me</Button>);
//     expect(screen.getByRole("button", { name: "Hover me" })).toHaveAttribute(
//       "title",
//       "Tooltip"
//     );
//   });
// });
