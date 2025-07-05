import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import KeywordAnalyzerClientPage from "./keyword-analyzer-client";

export default async function KeywordAnalyzerPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <KeywordAnalyzerClientPage dictionary={dictionary.keywordAnalyzer} />;
}
