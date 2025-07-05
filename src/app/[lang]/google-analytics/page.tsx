import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, AlertTriangle } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function GoogleAnalyticsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.googleAnalyticsPage;

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
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t.actionRequired}</AlertTitle>
            <AlertDescription>
              <p className="mb-2">{t.instructions}</p>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {t.envExample}
              </code>
              <p className="mt-2 text-xs text-muted-foreground">{t.dataNote}</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
