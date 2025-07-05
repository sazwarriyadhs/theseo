import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function GoogleAdsensePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.googleAdsensePage;
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="h-6 w-6 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription className="text-base">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>{t.setupCompleteTitle}</AlertTitle>
            <AlertDescription>
              {t.setupCompleteDescription}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
