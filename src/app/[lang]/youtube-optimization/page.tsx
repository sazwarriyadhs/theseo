import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, ExternalLink } from "lucide-react";
import { getDictionary } from "@/dictionaries/get-dictionary";
import { Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button";

export default async function YouTubeOptimizationPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.youtubeOptimizationPage;
  const tComingSoon = dictionary.comingSoon;

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-2xl">
            <span className="flex items-center gap-2">
              <Youtube className="h-6 w-6 text-primary" />
              {t.title}
            </span>
            <Button asChild variant="outline" size="sm">
              <a href="https://www.youtube.com/@NgobrolDigitalYuk">
                <ExternalLink className="mr-2 h-4 w-4" />
                {t.visitChannel}
              </a>
            </Button>
          </CardTitle>
          <CardDescription className="text-base">
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">{tComingSoon.title}</h3>
            <p className="text-muted-foreground">
              {tComingSoon.youtubeOptimization}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
