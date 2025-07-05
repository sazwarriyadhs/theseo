import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import YouTubeGeneratorClientPage from "@/components/youtube-generator-client";

export default async function YouTubeOptimizationPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <YouTubeGeneratorClientPage dictionary={dictionary.youtubeOptimizationPage} />;
}
