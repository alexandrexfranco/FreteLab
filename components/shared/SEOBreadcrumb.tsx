import Link from "next/link";
import { SchemaBreadcrumb } from "../seo/SchemaBreadcrumb";

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function SEOBreadcrumb({ items }: SEOBreadcrumbProps) {
  const listItems = [{ name: "Home", item: "/" }, ...items];

  return (
    <>
      <SchemaBreadcrumb items={listItems} />
      <nav
        aria-label="Caminho de navegação (Breadcrumb)"
        className="py-3 px-4 bg-slate-100/60 border-b border-slate-200/50 text-xs font-medium no-print"
      >
        <ol className="flex items-center space-x-2 text-slate-500 max-w-7xl mx-auto flex-wrap">
          {listItems.map((el, idx) => {
            const isLast = idx === listItems.length - 1;
            return (
              <li key={el.item} className="flex items-center">
                {idx > 0 && (
                  <span className="mx-2 text-slate-300 select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast ? (
                  <span className="text-slate-800 font-semibold" aria-current="page">
                    {el.name}
                  </span>
                ) : (
                  <Link
                    href={el.item}
                    className="hover:text-primary transition-colors duration-150 underline decoration-slate-300 hover:decoration-primary"
                  >
                    {el.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
