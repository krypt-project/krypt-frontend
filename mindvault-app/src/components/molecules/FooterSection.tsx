import { NavLink } from "../atoms/NavLink";

export function FooterSection({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
      <h3 className="text-black font-medium">{title}</h3>
      <ul className="space-y-2">
        {links.map((label) => (
          <li key={label}>
            <NavLink href="#" variant="footer">
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
