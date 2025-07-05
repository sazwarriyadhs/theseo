import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function YouTubeOptimizationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2 text-2xl">
            <span className="flex items-center gap-2">
              <Youtube className="h-6 w-6 text-primary" />
              YouTube Channel Optimization
            </span>
            <Button asChild variant="outline" size="sm">
              <a href="https://www.youtube.com/@NgobrolDigitalYuk" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Channel
              </a>
            </Button>
          </CardTitle>
          <CardDescription className="text-base">
            Integration and optimization suggestions for your YouTube channel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center bg-secondary rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-foreground mb-2">Feature Coming Soon</h3>
            <p className="text-muted-foreground">
              Connect your digimediakomunika.cloud YouTube channel to get AI-powered suggestions for video titles, descriptions, tags, and content ideas to boost your views and subscriber growth.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
