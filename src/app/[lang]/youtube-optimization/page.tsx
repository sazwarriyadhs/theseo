import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import YouTubeGeneratorClientPage from "@/components/youtube-generator-client";
import { Separator } from "@/components/ui/separator";
import YouTubeFeedPreview from "@/components/youtube-feed-preview";

export default async function YouTubeOptimizationPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="space-y-8">
      <YouTubeGeneratorClientPage dictionary={dictionary.youtubeOptimizationPage} />
      <Separator />
      <YouTubeFeedPreview dictionary={dictionary.youtubeOptimizationPage.feedPreview} />
    </div>
  );
}
