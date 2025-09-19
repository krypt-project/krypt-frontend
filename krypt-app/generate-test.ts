// generate-tests.ts
import ts from "typescript";
import fs from "fs";
import path from "path";
const testFolder = "./src/components/atoms/";

const entries = fs.readdirSync(testFolder, { withFileTypes: true });

const folders = entries
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const composant = folders;

for (let i = 0; i < composant.length; i++) {
  const filePath = path.resolve(
    `src/components/atoms/${composant[i]}/${composant[i]}.tsx`
  );
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true
  );

  const props: Record<string, string> = {};

  let defaultExport = false;

  function visit(node: ts.Node) {
    if (
      ts.isTypeAliasDeclaration(node) &&
      node.name.text === `${composant[i]}Props`
    ) {
      const type = node.type as ts.TypeLiteralNode;
      type.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.type) {
          const propName = (member.name as ts.Identifier).text;
          const propType = member.type.getText(sourceFile);
          props[propName] = propType;
        }
      });
    }
    ts.forEachChild(node, visit);

    if (
      ts.isFunctionDeclaration(node) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
    ) {
      defaultExport = true;
    }

    if (ts.isReturnStatement(node)) {
    }
  }
  visit(sourceFile);

  let testFile = "";

  // Génération du squelette de test
  testFile += `import { render, screen } from "@testing-library/react"; \n`;
  if (
    (props["onClick"] && props["onClick"].includes("=>")) ||
    (props["onChange"] && props["onChange"].includes("=>")) ||
    (props["onSubmit"] && props["onSubmit"].includes("=>"))
  ) {
    testFile += `import userEvent from "@testing-library/user-event";\n`;
  }

  testFile += `import ${
    defaultExport ? composant[i] : `{` + composant[i] + `}`
  } from "../${composant[i]}";
  
  describe("${composant[i]} component (auto-generated)", () => {
    it("renders children", () => {
      render(<${composant[i]}>Test</${composant[i]}>);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });`;
  for (const [prop, type] of Object.entries(props)) {
    console.log("prop :" + prop);
    console.log("type :" + type);

    if (type === "boolean") {
      testFile += `
    it("handles ${prop}=true", () => {
      render(<${composant[i]} ${prop}={true}>${prop}</${composant[i]}>);
      expect(screen.getByText("${prop}")).toBeInTheDocument();
    });
    it("handles ${prop}=false", () => {
      render(<${composant[i]} ${prop}={false}>${prop}</${composant[i]}>);
      expect(screen.getByText("${prop}")).toBeInTheDocument();
    });
  `;
    } else if (type.includes("|")) {
      const values = type.split("|").map((v) => v.trim().replace(/"/g, ""));
      values.forEach((val) => {
        testFile += `
    it("handles ${prop}='${val}'", () => {
      render(<${composant[i]} ${prop}="${val}">${prop}-${val}</${composant[i]}>);
      expect(screen.getByText("${prop}-${val}")).toBeInTheDocument();
    });
  `;
      });
    }
  }
  
  testFile += `});`;

  const CreatingFileName = `src/components/atoms/${composant[i]}/__test__/${composant[i]}.auto.test.tsx`;

  if (fs.existsSync(CreatingFileName)) {
    fs.unlinkSync(CreatingFileName);
    console.log(`🗑️ Ancien test supprimé ! : ${composant[i]}`);
  }

  fs.writeFileSync(CreatingFileName, testFile);
  console.log(`✅ Tests générés automatiquement ! : ${composant[i]}`);
}
