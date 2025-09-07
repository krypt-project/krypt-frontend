import { Node, mergeAttributes, CommandProps } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    tag: {
      insertTag: (value: string) => ReturnType;
    };
  }
}

const Tag = Node.create({
  name: "tag",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.badge-tag",
        getAttrs: (el) => {
          if (typeof el === "string") return {};
          const span = el as HTMLElement;
          const text = span.innerText || "";
          return {
            value: text.replace(/^#/, ""),
          };
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        class:
          "badge-tag inline-block rounded-full bg-blue-100 text-blue-800 text-sm font-medium px-2 py-0.5 mr-1 cursor-pointer hover:bg-blue-200 hover:text-blue-900",
      }),
      `#${node.attrs.value}`,
    ];
  },

  addCommands() {
    return {
      insertTag:
        (value: string) =>
        ({ chain }: CommandProps) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs: { value },
            })
            .run();
        },
    };
  },
});

export default Tag;
