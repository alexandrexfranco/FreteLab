import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  id: string;
}

export default function FAQAccordion({ items, id }: FAQAccordionProps) {
  // Generate JSON-LD dynamically
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((el) => ({
      "@type": "Question",
      "name": el.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": el.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id={`schema-faq-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-4">
        {items.map((item, index) => (
          <details
            key={index}
            className="group bg-slate-50 rounded-xl border border-slate-200/60 p-4 transition-all duration-200 open:bg-white open:border-primary/20 open:shadow-sm"
          >
            <summary className="flex items-center justify-between font-bold text-slate-800 cursor-pointer list-none focus:outline-none focus:text-primary">
              <span className="pr-4 select-none">{item.question}</span>
              <span className="transition-transform duration-200 group-open:rotate-180 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </summary>
            <div className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
