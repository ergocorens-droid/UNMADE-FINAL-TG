import { redirect } from "next/navigation";

/** Zachowuje stare adresy /wysylka — nowa podstrona: /dostawa-i-platnosc */
export default function WysylkaRedirectPage() {
  redirect("/dostawa-i-platnosc");
}
