import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import DashboardClientPage from "./dashboard-client";

export default async function DashboardPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return <DashboardClientPage dictionary={dictionary.dashboard} />;
}
