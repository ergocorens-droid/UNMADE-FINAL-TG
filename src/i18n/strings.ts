import type { Locale } from "@/lib/regions";
import type { ProductColorSlug } from "@/data/products";

export type MsgKey = keyof (typeof MESSAGES)["pl"];

export const MESSAGES = {
  pl: {
    banner_promo: "PIERWSZY DROP — do -15% z kodem IGNITION",
    nav_home: "HOME",
    nav_new: "NOWE",
    nav_tees: "KOSZULKI",
    nav_hoodies: "BLUZY",
    nav_shop: "SKLEP",
    nav_shipping: "WYSYŁKA",
    nav_contact: "KONTAKT",
    nav_collections: "KOLEKCJE",
    color_black: "Czarna",
    color_white: "Biała",
    pdp_color: "Kolor",
    pdp_select_variant: "Wybierz wariant",
    pdp_on_sale: "Wyprzedaż",
    pdp_stock_low: "Zostało {n} szt.",
    pdp_tax_ship_note:
      "Ceny brutto. Koszt dostawy wyliczamy przy kasie.",
    pdp_price_catalog_label: "Regularnie",
    pdp_price_you_pay: "Cena dropu",
    pdp_save_vs_catalog_kicker: "Względem ceny katalogowej",
    pdp_save_vs_catalog_banner: "Taniej o {amount} (−{pct}%)",
    pdp_bulk_total_before: "Suma przed rabatem ilościowym",
    pdp_bulk_total_after: "Suma po rabacie ilościowym",
    pdp_bulk_sidebar_label: "Rabat ilościowy",
    pdp_discount_explicit: "Oszczędzasz {amount}",
    pdp_promo_strip_title: "PIERWSZY DROP",
    pdp_promo_code_label: "Kod w koszyku",
    pdp_promo_code_title: "Kod pierwszego dropu",
    pdp_promo_code_sub:
      "Wpisz IGNITION przy kasie i odbierz -15%.",
    pdp_bulk_you_save: "Przy {qty} szt. oszczędzasz {amount}",
    pdp_bulk_ladder_intro: "Kup więcej, zapłać mniej",
    pdp_bulk_chip_two: "2 szt. −{pct}%",
    pdp_bulk_chip_three: "3+ szt. −{pct}%",
    pdp_watching_live: "Aktualnie ogląda: {n} osób",
    pdp_pay_accepted: "Bezpieczne płatności",
    pdp_acc_product_details: "SZCZEGÓŁY PRODUKTU",
    pdp_acc_care_maintenance: "PIELĘGNACJA",
    pdp_acc_size_fit: "ROZMIAR I KRÓJ",
    pdp_a11y_size_oos: "Rozmiar {size} — niedostępny",
    pdp_size: "Rozmiar",
    pdp_qty: "Ilość",
    pdp_add_cart: "DODAJ DO KOSZYKA",
    pdp_size_chart: "Tabela rozmiarów",
    pdp_savings_code: "Oszczędzasz {amount} z kodem IGNITION",
    pdp_fomo: "Zostało {n} szt. — nie przegap!",
    pdp_promo_title: "Im więcej sztuk — tym taniej za jedną",
    pdp_bulk_hint:
      "Wybierz pakiet. Rabaty naliczamy automatycznie w koszyku.",
    pdp_bundle_headline: "Wybierz zestaw",
    pdp_bundle_configure: "Skonfiguruj swój zestaw",
    pdp_bundle_single: "Cena dropu",
    pdp_bundle_pair: "Idealne na start",
    pdp_bundle_best: "Największa oszczędność",
    pdp_bundle_total_label: "Łącznie",
    pdp_bundle_unit_label: "Cena za sztukę",
    pdp_piece_label: "Sztuka {n}",
    pdp_bundle_summary_heading: "Twój zestaw",
    pdp_bundle_summary_title: "Twój zestaw: {qty} szt.",
    pdp_bundle_pay_now: "Do zapłaty: {amount}",
    pdp_bundle_save_now: "Oszczędzasz: {amount}",
    pdp_bundle_lead:
      "Większe zestawy obniżają cenę za sztukę i szybciej osiągasz próg darmowej dostawy.",
    pdp_bulk_recommended: "Polecane",
    pdp_bulk_best_value: "NAJLEPSZA WARTOŚĆ",
    pdp_free_ship_banner:
      "Darmowa dostawa od {threshold} — warto dołożyć sztuki do progu.",
    pdp_cta_bundle: "Dodaj {qty} szt. do koszyka · {total}",
    pdp_add_bundle: "DODAJ ZESTAW DO KOSZYKA",
    pdp_qty_refine: "Dostosuj ilość ręcznie",
    pdp_copy: "Kopiuj",
    pdp_copied: "Skopiowano",
    pdp_bulk_autodiscount_hint: "Rabat nalicza się automatycznie",
    pdp_mix_variants_hint:
      "Chcesz dobrać różne kolory lub rozmiary? Dodaj każdy wariant osobno do koszyka — rabat naliczy się automatycznie.",
    pdp_trust_row: "Wysyłka 24-48h · Bezpieczne płatności · Łatwy zwrot",
    pdp_trust_ship: "Wysyłka 24–48h",
    pdp_trust_pay: "Bezpieczne płatności",
    pdp_trust_return: "Łatwy zwrot",
    pdp_sold_out: "Wyprzedane",
    pdp_bulk_qty_one: "1 SZT.",
    pdp_bulk_qty_two: "2 SZT.",
    pdp_bulk_qty_three: "3+ SZT.",
    pdp_bulk_per_piece: "{price} / szt.",
    pdp_bulk_save: "Oszczędzasz {amount}",
    pdp_bulk_qty_extra:
      "Wybrane {qty} szt. — nadal rabat {pct}% (jak przy 3+).",
    pdp_promo_free_ship:
      "Darmowa wysyłka od {threshold} przy zamówieniu powyżej progu.",
    pdp_acc_desc: "Opis",
    pdp_acc_material: "Materiał",
    pdp_acc_shipping: "Wysyłka",
    pdp_desc_body:
      "Nadruk na plecach w odcieniu różu: UNMADE, WANNA BE MY CARDIO?, (RESPECTFULLY). Koszulka oversize 240 g/m² z premium bawełny. Limitowany drop UNMADE.",
    pdp_desc_colors:
      " Dostępna w kolorze czarnym i białym — wybierz wariant powyżej.",
    pdp_material_body:
      "100% bawełna czesana ring-spun, 240 g/m². Oversize fit. Podwójne szwy.",
    pdp_shipping_body:
      "Darmowa wysyłka od progu podanego wyżej (w Twojej walucie). Realizacja 2–4 dni robocze. 14 dni na zwrot.",
    cart_title: "Koszyk",
    cart_close: "Zamknij",
    cart_empty: "Twój koszyk jest pusty",
    cart_login_hint: "Masz konto?",
    cart_login: "Zaloguj się",
    cart_continue: "Kontynuuj zakupy",
    cart_size: "Rozmiar",
    cart_subtotal: "Suma częściowa",
    cart_bulk_saving: "Rabat ilościowy (−{pct}%)",
    cart_net: "Razem po rabacie",
    cart_free_ship_progress:
      "Dodaj produkty za jeszcze {remaining} do darmowej dostawy!",
    cart_free_ship_done: "Masz darmową dostawę!",
    cart_checkout: "Przejdź do kasy",
    a11y_dec_qty: "Zmniejsz ilość",
    a11y_inc_qty: "Zwiększ ilość",
    a11y_remove: "Usuń z koszyka",
    related_title: "Może ci się spodobać",
    size_modal_title: "Tabela rozmiarów — {name}",
    size_th_size: "Rozmiar",
    size_th_chest: "Szer. klatki",
    size_th_length: "Długość",
    a11y_close: "Zamknij",
    a11y_thumb: "Zmień zdjęcie",
    a11y_thumb_product: "Miniatura produktu",
    toast_added: "Dodano: {detail}",
    quick_add: "Dodaj",
    search_close: "Zamknij wyszukiwarkę",
  },
  en: {
    banner_promo: "FIRST DROP - up to 15% off with code IGNITION",
    nav_home: "HOME",
    nav_new: "NEW",
    nav_tees: "TEES",
    nav_hoodies: "HOODIES",
    nav_shop: "SHOP",
    nav_shipping: "SHIPPING",
    nav_contact: "CONTACT",
    nav_collections: "COLLECTIONS",
    color_black: "Black",
    color_white: "White",
    pdp_color: "Color",
    pdp_select_variant: "Select variant",
    pdp_on_sale: "On sale",
    pdp_stock_low: "{n} left",
    pdp_tax_ship_note:
      "Tax included. Shipping calculated at checkout.",
    pdp_price_catalog_label: "Regular",
    pdp_price_you_pay: "Drop price",
    pdp_save_vs_catalog_kicker: "Compared to retail",
    pdp_save_vs_catalog_banner: "{amount} less (−{pct}%)",
    pdp_bulk_total_before: "Before volume discount",
    pdp_bulk_total_after: "After volume discount",
    pdp_bulk_sidebar_label: "Volume discount",
    pdp_discount_explicit: "Save {amount}",
    pdp_promo_strip_title: "First drop",
    pdp_promo_code_label: "Code at checkout",
    pdp_promo_code_title: "First drop code",
    pdp_promo_code_sub:
      "Apply IGNITION at checkout to unlock 15% off.",
    pdp_bulk_you_save: "You save {amount} on {qty} pcs",
    pdp_bulk_ladder_intro: "Buy more, pay less",
    pdp_bulk_chip_two: "2 pcs −{pct}%",
    pdp_bulk_chip_three: "3+ pcs −{pct}%",
    pdp_watching_live: "Currently watching: {n} people",
    pdp_pay_accepted: "Secure checkout",
    pdp_acc_product_details: "PRODUCT DETAILS",
    pdp_acc_care_maintenance: "CARE & MAINTENANCE",
    pdp_acc_size_fit: "SIZE & FIT",
    pdp_a11y_size_oos: "Size {size} — sold out",
    pdp_size: "Size",
    pdp_qty: "Quantity",
    pdp_add_cart: "Add to cart",
    pdp_size_chart: "Size chart",
    pdp_savings_code: "Save {amount} with code IGNITION",
    pdp_fomo: "Only {n} left — don’t miss out!",
    pdp_promo_title: "The more you buy, the less you pay per tee",
    pdp_bulk_hint:
      "Pick a bundle. Discounts apply automatically in your cart.",
    pdp_bundle_headline: "Choose your bundle",
    pdp_bundle_configure: "Configure your bundle",
    pdp_bundle_single: "Drop price",
    pdp_bundle_pair: "Great starter pick",
    pdp_bundle_best: "Highest savings",
    pdp_bundle_total_label: "Total",
    pdp_bundle_unit_label: "Per piece",
    pdp_piece_label: "Piece {n}",
    pdp_bundle_summary_heading: "Your bundle",
    pdp_bundle_summary_title: "Your bundle: {qty} pcs",
    pdp_bundle_pay_now: "To pay: {amount}",
    pdp_bundle_save_now: "You save: {amount}",
    pdp_bundle_lead:
      "Larger bundles lower your price per piece and help you reach free shipping faster.",
    pdp_bulk_recommended: "Recommended",
    pdp_bulk_best_value: "BEST VALUE",
    pdp_free_ship_banner:
      "Free shipping from {threshold} — adding pieces gets you there quicker.",
    pdp_cta_bundle: "Add {qty} pcs to cart · {total}",
    pdp_add_bundle: "Add bundle to cart",
    pdp_qty_refine: "Fine-tune quantity",
    pdp_copy: "Copy",
    pdp_copied: "Copied",
    pdp_bulk_autodiscount_hint:
      "The more pieces in cart, the bigger discount is applied automatically.",
    pdp_mix_variants_hint:
      "Want mixed colors or sizes? Add each variant separately to cart — discount is still applied automatically.",
    pdp_trust_row: "Shipping 24-48h · Secure payments · Easy returns",
    pdp_trust_ship: "Shipping 24–48h",
    pdp_trust_pay: "Secure payments",
    pdp_trust_return: "Easy returns",
    pdp_sold_out: "Sold out",
    pdp_bulk_qty_one: "1 pc",
    pdp_bulk_qty_two: "2 pcs",
    pdp_bulk_qty_three: "3+ pcs",
    pdp_bulk_per_piece: "{price} / pc",
    pdp_bulk_save: "You save {amount}",
    pdp_bulk_qty_extra:
      "{qty} pcs selected — {pct}% off still applies (same as 3+).",
    pdp_promo_free_ship:
      "Free shipping from {threshold} on orders above the threshold.",
    pdp_acc_desc: "Description",
    pdp_acc_material: "Fabric",
    pdp_acc_shipping: "Shipping",
    pdp_desc_body:
      "Pink print on the back: UNMADE, WANNA BE MY CARDIO?, (RESPECTFULLY). Oversized tee, 240 gsm premium cotton. Limited UNMADE drop.",
    pdp_desc_colors:
      " Available in black and white — pick above.",
    pdp_material_body:
      "100% combed ring-spun cotton, 240 gsm. Oversized fit. Double-stitched.",
    pdp_shipping_body:
      "Free shipping above the threshold shown above (in your currency). Ships in 2–4 business days. 14-day returns.",
    cart_title: "Cart",
    cart_close: "Close",
    cart_empty: "Your cart is empty",
    cart_login_hint: "Have an account?",
    cart_login: "Log in",
    cart_continue: "Continue shopping",
    cart_size: "Size",
    cart_subtotal: "Subtotal",
    cart_bulk_saving: "Volume discount (−{pct}%)",
    cart_net: "Total after discount",
    cart_free_ship_progress:
      "Add {remaining} more for free shipping!",
    cart_free_ship_done: "You qualify for free shipping!",
    cart_checkout: "Checkout",
    a11y_dec_qty: "Decrease quantity",
    a11y_inc_qty: "Increase quantity",
    a11y_remove: "Remove from cart",
    related_title: "You may also like",
    size_modal_title: "Size chart — {name}",
    size_th_size: "Size",
    size_th_chest: "Chest width",
    size_th_length: "Length",
    a11y_close: "Close",
    a11y_thumb: "Change photo",
    a11y_thumb_product: "Product thumbnail",
    toast_added: "Added: {detail}",
    quick_add: "Add",
    search_close: "Close search",
  },
} as const;

export function translate(
  locale: Locale,
  key: MsgKey,
  vars?: Record<string, string | number>,
): string {
  let s: string = MESSAGES[locale][key] ?? MESSAGES.en[key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

export function colorLabel(
  locale: Locale,
  color: ProductColorSlug | undefined,
): string {
  if (!color) return "";
  return locale === "pl"
    ? color === "black"
      ? MESSAGES.pl.color_black
      : MESSAGES.pl.color_white
    : color === "black"
      ? MESSAGES.en.color_black
      : MESSAGES.en.color_white;
}
