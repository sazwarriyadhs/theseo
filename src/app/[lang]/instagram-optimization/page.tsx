import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import InstagramGeneratorClientPage from "@/components/instagram-generator-client";

export default async function InstagramOptimizationPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <InstagramGeneratorClientPage dictionary={dictionary.instagramOptimizationPage} />;
}
