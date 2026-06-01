import Script from "next/script";

interface SchemaBreadcrumbItem {
  name: string;
  item: string;
}

interface SchemaBreadcrumbProps {
  items: SchemaBreadcrumbItem[];
}

export function SchemaBreadcrumb({ items }: SchemaBreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((el, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": el.name,
      "item": el.item.startsWith("http")
        ? el.item
        : `https://fretelab.com.br${el.item}`,
    })),
  };

  return (
    <Script
      id={`schema-breadcrumb-${items.map((i) => i.name.replace(/\s+/g, "-").toLowerCase()).join("-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
