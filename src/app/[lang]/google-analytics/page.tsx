import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";

export default async function GoogleAnalyticsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.googleAnalyticsPage;
  const tComingSoon = dictionary.comingSoon;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <LineChart className="h-6 w-6 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription className="text-base">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">{tComingSoon.title}</h3>
            <p className="text-muted-foreground">
              {tComingSoon.googleAnalytics}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
