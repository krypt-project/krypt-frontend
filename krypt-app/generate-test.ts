import ts from "typescript";
import fs from "fs";
import path from "path";

const testFolder = "./src/components/atoms/";

// CLI flags
const argv = process.argv.slice(2);
const NO_OVERWRITE = argv.includes("--no-overwrite");
const DRY_RUN = argv.includes("--dry-run");

const entries = fs.readdirSync(testFolder, { withFileTypes: true });

const folders = entries
  .filter((dirent) => dirent.isDirectory())
  .map((d) => d.name);

function isEventHandler(prop: string, type: string) {
  return prop.startsWith("on") && type.includes("=>");
}

function generateTestForProp(
  prop: string,
  type: string,
  component: string,
  hasChildren: boolean,
  minimalProps: string
) {
  // Build a version of minimalProps without the currently tested prop to avoid duplicates
  const minimalWithout = (() => {
    if (!minimalProps) return "";
    const re = new RegExp(
      `\\b${prop}\\s*=\\s*(\\{[^}]*\\}|"[^"]*"|'[^']*')\\s*`,
      "g"
    );
    return minimalProps.replace(re, "").trim();
  })();

  if (prop === "label") {
    return `
    describe("label prop", () => {
      it("renders label text", () => {
        render(<${component} ${minimalWithout} label={"Email"} />);
        expect(screen.getByText("Email")).toBeInTheDocument();
      });
    });`;
  }

  if (prop === "error") {
    return `
    describe("error prop", () => {
      it("renders error text", () => {
        render(<${component} ${minimalWithout} error={"Required"} />);
        expect(screen.getByText("Required")).toBeInTheDocument();
      });
    });`;
  }

  if (prop === "disabled") {
    if (hasChildren) {
      return `
    describe("${prop} prop", () => {
      it("renders disabled button when true", () => {
        render(<${component} disabled>Disabled</${component}>);
        expect(screen.getByRole("button")).toBeDisabled();
      });
      it("renders enabled button when false", () => {
        render(<${component} disabled={false}>Enabled</${component}>);
        expect(screen.getByRole("button")).not.toBeDisabled();
      });
    });`;
    }
    return `
    describe("${prop} prop", () => {
      it("renders with disabled prop (no children)", () => {
        const { container } = render(<${component} ${minimalWithout} disabled />);
        expect(container).toBeDefined();
      });
    });`;
  }

  if (prop === "className") {
    if (hasChildren) {
      return `
    describe("${prop} prop", () => {
      it("applies custom class", () => {
        const { container } = render(<${component} className="custom-class">Styled</${component}>);
        expect(container.firstChild).toHaveClass("custom-class");
      });
    });`;
    }
    return `
    describe("${prop} prop", () => {
      it("applies custom class", () => {
        const { container } = render(<${component} ${minimalWithout} className="custom-class" />);
        expect(container.firstChild).toHaveClass("custom-class");
      });
    });`;
  }

  if (isEventHandler(prop, type)) {
    if (hasChildren) {
      return `
    describe("${prop} handle", () => {
      it("calls ${prop} when triggered", async () => {
        const user = userEvent.setup();
        const handle = jest.fn();
        render(<${component} ${prop}={handle}>Trigger</${component}>);
        const el = screen.getByText("Trigger");
        await user.click(el);
        expect(handle).toHaveBeenCalled();
      });
    });`;
    }
    return `
    describe("${prop} handle", () => {
      it("calls ${prop} when triggered", async () => {
        const user = userEvent.setup();
        const handle = jest.fn();
        const { container } = render(<${component} ${minimalWithout} ${prop}={handle} />);
        const el = container.firstChild as Element;
        await user.click(el);
        expect(handle).toHaveBeenCalled();
      });
    });`;
  }

  // Generic fallback
  if (hasChildren) {
    return `
    describe("${prop} prop", () => {
      it("renders with ${prop}", () => {
        render(<${component} ${prop}={"value"}>${prop}</${component}>);
        expect(screen.getByText("${prop}")).toBeInTheDocument();
      });
    });`;
  }

  return `
    describe("${prop} prop", () => {
      it("renders with ${prop}", () => {
        const { container } = render(<${component} ${minimalWithout} ${prop}={"value"} />);
        expect(container).toBeDefined();
      });
    });`;
}

for (let i = 0; i < folders.length; i++) {
  const name = folders[i];
  let hasChildren = false;
  const filePath = path.resolve(`src/components/atoms/${name}/${name}.tsx`);
  const source = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    source,
    ts.ScriptTarget.Latest,
    true
  );

  const props: Record<string, { type: string; optional: boolean }> = {};
  let defaultExport = false;

  function visit(node: ts.Node) {
    if (
      (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
      node.name?.text === `${name}Props`
    ) {
      let members: ts.NodeArray<ts.TypeElement> | undefined;
      if (ts.isInterfaceDeclaration(node)) {
        members = node.members;
      } else if (ts.isTypeAliasDeclaration(node)) {
        if (ts.isTypeLiteralNode(node.type)) {
          members = node.type.members;
        } else if (ts.isIntersectionTypeNode(node.type)) {
          const literal = node.type.types.find((t) =>
            ts.isTypeLiteralNode(t)
          ) as ts.TypeLiteralNode | undefined;
          if (literal) members = literal.members;
        }
      }

      if (members) {
        members.forEach((m) => {
          if (ts.isPropertySignature(m) && m.type && ts.isIdentifier(m.name)) {
            const propName = m.name.text;
            const propType = m.type.getText(sourceFile);
            const optional = !!m.questionToken;
            props[propName] = { type: propType, optional };
            if (propName === "children") hasChildren = true;
          }
        });
      }
    }

    if (
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
    ) {
      defaultExport = true;
    }
    if (ts.isExportAssignment(node)) defaultExport = true;

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (Object.keys(props).length === 0) {
    Object.assign(props, {
      label: { type: "string", optional: false },
      error: { type: "string", optional: false },
      className: { type: "string", optional: false },
      value: { type: "string", optional: false },
      onChange: { type: "() => void", optional: false },
    });
    console.log(`⚠️ Fallback props utilisés pour : ${name}`);
  }

  let testFile = "";
  testFile += `import { render, screen } from "@testing-library/react";\n`;
  if (Object.entries(props).some(([p, t]) => isEventHandler(p, t.type))) {
    testFile += `import userEvent from "@testing-library/user-event";\n`;
  }
  testFile += `import ${
    defaultExport ? name : `{ ${name} }`
  } from "../${name}";\n\n`;

  function buildMinimalProps(
    obj: Record<string, { type: string; optional: boolean }>
  ) {
    const parts: string[] = [];
    for (const [p, meta] of Object.entries(obj)) {
      if (p === "children") continue;
      if (meta.optional) continue;
      const t = meta.type;
      if (t === "string" || t.includes("string")) parts.push(`${p}={"Test"}`);
      else if (t === "number" || t.includes("number")) parts.push(`${p}={1}`);
      else if (t === "boolean") parts.push(`${p}={false}`);
      else if (t.includes("[]")) parts.push(`${p}={[]}`);
      else if (t.includes("() =>") || t.includes("=>"))
        parts.push(`${p}={() => {}}`);
      else parts.push(`${p}={"Test"}`);
    }
    return parts.join(" ");
  }

  const minimalPropsStr = buildMinimalProps(props);

  const header = `// AUTO-GENERATED by generate-test.ts — DO NOT EDIT\n// Add // MANUAL inside the file to prevent overwrites\n\n`;

  testFile += header;
  testFile += `describe('${name} component', () => {\n`;
  testFile += `  it('renders without crashing', () => {\n`;
  testFile += `    const { container } = render(<${name} ${minimalPropsStr} />);\n`;
  testFile += `    expect(container).toBeDefined();\n`;
  testFile += `  });\n`;

  for (const [p, meta] of Object.entries(props)) {
    testFile += generateTestForProp(
      p,
      meta.type,
      name,
      hasChildren,
      minimalPropsStr
    );
  }

  testFile += `});\n`;

  const destDir = path.resolve(`src/components/atoms/${name}/__test__`);
  fs.mkdirSync(destDir, { recursive: true });
  const outPath = path.join(destDir, `${name}.auto.test.tsx`);

  if (fs.existsSync(outPath)) {
    const existing = fs.readFileSync(outPath, "utf8");
    if (existing.includes("// MANUAL")) {
      console.log(`⏭️ Test existant marqué MANUAL, skip génération : ${name}`);
      continue;
    }
    if (NO_OVERWRITE) {
      console.log(`⏭️ --no-overwrite utilisé, skip écriture : ${name}`);
      continue;
    }
  }

  if (DRY_RUN) {
    console.log(`📝 [DRY-RUN] Would write: ${outPath}`);
  } else {
    fs.writeFileSync(outPath, testFile, "utf8");
    console.log(`✅ Tests générés automatiquement ! : ${name}`);
  }
}
