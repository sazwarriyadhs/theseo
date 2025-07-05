import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import ContentOptimizerClientPage from "./content-optimizer-client";

export default async function ContentOptimizerPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <ContentOptimizerClientPage dictionary={dictionary.contentOptimizer} />;
}
