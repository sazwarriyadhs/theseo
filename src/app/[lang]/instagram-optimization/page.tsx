import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import InstagramGeneratorClientPage from "@/components/instagram-generator-client";
import InstagramFeedPreview from "@/components/instagram-feed-preview";
import { Separator } from "@/components/ui/separator";

export default async function InstagramOptimizationPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div className="space-y-8">
      <InstagramGeneratorClientPage dictionary={dictionary.instagramOptimizationPage} />
      <Separator />
      <InstagramFeedPreview dictionary={dictionary.instagramOptimizationPage.feedPreview} />
    </div>
  );
}
