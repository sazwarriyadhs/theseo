import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default async function GoogleSearchConsolePage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.googleSearchConsolePage;
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CheckSquare className="h-6 w-6 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription className="text-base">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>{t.statusTitle}</AlertTitle>
            <AlertDescription>
              {t.statusDescription}
            </AlertDescription>
          </Alert>
          <div>
            <h3 className="text-lg font-semibold mb-2">{t.verificationMethodTitle}</h3>
            <p className="text-muted-foreground mb-4">
             {t.verificationMethodDescription}
            </p>
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="text-xl">{t.htmlFileMethodTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.htmlFileMethodDescription}</p>
                 <Button asChild className="mt-4">
                    <Link href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                        {t.visitSearchConsole}
                    </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
