import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import SocialMediaGeneratorClientPage from "./social-media-generator-client";

export default async function SocialMediaGeneratorPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <SocialMediaGeneratorClientPage dictionary={dictionary.socialMediaGenerator} />;
}
