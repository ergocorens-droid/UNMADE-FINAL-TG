"use client";

import { useEffect, useState } from "react";

const SIZE_ROWS = [
  { size: "S", length: "68 cm", chest: "48 cm", shoulders: "43 cm", sleeve: "19 cm" },
  { size: "M", length: "70 cm", chest: "52 cm", shoulders: "45 cm", sleeve: "20 cm" },
  { size: "L", length: "72 cm", chest: "56 cm", shoulders: "47 cm", sleeve: "21 cm" },
  { size: "XL", length: "74 cm", chest: "60 cm", shoulders: "49 cm", sleeve: "22 cm" },
  { size: "XXL", length: "76 cm", chest: "64 cm", shoulders: "51 cm", sleeve: "23 cm" },
] as const;

function stripHeading(html: string, heading: string): string {
  return html
    .replace(
      new RegExp(
        `<p[^>]*>\\s*<strong[^>]*>\\s*${heading}\\s*</strong>\\s*</p>`,
        "i",
      ),
      "",
    )
    .replace(new RegExp(`<p[^>]*>\\s*${heading}\\s*</p>`, "i"), "")
    .trim();
}

function htmlText(fragment: string): string {
  return fragment
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function hasFrontLogoText(fragment: string): boolean {
  const text = htmlText(fragment);
  return text.includes("logo") && text.includes("przodu");
}

function removeFrontLogoListItems(html: string): string {
  return html
    .replace(/<li\b[^>]*>[\s\S]*?<\/li>/gi, (item) =>
      hasFrontLogoText(item) ? "" : item,
    )
    .split(/(<br\s*\/?>|\r?\n)/gi)
    .filter((part) => !hasFrontLogoText(part))
    .join("");
}

function normalizeProductDetails(html: string): string {
  return removeFrontLogoListItems(html)
    .replace(
      /<li[^>]*>\s*małe\s+logo\s+z\s+przodu\s*<\/li>/gi,
      "",
    )
    .replace(
      /<li[^>]*>\s*ma(?:l|ł|Ĺ‚)e\s+logo\s+z\s+przodu\s*<\/li>/gi,
      "",
    )
    .replace(
      /(gramatura\s*:\s*)(?:<strong[^>]*>)?\s*(?:180\s*[-–]\s*)?190\s*GSM\s*(?:<\/strong>)?/gi,
      "$1midweight",
    )
    .replace(
      /(materia(?:l|ł|Ĺ‚)\s*:\s*)(?:<strong[^>]*>)?\s*(100%\s*bawe(?:l|ł|Ĺ‚)na)\s*(?:<\/strong>)?/gi,
      "$1<strong>$2</strong>",
    );
}

function splitProductDescription(html: string): {
  detailsHtml: string;
  careHtml: string;
} {
  const careHeading =
    /<p[^>]*>\s*<strong[^>]*>\s*(Pielęgnacja|PielÄ™gnacja)\s*<\/strong>\s*<\/p>/i;
  const careMatch = html.match(careHeading);

  if (!careMatch || careMatch.index === undefined) {
    return {
      detailsHtml: normalizeProductDetails(stripHeading(
        stripHeading(html, "Szczegóły produktu"),
        "SzczegĂłĹ‚y produktu",
      )),
      careHtml: "",
    };
  }

  const detailsPart = html.slice(0, careMatch.index);
  const carePart = html.slice(careMatch.index);

  return {
    detailsHtml: normalizeProductDetails(stripHeading(
      stripHeading(detailsPart, "Szczegóły produktu"),
      "SzczegĂłĹ‚y produktu",
    )),
    careHtml: stripHeading(stripHeading(carePart, "Pielęgnacja"), "PielÄ™gnacja"),
  };
}

function RowIcon({ type }: { type: "details" | "shipping" | "size" }) {
  if (type === "shipping") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M3 7h11v10H3V7Zm11 3h4l3 3v4h-7v-7Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === "size") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M6 4h12l2 5-3 2v9H7v-9L4 9l2-5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionItem({
  id,
  icon,
  title,
  open,
  onToggle,
  children,
}: {
  id?: string;
  icon: "details" | "shipping" | "size";
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-black/[0.08]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-neutral-950">
          <RowIcon type={icon} />
          {title}
        </span>
        <span className="text-lg leading-none text-neutral-900" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? <div className="pb-5">{children}</div> : null}
    </section>
  );
}

export function ProductInfoAccordions({ html }: { html: string }) {
  const [open, setOpen] = useState<"details" | "shipping" | "size" | null>(null);
  const { detailsHtml, careHtml } = splitProductDescription(html);

  useEffect(() => {
    function openGuide() {
      setOpen("size");
      requestAnimationFrame(() => {
        document
          .getElementById("size-guide")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    window.addEventListener("open-size-guide", openGuide);
    return () => window.removeEventListener("open-size-guide", openGuide);
  }, []);

  return (
    <div className="mt-7 border-t border-black/[0.08]">
      <AccordionItem
        icon="details"
        title="Szczegóły produktu"
        open={open === "details"}
        onToggle={() => setOpen(open === "details" ? null : "details")}
      >
        <div className="space-y-5 text-sm leading-7 text-neutral-800 [&_br]:block [&_p]:mb-0 [&_strong]:font-black">
          {detailsHtml ? (
            <div dangerouslySetInnerHTML={{ __html: detailsHtml }} />
          ) : null}
          {careHtml ? (
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-950">
                Pielęgnacja
              </p>
              <div dangerouslySetInnerHTML={{ __html: careHtml }} />
            </div>
          ) : null}
        </div>
      </AccordionItem>

      <AccordionItem
        icon="shipping"
        title="Wysyłka"
        open={open === "shipping"}
        onToggle={() => setOpen(open === "shipping" ? null : "shipping")}
      >
        <div className="space-y-2 text-sm leading-7 text-neutral-800">
          <p>Wysyłamy z Polski w 24-48h.</p>
          <p>Dostępne metody: kurier InPost oraz Paczkomaty InPost.</p>
          <p>Łatwe zwroty w ciągu 14 dni od odbioru.</p>
        </div>
      </AccordionItem>

      <AccordionItem
        id="size-guide"
        icon="size"
        title="Tabela rozmiarów"
        open={open === "size"}
        onToggle={() => setOpen(open === "size" ? null : "size")}
      >
        <div className="space-y-4">
          <p className="text-sm leading-6 text-neutral-600">
            Wymiary w cm. Tolerancja rozmiaru +/- 2 cm.
          </p>
          <div className="grid gap-3 md:hidden">
            {SIZE_ROWS.map((row) => (
              <div key={row.size} className="border border-black/[0.08] bg-white p-4">
                <div className="mb-3 text-lg font-black text-neutral-950">
                  {row.size}
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <dt className="font-bold text-neutral-500">Długość całkowita</dt>
                  <dd className="text-right font-black text-neutral-950">{row.length}</dd>
                  <dt className="font-bold text-neutral-500">Szerokość pod pachami</dt>
                  <dd className="text-right font-black text-neutral-950">{row.chest}</dd>
                  <dt className="font-bold text-neutral-500">Szerokość ramion</dt>
                  <dd className="text-right font-black text-neutral-950">{row.shoulders}</dd>
                  <dt className="font-bold text-neutral-500">Długość rękawa</dt>
                  <dd className="text-right font-black text-neutral-950">{row.sleeve}</dd>
                </dl>
              </div>
            ))}
          </div>
          <div className="hidden overflow-hidden border border-black/[0.08] bg-white md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-white text-neutral-950">
                  {["Rozmiar", "Długość całkowita", "Szerokość pod pachami", "Szerokość ramion", "Długość rękawa"].map((head) => (
                    <th key={head} className="border-b border-r border-black/[0.08] px-3 py-3 text-xs font-black uppercase tracking-[0.08em] last:border-r-0">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_ROWS.map((row) => (
                  <tr key={row.size}>
                    <th className="border-r border-t border-black/[0.06] px-3 py-3 font-black text-neutral-950">
                      {row.size}
                    </th>
                    <td className="border-r border-t border-black/[0.06] px-3 py-3 font-semibold text-neutral-900">{row.length}</td>
                    <td className="border-r border-t border-black/[0.06] px-3 py-3 font-semibold text-neutral-900">{row.chest}</td>
                    <td className="border-r border-t border-black/[0.06] px-3 py-3 font-semibold text-neutral-900">{row.shoulders}</td>
                    <td className="border-t border-black/[0.06] px-3 py-3 font-semibold text-neutral-900">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
