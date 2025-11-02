import Image from "next/image";
import icon from "@/app/favicon.png";

export function FooterBranding({ text, alt }: { text: string; alt: string }) {
  return (
    <div className="space-y-0 sm:col-span-12 lg:col-span-4">
      <Image
        src={icon}
        alt={alt}
        width={150}
        height={150}
        style={{ borderRadius: "0.5rem" }}
      />
      <div>{text}</div>
    </div>
  );
}
