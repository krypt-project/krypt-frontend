import Button from "@/components/atoms/Button";

export function FooterSection({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
      <h3 className="text-[var(--text-dark)] font-medium">{title}</h3>
      <ul className="space-y-0">
        {links.map((label) => (
          <li key={label}>
            <Button href="#" variant="link">
              {label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
